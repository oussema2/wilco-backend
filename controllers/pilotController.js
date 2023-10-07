const pilotService = require("../services/pilotService");
const Pilot = require("../db/models/pilot");
const bcrypt = require("bcrypt");
const JWT = require("../helper/JWT");
const mongoose = require("mongoose");
const _ = require("lodash");
const nodemailer = require("nodemailer");
const admin = require("firebase-admin");
const firebaseApp = require("../fireBaseConfig").firebaseApp;
const uploadFile = require("../helper/linode_logic").uploadFile;
const deleteFile = require("../helper/linode_logic").deleteFile;

let transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "20648dbf7ad7eb",
    pass: "36a314779abfbc",
  },
});

exports.register = async (req, res) => {
  const reqBody = req.body;
  try {
    const resUpload = await uploadFile(req.file);

    if (resUpload) {
      const pilot = new Pilot(reqBody);
      const salt = await bcrypt.genSalt(15);
      const hash = await bcrypt.hash(pilot.password, salt);
      pilot.profile_picture_link = resUpload.location;
      pilot.profile_picture_key = resUpload.key;
      pilot.password = hash;
      const resPilot = await pilot.save();
      if (resPilot) {
        res.status(200).json({
          message: "REGISTERED",
          status: 200,
          pilot: resPilot,
        });
      }
    }
  } catch (error) {
    res.status(400).json({
      message: "ERROR",
      status: 400,
      err: error,
    });
  }
};

exports.login = async (req, res) => {
  const email = req.params.email;
  const password = req.params.password;

  Pilot.findOne({ email: email }, async (err, pilot) => {
    if (err) {
      return res.send({
        status: 400,
        message: err,
      });
    }
    if (!pilot) {
      res.send({
        status: 401,
        message: "The Email is incorrect.",
      });
    }
    if (pilot && !pilot.comparePassword(password)) {
      return res.status(401).json({
        status: 401,
        message: "The password is incorrect.",
      });
    }

    if (pilot?.account_status === "DISABLED") {
      res.status(200).json({
        status: 200,
        ...this.sendCodeViaEmail(email),
        account_status: pilot.account_status,
      });
    }
    if (pilot && pilot.comparePassword(password)) {
      res.send({
        token: JWT.generateUserJWT(pilot),
        status: 200,
        pilot: pilot,
        account_status: pilot.account_status,
      });
    }
  });
};
exports.getPosts = (req, res) => {
  Pilot.find({ _id: req.params })
    .populate({
      path: "posts",
      populate: {
        path: "comments",
      },
    })
    .exec((err, pilot) => {
      if (err) {
        res.send({
          status: 400,
          message: err,
        });
      }
      if (pilot) {
        res.send({
          status: 200,
          pilot: pilot,
        });
      }
    });
};

exports.searchPilotByName = (req, res) => {
  console.log(req.params.pattern);
  Pilot.find(
    {
      $or: [
        { first_name: { $regex: req.params.pattern, $options: "i" } },
        { last_name: { $regex: req.params.pattern, $options: "i" } },
      ],
    },
    (err, pilots) => {
      if (err) {
        res.send({ status: 400, message: err });
      }
      if (pilots) {
        res.send({
          status: 200,
          message: "FETCHED",
          pilots: pilots,
        });
      }
    }
  );
};

exports.getPilotById = (req, res) => {
  Pilot.findById(req.params.id)
    .populate("home_airport")
    .populate("communities")
    .exec((err, pilot) => {
      console.log(pilot);

      if (err) {
        res.send({
          status: 400,
          message: err,
        });
      }

      if (!pilot) {
        res.send({
          status: 400,
          message: "NOT FOUND",
        });
      }

      if (pilot) {
        res.send({
          status: 200,
          pilot: pilot,
        });
      }
    });
};

exports.searchPilotsByHomeAirport = (req, res) => {
  Pilot.find({ home_airport: req.params.airportId })
    .populate("home_airport")
    .exec((err, pilots) => {
      if (err) {
        res.send({
          status: 400,
          message: err,
        });
      }
      if (pilots) {
        res.send({
          status: 200,
          message: "FETCHED",
          pilots: pilots,
        });
      }
    });
};

exports.getCodeForeResetPassword = async (req, res) => {
  const emailResponse = await this.sendCodeViaEmail(req.params.email);
  console.log(emailResponse);
  switch (emailResponse.status) {
    case 400:
      res.status(400).json({
        emailResponse,
      });
      break;

    case 301:
      res.status(301).json({
        emailResponse,
      });
      break;

    case 200:
      res.status(200).json({
        emailResponse,
      });
      break;
    default:
      break;
  }
};

