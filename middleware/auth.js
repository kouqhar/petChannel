const jwt = require("jsonwebtoken");
const { isJWT } = require("validator");
const { secretOrKey } = require("../config/keys");

function auth(req, res, next) {
  const token = req.header("x-auth-token");
  const isValidJwt = isJWT(token);

  if (!token || token === "")
    return res.status(401).send("Access denied. No token provided.");

  if (!isValidJwt) return res.status(402).send("Invalid json web token!!!");

  try {
    // Verify if token is valid and true
    // Here we need to use our jwt
    const decoded = jwt.verify(token, secretOrKey);

    req.user = decoded;

    // Pass control to the next middleware function in the req processing pipeline
    next();
  } catch (err) {
    return res.status(400).send("Invalid token.");
  }
}

module.exports = auth;
