const { Schema, model } = require("mongoose");

const AnimalSchema = new Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 50,
    required: true,
  },
  sub: [String],
  date: {
    type: Date,
    default: Date.now,
  },
});

const Animal = model("animal", AnimalSchema);

module.exports = { Animal };
