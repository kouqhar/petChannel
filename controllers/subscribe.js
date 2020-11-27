const { Animal } = require("../models/Animals");
const { User } = require("../models/Register");
const { Profile, validateProfile } = require("../models/Profile");
const { info: winstonError } = require("winston");

// Create a new userProfile
const createProfile = async (req, res) => {
  const { error } = validateProfile(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  const userProfile = await Profile.findOne({ user: req.user._id });
  if (userProfile)
    return res.status(400).json("This user already has a profile account!");

  const newProfile = new Profile({
    user: req.user._id,
    nickName: req.body.nickName,
  });

  try {
    const saveProfile = await newProfile.save();
    if (!saveProfile)
      return res.status(500).json("Unable to save profile to database!");

    res.json({ profile: saveProfile });
  } catch (error) {
    const msg = `Creating Profile error ${error}`;
    winstonError(msg);
    res.json(msg);
  }
};

// Join or subscribe to a valid channel
const joinChannel = async (req, res) => {
  const { id } = req.params;
  const userFound = await User.findById(req.user._id);
  if (!userFound) return res.status(404).json("No user found with that ID!");

  const userProfile = await Profile.findOne({ user: req.user._id });
  if (!userProfile)
    return res.status(404).json("No profile found with that ID, create one!");

  const animalFound = await Animal.findOne({ _id: id });
  if (!animalFound)
    return res.status(404).json("No animal found with that ID!");

  try {
    const { _id, name } = animalFound;
    // Check if channel index already exist, else add it
    const subsIndex = userProfile.subs.map((sub) => sub.animalId).indexOf(_id);
    if (subsIndex >= 0)
      return res.status(400).json("Already joined this channel - subs!");

    userProfile.subs.unshift({ name, animalId: _id });

    // Check if current user already exist in the array, else add it
    const subIndex = animalFound.sub.map((sub) => sub).indexOf(req.user._id);
    if (subIndex >= 0)
      return res.status(400).json("Already joined this channel - sub!");

    animalFound.sub.unshift(req.user._id);

    // Save new results to database
    const saveProfile = await userProfile.save();
    const saveAnimal = await animalFound.save();

    if (!saveProfile || !saveAnimal)
      return res.status(500).json("Unable to save channel to database!");

    res.json("New channel added to database!");
  } catch (error) {
    console.log(error);
  }
};

// Controller to show list of joined channels
const joinedChannel = async (req, res) => {
  let foundChannels = [];

  const userFound = await User.findOne({ _id: req.user._id });
  if (!userFound) return res.status(404).json("No user found with that ID!");

  const userProfile = await Profile.findOne({ user: req.user._id });
  if (!userProfile)
    return res.status(404).json("No profile found with that ID, create one!");

  try {
    const allProfile = await Animal.find({});
    allProfile
      .map((channel) => channel)
      .map((subs) => {
        if (Array.isArray(subs.sub)) {
          subs.sub.forEach((sub) => {
            sub === req.user._id ? foundChannels.push(subs) : null;
          });
        }
      });

    if (foundChannels.length < 1)
      return res.status(404).json("No channels found for this user!");

    foundChannels = foundChannels.map((channel) => channel);

    res.json(foundChannels);
  } catch (error) {
    console.log(error);
  }
};

const allChannels = async (req, res) => {
  const animal = await Animal.find({});
  res.json({ message: animal });
};

const currentUser = async (req, res) => {
  if (!req.user.name)
    return res.status(404).json("No user with that name found!!!");

  const user = await User.findById(req.user._id).select("-password");
  res.json(user);
};

module.exports = {
  createProfile,
  joinChannel,
  joinedChannel,
  allChannels,
  currentUser,
};
