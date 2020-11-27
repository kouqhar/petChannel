const { info } = require("winston");

module.exports = function (err, req, res, next) {
  // Log the exception
  info(err.message, err);

  console.log(err);

  // Send an internal info message to the user
  res.status(500).send(`Error middleware error message from ${req}. ${err}`);
};
