const { genSalt, hash } = require("bcrypt");
const _ = require("lodash");
const { validateUser, User } = require("../models/Register");
const { url } = require("gravatar");
const { info } = require("winston");

const registerUser = async (req, res) => {
  const userEmail = req.body.email;

  const { error } = validateUser(req.body);
  if (error) {
    return res.status(400).json(error.details[0].message);
  }

  let user = await User.findOne({ email: userEmail });
  if (user) {
    return res
      .status(400)
      .json("There is a user already registered with that email.");
  }

  // Setting up gravatar
  const avatar = url(userEmail, {
    s: "200", // Size
    r: "pg", // Rating
    d: "mm", // Default
  });

  try {
    const createUser = _.pick(req.body, ["name", "email", "password"]);
    user = new User(createUser);

    const salt = await genSalt(10);
    user.password = await hash(user.password, salt);
    user.avatar = avatar;

    await user.save();

    const displayUser = _.pick(user, ["name", "email", "avatar"]);
    const token = user.generateAuthToken();
    // res.header("x-auth-token", token);
    res.json(displayUser);
  } catch (err) {
    info(`Registration error : ${err}`);
  }
};

module.exports = { registerUser };
