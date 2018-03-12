var mongoose = require('mongoose');

var IngredientModel = require('./ingredient');

//Order Schema
var orderSchema = mongoose.Schema({
  customerName: { type: String, required: true },
  listIngredient: [{ name: String }],
  order_date: { type: Date, default: Date.now }
});

var OrderModel =  module.exports = mongoose.model('Order', orderSchema);

//Get Order from the mongodb
module.exports.getOrders = function (callback, limit) {
  OrderModel.find(callback).limit(limit);
};

//Add Order to mongodb Orders Collection
module.exports.addOrder = function (order, callback) {
  var list = [];
  for (var it = 0; it < order.listIngredient.length; it++) {
    var a = order.listIngredient[it].name;
    IngredientModel.findOne({ 'name': a },  function (err, ing) {
      if (err || !ing) {
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
            it = order.listIngredient.length;
            var lengthOfList = list.length;
            for(var rollBackIndex = 0; rollBackIndex < lengthOfList; rollBackIndex++) {
              var element = list.pop();
              IngredientModel.findOne({ name: element },  function (err, ingB) {
                var query = { 'name': ingB.name };
                var update = {
                  name: ingB.name,
                  price: ingB.price,
                  stock: ingB.stock + 1,
                };

                IngredientModel.findOneAndUpdate(query, update, { new: true }, function (err, res) {
                  if (err) { throw err; }

                });

              });
            }
          } else {
            console.log(list.length +" "+order.listIngredient.length+ "\n\n");
            if (list.length == order.listIngredient.length) {
              OrderModel.create(order, callback);
            }
          }
        });
      }
    });

  }

};
