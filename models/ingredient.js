var mongoose = require('mongoose');

//Ingredient Schema
var ingredientSchema = mongoose.Schema(
  {
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    minimum: 0,
  },
  stock: {
    type: Number,
    required: true,
    minimum: 0,
  },
}
);

var Ingredient =  module.exports = mongoose.model('Ingredient', ingredientSchema);

//Get Ingredient from the mongodb
module.exports.getIngredients = function (callback, limit) {
  Ingredient.find(callback).limit(limit);
};

//Add Ingredient to mongodb Ingredient Collection
module.exports.addIngredient = function (ingredient, callback) {
  Ingredient.create(ingredient, callback);
};

//Update Ingredient in mongodb Ingredient Collection
module.exports.updateIngredient = function (id, ingredient, option, callback) {
  var query = { id: id };
  var update = {
    name: ingredient.name,
    price: ingredient.price,
    stock: ingredient.stock,
  };
  Ingredient.findOneAndUpdate(query, update, option, callback);
};

//Delete Ingredient in mongodb Ingredient Collection
module.exports.deleteIngredient = function (id, callback) {
  var query = { id: id };
  Ingredient.remove(query, callback);
};
