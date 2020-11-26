const router = require("express").Router();
const { homePage, test } = require("../controllers/homePage");

// Route to the home page
router.get("/", homePage);

router.get("/test", test);

module.exports = router;
