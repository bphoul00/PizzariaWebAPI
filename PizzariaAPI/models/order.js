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
module.exports.validateIngredientOrder = function (order, callback) {
  var list = [];
  for (var it = 0; it < order.listIngredient.length; it++) {
    var a = order.listIngredient[it].name;
    IngredientModel.findOne({ 'name': a },  function (err, ing) {
      if (err || !ing) {
        console.log('Doesn\'t exist');
      } else {
        var query = { 'name': ing.name };
        var update = {
          name: ing.name,
          price: ing.price,
          stock: ing.stock - 1,
        };
        list.push(ing.name);
        IngredientModel.findOneAndUpdate(query, update, { new: true },function (err, newIng) {
          if (newIng.stock < 0) {
            for (var rollBackIndex in list) {
              IngredientModel.findOne({ 'name': list[rollBackIndex] },  function (err, ingB) {
                var query = { 'name': ingB.name };
                var update = {
                  name: ingB.name,
                  price: ingB.price,
                  stock: ingB.stock + 1,
                };

                IngredientModel.findOneAndUpdate(query, update, { new: true }, function (err, res) {
                  if (err) { throw err; }

                  //console.log("Fail "+ res);
                });

              });
            }
          }

          //console.log("Succes "+newIng);
        });
      }
    });

  }

};

//Add Ingredient to mongodb Ingredient Collection
module.exports.addOrder  = function (order, callback) {
  OrderModel.create(order, callback);
  console.log("I think it work!!!!");
}
