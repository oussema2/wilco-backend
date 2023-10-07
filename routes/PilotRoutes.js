const PilotRouter = require("express").Router();
const pilotController = require("../controllers/pilotController");
const { JWTChecker } = require("../helper/JWT");
const imageUpload = require("../multer/PilotsMulter/fileUploads").uploadFile;
const updateProfilePic =
  require("../multer/PilotsMulter/fileUploads").updateProfilePic;

PilotRouter.route("/register").post(
  imageUpload.single("profile_picture"),
  pilotController.register
);
PilotRouter.route("/login/:email/:password").get(pilotController.login);
PilotRouter.route("/getPosts/:_id").get(pilotController.getPosts);
PilotRouter.route("/searchPilotByName/:pattern").get(
  pilotController.searchPilotByName
);

PilotRouter.route("/getPilotById/:id").get(pilotController.getPilotById);
PilotRouter.route("/getPilotsByHomeAirPort/:airportId").get(
  pilotController.searchPilotsByHomeAirport
);

PilotRouter.route("/getCodeForeResetPassword/:email").get(
  pilotController.getCodeForeResetPassword
);
PilotRouter.route("/testCodeForResetPassword/:email/:reset_code").get(
  pilotController.testCodeForResetPassword
);

PilotRouter.route("/resetPassword/:_id").put(pilotController.resetPassword);
PilotRouter.route("/updateProfile/:_id").put(
  JWTChecker,
  pilotController.updateProfile
);

PilotRouter.route("/updateProfilePicture").put(
  JWTChecker,
  imageUpload.single("profile_picture"),
  pilotController.updateProfilePic
);

PilotRouter.route("/choosePreferences").post(
  JWTChecker,
  pilotController.choosePreferences
);

PilotRouter.route("/disableUser/:password").get(
  JWTChecker,
  pilotController.deletePilot
);

PilotRouter.route("/reactiveAccount/:email/:code").get(
  pilotController.reactivateAccount
);

// PilotRouter.route("/sendInvitation/:recieverId").get(
//   JWTChecker,
//   pilotController.sendInvitation
// );

PilotRouter.route("/sendInvitations/:recieverId").get(
  JWTChecker,
  pilotController.sendInvitation
);

PilotRouter.route("/acceptInvitation/:pilotId").get(
  JWTChecker,
  pilotController.acceptInvitation
);

PilotRouter.route("/blockFriend/:pilotId").get(
  JWTChecker,
  pilotController.blockFriend
);

PilotRouter.route("/pushNotifications").post(pilotController.pushNotification);

module.exports = PilotRouter;
