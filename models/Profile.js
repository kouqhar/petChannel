const { Schema, model } = require("mongoose");
const Joi = require("joi");

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  nickName: {
    type: String,
    required: true,
  },
  subs: [
    {
      name: {
        type: String,
      },
      animalId: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

const Profile = model("profile", ProfileSchema);

function validateProfile(user) {
  const schema = Joi.object({
    nickName: Joi.string().min(2).max(50).required(),
  });

  return schema.validate(user);
}

module.exports = { Profile, validateProfile };
