const { Animal } = require("../models/Animals");
const { User } = require("../models/Register");
const { Profile } = require("../models/Profile");
const { error: winstonError } = require("winston");

// Create a new channel
const createProfile = async (req, res) => {
  const userProfile = await Profile.findOne({ user: req.user._id });
  if (userProfile)
    return res.status(400).send("This user already has a profile account!");

  const newProfile = new Profile({
    user: req.user._id,
  });

  try {
    const saveProfile = await newProfile.save();
    if (!saveProfile)
      return res.status(500).send("Unable to save profile to database!");

    res.send({ ProfileCreated: saveProfile });
  } catch (error) {
    const msg = `Creating Profile error ${error}`;
    winstonError(msg);
    res.send(msg);
  }
};

// Join or subscribe to a valid channel
const joinChannel = async (req, res) => {
  const { id } = req.params;
  const userFound = await User.findById(req.user._id);
  if (!userFound) return res.status(404).send("No user found with that ID!");

  const userProfile = await Profile.findOne({ user: req.user._id });
  if (!userProfile)
    return res.status(404).send("No profile found with that ID, create one!");

  const animalFound = await Animal.findOne({ _id: id });
  if (!animalFound)
    return res.status(404).send("No animal found with that ID!");

  try {
    const { _id, name } = animalFound;
    // Check if channel index already exist, else add it
    const subsIndex = userProfile.subs.map((sub) => sub.animalId).indexOf(_id);
    if (subsIndex >= 0)
      return res.status(400).send("Already joined this channel - subs!");

    userProfile.subs.unshift({ name, animalId: _id });

    // Check if current user already exist in the array, else add it
    const subIndex = animalFound.sub.map((sub) => sub).indexOf(req.user._id);
    if (subIndex >= 0)
      return res.status(400).send("Already joined this channel - sub!");

    animalFound.sub.unshift(req.user._id);

    // Save new results to database
    const saveProfile = await userProfile.save();
    const saveAnimal = await animalFound.save();

    if (!saveProfile || !saveAnimal)
      return res.status(500).send("Unable to save channel to database!");

    res.send("New channel added to database!");
  } catch (error) {
    console.log(error);
  }
};

// Controller to show list of joined channels
const joinedChannel = async (req, res) => {
  let foundChannels = [];

  const userFound = await User.findOne({ _id: req.user._id });
  if (!userFound) return res.status(404).send("No user found with that ID!");

  const userProfile = await Profile.findOne({ user: req.user._id });
  if (!userProfile)
    return res.status(404).send("No profile found with that ID, create one!");

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
      return res.status(404).send("No channels found for this user!");

    foundChannels = foundChannels.map((channel) => channel);

    res.send(foundChannels);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createProfile, joinChannel, joinedChannel };
