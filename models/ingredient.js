var mongoose = require('mongoose');

//Ingredient Schema
var ingredientSchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0 }
  }
);

var IngredientModel =  module.exports = mongoose.model('Ingredient', ingredientSchema);

//Get Ingredient from the mongodb
module.exports.getIngredients = function (callback, limit) {
  IngredientModel.find(callback).limit(limit);
};

//Get Ingredient from the mongodb
module.exports.getIngredientsInstock = function (callback, limit) {
  var query = { stock: { $gt: 0 } };
  IngredientModel.find(query,callback).limit(limit);
};

//Add Ingredient to mongodb Ingredient Collection
module.exports.addIngredient = function (ingredient, callback) {
  IngredientModel.create(ingredient, callback);
};

//Update Ingredient in mongodb Ingredient Collection
module.exports.updateIngredient = function (id, ingredient, option, callback) {
  var query = { id: id };
  var update = {
    name: ingredient.name,
    price: ingredient.price,
    stock: ingredient.stock,
  };
  IngredientModel.findOneAndUpdate(query, update, option, callback);
};

//Delete Ingredient in mongodb Ingredient Collection
module.exports.deleteIngredient = function (id, callback) {
  var query = { id: id };
  IngredientModel.remove(query, callback);
};
