const { User } = require('../../models');
const 
    Services = require('../../services'),
    Joi = require("@hapi/joi")

class userControler {
  
    async Signup(req, res) {
        let reqBody = req.body,
          resBody = { success: false };    
        // Input body validation
        let inputSchema = Joi.object({
            email: Joi.string().email().required(),
            name: Joi.string().required(),
            avatar: Joi.string().required(),
            password: Joi.string().min(8).max(32).required(),
        });
        try {
          await inputSchema.validateAsync(reqBody);
        } catch (err) {
          resBody.message = err.message.replace(/\"/g, "");
          return res.status(200).json(resBody);
        }
        let user = await Services.IsUniqeUser(reqBody);
        if (user.length > 0) {
          resBody.message = "Account already exist !";
          return res.status(200).json(resBody);
        }
        user = await Services.AddUser(reqBody);
        resBody.success = true;
        resBody.message = "Account Created Successfully";
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
    async  searchUser(req, res){
      let resBody = {success : false},
          reqBody = req.body
      try {
          const user = await User.find( {
              $or: [
                  {'email': {$options:'i', $regex: reqBody.user}}, 
                  {'name':  {$options:'i', $regex: reqBody.user}},
                  {'message':  {$options:'i', $regex: reqBody.user}}
                ],
           } ,{ "updatedAt" : 0, "__v" : 0,"password" : 0,"updatedAt":0,"createdAt" : 0,"api_key" : 0})
          resBody.success = true;
          return res.status(200).json(user);
      } catch (err) {
          resBody.success = true;
          resBody.message = err.message.replace(/\"/g, "");
          return res.status(200).json(resBody);
      }
     }
     
     async  getUser(req, res){
      let resBody = {success : false},
          reqBody = req.body
      try {
          const user = await User.find( {} ,{ "updatedAt" : 0, "__v" : 0,"password" : 0,"updatedAt":0,"createdAt" : 0,"api_key" : 0})
          resBody.success = true;
          return res.status(200).json(user);
      } catch (err) {
          resBody.success = true;
          resBody.message = err.message.replace(/\"/g, "");
          return res.status(200).json(resBody);
      }
     }
}

module.exports = new userControler()