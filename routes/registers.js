const router = require("express").Router();

// Load Controllers
const { registerUser } = require("../controllers/register");

// Registering a new user
router.post("/", registerUser);

module.exports = router;
