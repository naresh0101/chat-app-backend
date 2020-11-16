// Module Import

let express = require("express");
// Express Router
let router = express.Router();

// Middleware

//  Controllers 
let userControler = require("../controllers/user");
let messageController = require("../controllers/message");

const Auth = require("../middlewares/auth");

// POST user methods
router.post("/signup",userControler.Signup);
router.post("/login", userControler.login);

router.post("/searchuser",Auth.apiKeyAuth,userControler.searchUser);

router.get("/getusers",Auth.apiKeyAuth,userControler.getUser);

// Message 
router.get("/:chatid",Auth.apiKeyAuth,messageController.getById);


module.exports = router;
