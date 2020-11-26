const express = require("express");
const home = require("../routes/home");
const login = require("../routes/logins");
const register = require("../routes/registers");
const subscribe = require("../routes/subscribes");
const error = require("../middleware/error");

module.exports = function (app) {
  // View Engine
  app.set("view engine", "pug");
  app.set("views", "./views");

  // Add a middleware
  app.use(express.json());

  // Routes
  app.use("/", home);
  app.use("/api/user/login", login);
  app.use("/api/user/register", register);
  app.use("/api/user", subscribe);

  // Express Error handling middleware
  app.use(error);
};
