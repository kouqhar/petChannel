const router = require("express").Router();

// Load middleware
const auth = require("../middleware/auth");

// Load controllers
const { users , login } = require('../controllers/login');

// @route   GET api/user/login
// @desc    Getting all users
// @access  private
router.get("/users", auth, users);

// @route   POST api/user/login
// Authenticating users
// @access  public
router.post("/", login);

module.exports = router;