exports.sendCodeViaEmail = async (email) => {
  const reset_code = _.random(100000, 999999);

  const pilotRes = await Pilot.findOneAndUpdate(
    { email: email },
    { reset_password_code: reset_code }
  );
  if (!pilotRes) {
    return {
      err: "Incorrect Email",
      status: 301,
    };
  } else {
    const message = {
      from: "elonmusk@tesla.com", // Sender address
      to: "to@email.com", // List of recipients
      subject: "Design Your Model S | Tesla", // Subject line
      text: `Your code for reset Password is ${reset_code}`, // Plain text body
    };
    const responseMail = await transport.sendMail(message);
    if (responseMail) {
      return {
        status: 200,
        _id: pilotRes._id,
      };
    } else {
      return {
        status: 400,
        err: err,
      };
    }
  }
};

exports.testCodeForResetPassword = async (req, res) => {
  const checkCodeResponse = await checkPilotCode(
    req.params.email,
    req.params.reset_code
  );
  console.log(checkCodeResponse);
  switch (checkCodeResponse.status) {
    case 400:
      res.status(400).json({
        ...checkCodeResponse,
      });
      break;
    case 301:
      res.status(301).json({
        ...checkCodeResponse,
      });
      break;
    case 200:
      res.status(200).json({
        ...checkCodeResponse,
      });
      break;

    default:
      break;
  }
};

const checkPilotCode = async (email, code) => {
  const resPilot = await Pilot.findOneAndUpdate(
    {
      email: email,
      reset_password_code: code,
    },
    { reset_password_code: "" }
  );

  if (!resPilot) {
    return {
      status: 301,
      message: "Incorrect Code.",
      ok: false,
    };
  }

  if (resPilot) {
    return {
      status: 200,
      message: "COrrect Code.",
      ok: true,
    };
  }
  return {
    err: resPilot,
    message: "ERROR",
    status: 400,
    ok: false,
  };
};

exports.resetPassword = (req, res) => {
  bcrypt.genSalt(15, (err, salt) => {
    bcrypt.hash(req.body.new_password, salt, (err, hash) => {
      Pilot.findByIdAndUpdate(
        req.params._id,
        { password: hash },
        (err, pilotUpdated) => {
          if (err) {
            res.status(400).json({
              err: err,
              message: "ERROR",
              status: 400,
            });
          }
          if (pilotUpdated) {
            res.status(200).json({
              status: 200,
              message: "UPDATED",
              pilot: pilotUpdated,
            });
          }
        }
      );
    });
  });
  //
};

exports.updateProfile = (req, res) => {
  const changes = {
    first_name: req.body.first_name,
    // last_name: req.body.first_name,
    // roles: req.body.roles ? req.body.roles : [],
    // banner: req.body.banner ? req.body.banner : "",
    // home_airport: req.body.home_airport ? req.body.home_airport : null,
    // air_craft: req.body.air_craft ? req.body.air_craft : [],
    // primary_aircraft: req.body.primary_aircraft
    //   ? req.body.primary_aircraft
    //   : "",
    // communities: req.body.communities
    //   ? req.body.communities.map((el) => mongoose.Types.ObjectId(el))
    //   : [],
    // certificates: req.body.certificates ? req.body.certificates : [],
    // rating_endorsements: req.body.rating_endorsements
    //   ? req.body.rating_endorsements
    //   : [],
    // total_hours: req.body.total_hours ? req.body.total_hours : 0,
  };
  Pilot.findByIdAndUpdate(
    req.params._id,
    {
      first_name: req.body.first_name,
      primary_aircraft: req.body.primary_aircraft
        ? req.body.primary_aircraft
        : "",
      rating_endorsements: req.body.rating_endorsements
        ? req.body.rating_endorsements
        : [],
    },
    (err, pilot) => {
      if (err) {
        res.status(400).json({
          err: err,
          message: "ERROR",
        });
      }
      if (pilot) {
        res.status(200).json({
          message: "UPDATED",
          pilot: pilot,
        });
      }
    }
  );
};

exports.updateProfilePic = async (req, res) => {
  try {
    const pilot = await Pilot.findById(req.pilot._id);
    console.log("reached");

    const resDel = await deleteFile(pilot.profile_picture_key);
    const resUpload = await uploadFile(req.file);
    pilot.profile_picture_link = resUpload.location;
    pilot.profile_picture_key = resUpload.key;
    const updatedPilot = await pilot.save();
    res.status(200).json({
      message: "PROFILE PICTURE UPDATED",
      status: 200,
      pilot: updatedPilot,
    });
  } catch (error) {
    res.status(400).json({
      message: "ERROR",
      status: 400,
      err: error,
    });
  }
};

exports.choosePreferences = (req, res) => {
  if (!req.pilot) {
    res.send({
      status: 301,
      message: "Unauthorized",
    });
  }
  Pilot.findByIdAndUpdate(
    req.pilot._id,
    {
      home_airport: mongoose.Types.ObjectId(req.body.home_airport),
      otherAirPorts: req.body.otherAirPorts.map((el) =>
        mongoose.Types.ObjectId(el)
      ),
    },
    (err, pilotRes) => {
      if (err) {
        res.status(400).json({
          err: err,
          message: "ERROR",
          status: 400,
        });
      }

      if (pilotRes) {
        res.status(200).json({
          status: 200,
          message: "UPDATED AIRPORTS",
          pilot: pilotRes,
        });
      }
    }
  );
};

