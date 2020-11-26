const router = require("express").Router();
const auth = require("../middleware/auth");
const { createProfile, joinChannel } = require("../controllers/subscribe");

// Private route to create a new user profile
router.post("/create/profile", auth, createProfile);

// Private route ro join a channel
router.post("/channel/join/:id", auth, joinChannel);

module.exports = router;
