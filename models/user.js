const mongoose = require("mongoose");
const mongooseBcrypt = require("mongoose-bcrypt");
const mongooseTimeStamp = require("mongoose-timestamp");
const uuidApiKey = require("uuid-apikey");

const userSchema = new mongoose.Schema(
  { 
    name: {
      type: String,
      trim: true,
      required: true,
    },
    avatar: {
      type: String,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
      unique: true,
  },
    password: {
      type: String,
      required: true,
      bcrypt: true,
    },
    api_key: {
      type: String,
      unique: true,
      default: uuidApiKey.create().apiKey,
      required: true,
    },
  },
  { collection: "user" }
);

userSchema.plugin(mongooseBcrypt);
userSchema.plugin(mongooseTimeStamp);

module.exports = mongoose.model("user", userSchema);