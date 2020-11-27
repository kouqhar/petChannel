const express = require("express");
const passport = require("passport");
const { join } = require("path");

// Import routes
// const home = require("../routes/home");
const login = require("../routes/logins");
const register = require("../routes/registers");
const subscribe = require("../routes/subscribes");

// Middleware
const error = require("../middleware/error");

module.exports = function (app) {
  // Serve static assets if in production
  if (process.env.NODE_ENV === "production") {
    // Set static folder
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
  }

  // Serve up static files
  app.use(express.static(join(__dirname, "../public")));

  // Add a middleware
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // Passport middleware
  app.use(passport.initialize());

  // Passport config
  require("../config/passport")(passport);

  // Routes
  // app.use("/", home);
  app.use("/api/user/login", login);
  app.use("/api/user/register", register);
  app.use("/api/user", subscribe);

  // Express Error handling middleware
  app.use(error);
};