exports.deletePilot = (req, res) => {
  if (!req.pilot) {
    res.status(301).json({
      status: 301,
      message: "Unauthorized",
    });
  }

  Pilot.findOne({ _id: req.pilot._id }, (err, pilot) => {
    if (err) {
      res.status(400).json({
        err: err,
        status: 400,
        message: "ERROR",
      });
    }
    if (!pilot.comparePassword(req.params.password)) {
      res.send({
        status: 401,
        message: "The password is incorrect.",
      });
    }

    pilot.account_status = "DISABLED";
    pilot.save((err, resPilotUpdated) => {
      if (err) {
        res.status(400).json({
          err: err,
          status: 400,
          message: "ERROR",
        });
      }
      if (resPilotUpdated) {
        res.status(200).json({
          status: 200,
          message: "PILOT DISABLED",
        });
      }
    });
  });
};

exports.reactivateAccount = async (req, res) => {
  const checkPilotCodeResponse = await checkPilotCode(
    req.params.email,
    req.params.code
  );
  console.log(checkPilotCodeResponse);
  if (checkPilotCodeResponse.status === 200) {
    Pilot.findOneAndUpdate(
      { email: req.params.email },
      { account_status: "ACTIVE" },
      (err, pilotUpdated) => {
        console.log("first");
        if (err) {
          res.status(400).json({
            status: 400,
            err: err,
          });
        }
        if (pilotUpdated) {
          res.status(200).json({
            token: JWT.generateUserJWT(pilotUpdated),
            pilot: pilotUpdated,
            status: 200,
            message: "REACTIVATED",
          });
        }
      }
    );
  }
  if (checkPilotCodeResponse.status !== 200) {
    res.status(checkPilotCodeResponse.status).json(checkPilotCodeResponse);
  }
};

exports.sendInvitation = (req, res) => {
  if (!req.pilot) {
    res.status(301).json({
      message: "Unauthorized",
      status: 301,
    });
  }

  Pilot.findByIdAndUpdate(
    req.params.recieverId,
    {
      $push: { recieving_invitations: req.pilot._id },
    },
    (err, pilotUpdated) => {
      if (err) {
        res.status(400).json({
          message: "ERROR",
          err: err,
          status: 400,
        });
      }
      if (pilotUpdated) {
        res.status(200).json({
          message: "INVITATION SENT",
          pilot: pilotUpdated,
        });
      }
    }
  );
};

exports.acceptInvitation = (req, res) => {
  if (!req.pilot) {
    res.status(301).json({
      message: "Unauthorized",
      status: 301,
    });
  }
  Pilot.findByIdAndUpdate(
    req.pilot._id,
    {
      $pull: { recieving_invitations: req.params.pilotId },
      $push: { firends: req.params.pilotId },
    },
    (err, resPilot) => {
      if (err) {
        res.status(400).json({
          message: "ERROR",
          err: err,
          status: 400,
        });
      }
      if (resPilot) {
        res.status(200).send({
          status: 200,
          message: "INVITATION ACCEPTED",
          res: resPilot,
        });
      }
    }
  );
};

exports.blockFriend = (req, res) => {
  if (!req.pilot) {
    res.status(301).json({
      message: "Unauthorized",
      status: 301,
    });
  }
  Pilot.findByIdAndUpdate(
    req.pilot._id,
    {
      $pull: { firends: req.params.pilotId },
      $push: { blockList: req.params.pilotId },
    },
    (err, resPilot) => {
      if (err) {
        res.status(400).json({
          message: "ERROR",
          err: err,
          status: 400,
        });
      }
      if (resPilot) {
        res.status(200).send({
          status: 200,
          message: "USER BLOCKED",
          res: resPilot,
        });
      }
    }
  );
};
const tokens = [
  "cW-YhTp2Qt6yXuYtnonCf3:APA91bGByTtRhm1Pa97Xbw3h-494F2PYAts3J8UQGNT6t6Kt80EgIi1WCqI8hI2gFKc0QVHzt4IqMNVswlmOrqdhl0r0aJw179PHLLRQmmHEeV6mzFBP_sdmNMT9NQhabiTg2aQ-roN6",
];
exports.pushNotification = async (req, res) => {
  const registrationToken =
    "cW-YhTp2Qt6yXuYtnonCf3:APA91bGByTtRhm1Pa97Xbw3h-494F2PYAts3J8UQGNT6t6Kt80EgIi1WCqI8hI2gFKc0QVHzt4IqMNVswlmOrqdhl0r0aJw179PHLLRQmmHEeV6mzFBP_sdmNMT9NQhabiTg2aQ-roN6";

  const message = {
    title: "Basic Notification",
    body: "This is a basic notification sent from the server!",
  };

  // Send a message to the device corresponding to the provided
  // registration token.
  admin
    .messaging()
    .sendMulticast({
      tokens: tokens,
      notification: message,
    })
    .then((response) => {
      // Response is a message ID string.
      res.send(response);
    })
    .catch((error) => {
      console.log("Error sending message:", error);
    });
};
