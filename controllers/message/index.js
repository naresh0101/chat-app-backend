// const { Messages } = require('../../models');
// const 
//     Services = require('../../services'),
//     Joi = require("@hapi/joi")

// class messageControler {
  
//     async Signup(req, res) {
//         let 
//             reqBody = req.body,
//             resBody = { success: false };  
//         // Input body validation
//         let inputSchema = Joi.object({
//             email: Joi.string().email().required(),
//             message: Joi.string().required(),
//             name: Joi.string(),
//             password: Joi.string().min(8).max(32).required(),
//           });
//         try {
//             await inputSchema.validateAsync(reqBody);
//         } catch (err) {
//             resBody.message = err.message.replace(/\"/g, "");
//             return res.status(200).json(resBody);
//         }
//         Messages = await Services.SaveMessage(reqBody);
//         resBody.success = true;
//         resBody.message = "message created successfully!";
//         res.status(200).json(resBody);
//     }
// }

// module.exports = new messageControler()