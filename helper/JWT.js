const jsonwebtoken = require("jsonwebtoken");

exports.JWTChecker = (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    jsonwebtoken.verify(
      req.headers.authorization.split(" ")[1],
      "RESTFULAPIs",
      (err, decode) => {
        if (err) req.pilot = undefined;
        req.pilot = decode;
        next();
      }
    );
  } else {
    req.pilot = undefined;

    next();
  }
};

exports.generateUserJWT = (data) => {
  return jsonwebtoken.sign(
    {
      email: data?.email,
      firstName: data?.first_name,
      lastName: data?.last_name,
      media_folder_id: data?.media_folder_id,
      _id: data?._id,
    },

    "RESTFULAPIs"
  );
};
