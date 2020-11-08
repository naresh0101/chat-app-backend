const {  User } = require("../models/index");

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

module.exports = {
    IsValidUser : isValidUser,
    IsUniqeUser : isUniqeUser,
    AddUser : addUser

};
