const bcrypt = require("bcrypt");
const { error: winstonError } = require("winston");

const { validateLogin, User } = require("../models/Register");

const users = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.json(users);
  } catch (err) {
    console.log(err);
  }
};

const login = async (req, res) => {
  const { email: userEmail, password: userPassword } = req.body;

  const { error } = validateLogin(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  let user = await User.findOne({ email: userEmail });
  if (!user) return res.status(400).json("Invalid Email or password.");

  const validPassword = await bcrypt.compare(userPassword, user.password);
  if (!validPassword) return res.status(400).json("Invalid Email or password.");

  try {
    // Implementation of json web token
    const token = user.generateAuthToken();
    res.json({
      success: true,
      token: "Bearer" + token,
    });
  } catch (err) {
    winstonError(`Login error : ${err}`);
  }
};

module.exports = { users, login };
