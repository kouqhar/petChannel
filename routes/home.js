const router = require("express").Router();
const { homePage } = require("../controllers/homePage");

// Route to the home page
router.get("/", homePage);

module.exports = router;
