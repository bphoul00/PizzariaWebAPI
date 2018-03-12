var mongoose = require('mongoose');

//User Schema
var userSchema = mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, min: 0 },
    name: { type: String, required: true },
    telephone: { type: Number, required: true, min: 0 },
    address: { type: String, required: true, min: 0 }
  }
);

var UserModel =  module.exports = mongoose.model('User', userSchema);

//Get User from the mongodb
module.exports.getIngredients = function (callback, limit) {
  UserModel.find(callback).limit(limit);
};

//Add User to mongodb users Collection
module.exports.addUser = function (user, callback) {
  UserModel.create(user, callback);
};

//Find User by Id in mongodb users Collection
module.exports.findUserbyId = function (id, callback) {
  var query = { _id: id };
  UserModel.findOne(query, callback);
};

//Find User by email and password in mongodb users Collection
module.exports.findUserbyEmailAndPassword = function (loginData, callback) {
  var query = { email: loginData.email, password: loginData.password };
  UserModel.findOne(query, callback);
};

//Update User in mongodb users Collection
module.exports.updateUser = function (id, user, option, callback) {
  var query = { id: id };
  var update = {
    email: user.email,
    password: user.password,
    name: user.name,
    telephone: user.telephone,
    Address: user.Address,
  };
  UserModel.findOneAndUpdate(query, update, option, callback);
};

//Delete User in mongodb users Collection
module.exports.deleteUser = function (id, callback) {
  var query = { id: id };
  UserModel.remove(query, callback);
};
