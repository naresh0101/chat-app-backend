const 
    Services = require('../../services'),
    Joi = require("@hapi/joi")

const { Messages } = require('../../models');


class messageController {

    async savemessage(data) {
        let inputSchema = Joi.object({
            to: Joi.string().required(),
            auther: Joi.string().required(),
            message: Joi.string().required(),
            time: Joi.string()
        });
        try {
          await inputSchema.validateAsync(data);
        } catch (err) {
          resBody.message = err.message.replace(/\"/g, "");
          return res.status(200).json(resBody);
        }
       
        try {
            await Services.SaveMessage(data);
          } catch (err) {
            err_message = err.message.replace(/\"/g, "");
            console.log(err_message);
          }
    }

    async getById(req, res) {
      let resBody = {success : false}
      const {chatid} = req.params
      try {
        const message = await Messages.find({$or: [{auther: chatid}, {to: chatid}]},{ "updatedAt" : 0, "__v" : 0,"password" : 0,"updatedAt":0,"createdAt" : 0})
        resBody.success = true;
        return res.status(200).json(message);
    } catch (err) {
        resBody.success = true;
        resBody.message = err.message.replace(/\"/g, "");
        return res.status(200).json(resBody);
    }

  }
}

module.exports = new messageController()