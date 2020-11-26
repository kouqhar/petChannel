const bcrypt = require("bcrypt");
const { error: winstonError } = require("winston");

const { validateLogin, User } = require("../models/Register");

const users = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.send(users);
  } catch (err) {
    console.log(err);
  }
};

const login = async (req, res) => {
  const userEmail = req.body.email;
  const userPassword = req.body.password;

  const { error } = validateLogin(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: userEmail });
  if (!user) return res.status(400).send("Invalid Email or password.");

  const validPassword = await bcrypt.compare(userPassword, user.password);
  if (!validPassword) return res.status(400).send("Invalid Email or password.");

  try {
    // Implementation of json web token
    const token = user.generateAuthToken();
    res.send(token);
  } catch (err) {
    winstonError(`Login error : ${err}`);
  }
};

module.exports = { users, login };
