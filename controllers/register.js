const { genSalt, hash } = require("bcrypt");
const _ = require("lodash");
const { validateUser, User } = require("../models/Register");
const { url } = require("gravatar");
const { info } = require("winston");

const currentUser = async (req, res) => {
  if (req.user.name !== req.params.userName)
    return res.status(404).send("No user with that name found!!!");

  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
};

const registerUser = async (req, res) => {
  const userEmail = req.body.email;

  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: userEmail });
  if (user)
    return res
      .status(400)
      .send("There is a user already registered with that email.");

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
    res.header("x-auth-token", token).send(displayUser);
  } catch (err) {
    info(`Registration error : ${err}`);
  }
};

module.exports = { currentUser, registerUser };
