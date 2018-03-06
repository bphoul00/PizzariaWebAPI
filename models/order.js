var mongoose = require("mongoose");

//Ingredient Schema
var orderSchema = mongoose.Schema({
  customerName:{
    type:String,
    required:true
  },
  listIngredient:[{
      ingredientsName:{
        type:String
      }
  }],
  order_date:{
      type:Date,
      default: Date.now
    }
});

var Order =  module.exports = mongoose.model("Order", orderSchema);

//Get Ingredient from the mongodb
module.exports.getOrders = function (callback, limit){
  Order.find(callback).limit(limit);
}

//Add Ingredient to mongodb Ingredient Collection
module.exports.addOrder = function (order, callback){
  Order.create(order, callback);
}
