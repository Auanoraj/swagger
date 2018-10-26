var auth = require('../helpers/auth');

exports.signUpPost = (req, res, next) => {
  var username = req.body.username;
  var password = req.body.password;

  if (!username && !password) {
    var response = { message: 'Error: Please enter username and password' };
    res.writeHead(400, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(response));
  } else {
    var response = { message: "SignedUp successfully!" };
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(response));
  }
}

exports.loginPost = (req, res, next) => {
  var username = req.body.username;
  var password = req.body.password;

  if (username == "username" && password == "password") {
      var tokenString = auth.issueToken(username);
      var response = { token: tokenString };
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(response));
  } else {
    var response = { message: "Error: Credentials incorrect" };
    res.writeHead(403, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(response));
  }
}

exports.protectedGet = (req, res, next) => {
  var response = { message: "Protected route!" };
  res.writeHead(200, { "Content-Type": "application/json" });
  return res.end(JSON.stringify(response));
};