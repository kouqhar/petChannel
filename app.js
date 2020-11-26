const app = require("express")();
const port = process.env.PORT || 5000;

// Import the separated routes middleware
require("./startup/routes")(app);

// Import the separated database initialization
require("./startup/dbInit")();

// Import the separated config checker
require("./startup/config")();

// Import the separated JOi validation
require("./startup/joiValidation")();

// Listen to app port
const server = app.listen(port, () =>
  console.log(`Server is listening on port ${port}`)
);

module.exports = server;
