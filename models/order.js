var mongoose = require('mongoose');

var IngredientModel = require('./ingredient');

//Ingredient Schema
var orderSchema = mongoose.Schema({
  customerName: { type: String, equired: true },
  listIngredient: [{ name: String }],
  order_date: { type: Date, default: Date.now }
});

var OrderModel =  module.exports = mongoose.model('Order', orderSchema);

//Get Ingredient from the mongodb
module.exports.getOrders = function (callback, limit) {
  OrderModel.find(callback).limit(limit);
};

//Add Ingredient to mongodb Ingredient Collection
module.exports.addOrder = function (order, callback) {
  for (var i in order.listIngredient) {
    var a = order.listIngredient[i].name;
    IngredientModel.findOne({ 'name': a },  function (err, ing) {
      if (err || ing.length == 0) {
        console.log('Doesn\'t exist');
      } else {
        if (ing.stock >= 1 ) {
          var query = { 'name': ing.name };
          var update = {
            name: ing.name,
            price: ing.price,
            stock: ing.stock - 1,
          };
          console.log("Got Here");
          console.log(update);
          IngredientModel.findOneAndUpdate(query, update, { new: true },function (err, res) {
            if (err) {
              //TODO Add exception for insufficient stock
            }

            console.log(res);
          });
        }
      }
    });

  }

  //OrderModel.create(order, callback);
};

//Add Ingredient to mongodb Ingredient Collection
module.exports.creatte = function (order, callback) {
  OrderModel.create(order, callback);
};
