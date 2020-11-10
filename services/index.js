const {  User , Messages, ChatRoom} = require("../models");

let isValidUser = async function (email) {
    let seller = null;
    try {
      seller = await Seller.aggregate(
          [
              {$match : {email:  email}}
          ]
      )
    } catch (err) {
      console.log(err);
    }
    return org;
};

let isUniqeUser = async function (data) {
  let user = null;
  try {
    user = await User.aggregate(
        [
            {$match : {email:  data.email}}
        ]
    )
  } catch (err) {
    console.log(err);
  }
  return user;
};
let addUser = async function (data) {
  let user = null;
  try {
    user = await new User(data).save();
  } catch (err) {
    console.log(err);
  }
  return user;
};
let createChatRoom = async function (data) {
  let room = null;
  try {
    room = await new ChatRoom(data).save();
  } catch (err) {
    console.log(err);
  }
  return room;
};

let saveMessage = async function (data) {
  let message = null;
  try {
    message = await new Messages(data).save();
  } catch (err) {
    console.log(err);
  }
  return message;
};
module.exports = {
    IsValidUser : isValidUser,
    IsUniqeUser : isUniqeUser,
    AddUser : addUser,
    SaveMessage : saveMessage,
    CreateChatRoom : createChatRoom
  

};
