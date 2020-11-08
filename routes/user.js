// Module Import
let express = require("express");
// Express Router
let router = express.Router();

// Middleware
let userControle = require("../controllers/user");


// POST of customer methods
router.post("/signup",userControle.Signup);
router.post("/login", userControle.login);


module.exports = router;