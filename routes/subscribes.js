const router = require("express").Router();
const passport = require("passport");
const auth = require("../middleware/auth");
const {
  createProfile,
  joinChannel,
  joinedChannel,
  allChannels,
  currentUser,
} = require("../controllers/subscribe");

// Getting the current user
router.get(
  "/my-profile",
  passport.authenticate("jwt", { session: false }),
  currentUser
);

// Private route to show list of joined channels
router.get(
  "/channel/channels",
  passport.authenticate("jwt", { session: false }),
  allChannels
);

// Private route to show list of joined channels
router.get(
  "/channel/my-channels",
  passport.authenticate("jwt", { session: false }),
  joinedChannel
);

// Private route to create a new user profile
router.post(
  "/create/profile",
  passport.authenticate("jwt", { session: false }),
  createProfile
);

// Private route ro join a channel
router.post(
  "/channel/join/:id",
  passport.authenticate("jwt", { session: false }),
  joinChannel
);

module.exports = router;
