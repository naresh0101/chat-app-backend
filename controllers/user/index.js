const { User } = require('../../models');
const 
    Services = require('../../services'),
    Joi = require("@hapi/joi")

class userControle {
  
    async Signup(req, res) {
        let 
            reqBody = req.body,
            resBody = { success: false };  
        // Input body validation
        let inputSchema = Joi.object({
            email: Joi.string().email().required(),
            name: Joi.string().required(),
            password: Joi.string().min(8).max(32).required(),
          });
        try {
            await inputSchema.validateAsync(reqBody);
        } catch (err) {
            resBody.message = err.message.replace(/\"/g, "");
            return res.status(200).json(resBody);
        }
        let user = await Services.IsUniqeUser(reqBody)
        if(user === null){
          user = await Services.AddUser(reqBody);
          resBody.success = true;
          resBody.message = "User created successfully!";
          res.status(200).json(resBody);
        }
        if (user.length > 0) {
            resBody.message = "User Already exist!";
            return res.status(200).json(resBody);
        }
        user = await Services.AddUser(reqBody);
        resBody.success = true;
        resBody.message = "User created successfully!";
        res.status(200).json(resBody);
    }

    async login(req, res) {
        let 
            reqBody = req.body,
            resBody = { success: false };
        let 
            inputSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(8).max(32).required(),
        });
        try {
          await inputSchema.validateAsync(reqBody);
        } catch (err) {
          console.log(err);
          resBody.message = err.message.replace(/\"/g, "");
          return res.status(200).json(resBody);
        }
        let user = await User.findOne({ email: reqBody.email });
      
        if (!user) {
          resBody.message = "Invalid email provided";
          return res.status(200).json(resBody);
        }
        const isValidPassword = await user.verifyPassword(reqBody.password);
        if (!isValidPassword) {
          console.log("reqBody");

          resBody.message = "Invalid password provided";
          return res.status(200).json(resBody);
        }
        resBody = {
          success : true,
          user: user.toJSON(),
          message : "Login successfully"
        };
        res.status(200).json(resBody);
    }
}

module.exports = new userControle()