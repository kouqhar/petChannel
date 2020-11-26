const router = require('express').Router();

// Load middleware
const auth = require('../middleware/auth')

// Load Controllers
const { currentUser, registerUser } = require('../controllers/register')

// Getting the current user
router.get('/:userName', auth, currentUser)

// Registering a new user
router.post('/', registerUser)

module.exports = router;