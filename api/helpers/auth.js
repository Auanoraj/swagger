var jwt = require("jsonwebtoken");
var sharedSecret = "shh";

exports.verifyToken = (req, authOrSecDef, token, callback) => {

  function sendError() {
    return req.res.status(403).json({ message: "Error: Access Denied" });
  }

  if (token && token.indexOf("Bearer ") == 0) {
    var tokenString = token.split(" ")[1];

    jwt.verify(tokenString, sharedSecret, function(
      verificationError,
      decodedToken
    ) {
      //check if the JWT was verified correctly
      if (
        verificationError == null &&
        decodedToken
      ) {
          req.auth = decodedToken;
          //if there is no error, just return null in the callback
          return callback(null);
      } else {
        //return the error in the callback if the JWT was not verified
        return callback(sendError());
      }
    });
  } else {
    //return the error in the callback if the Authorization header doesn't have the correct format
    return callback(sendError());
  }
};

exports.issueToken = function(username) {
  var token = jwt.sign(
    {
      sub: username
    },
    sharedSecret
  );
  return token;
};
