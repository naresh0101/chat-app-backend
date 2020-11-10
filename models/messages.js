const mongoose = require("mongoose");
const mongooseBcrypt = require("mongoose-bcrypt");
const mongooseTimeStamp = require("mongoose-timestamp");

const messageSchema = new mongoose.Schema(
  { 
    sendbyId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    sendtoId: {
        type: mongoose.Schema.Types.ObjectId,
        lowercase: true,
        trim: true,
        required: true,
    },
    message: {
       type: String,
       trim: true,
       required: true,
    },
    time: {
      type: String,
      trim: true,
      required: true,
   },
  },
  { collection: "message" }
);

messageSchema.plugin(mongooseBcrypt);
messageSchema.plugin(mongooseTimeStamp);

module.exports = mongoose.model("message", messageSchema);