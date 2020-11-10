// Module Import

let express = require("express");
// Express Router
let router = express.Router();

// Middleware

//  Controllers 
let userControler = require("../controllers/user");
const Auth = require("../middlewares/auth");

// POST user methods
router.post("/signup",userControler.Signup);
router.post("/login", userControler.login);

router.post("/searchuser",Auth.apiKeyAuth,userControler.searchUser);

router.get("/getusers",Auth.apiKeyAuth,userControler.getUser);


module.exports = router;
