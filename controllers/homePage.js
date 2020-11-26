const { Animal } = require("../models/Animals");

const homePage = (req, res) => {
  res.send("welcome to the homepage");
};

const test = async (req, res) => {
  const animal = await Animal.find({});
  res.send({ message: animal });
};

module.exports = { homePage, test };
