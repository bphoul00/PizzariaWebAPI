var express = require("express");
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var fs = require("fs");
var path = require("path");
const util = require('util');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

Genre = require("./models/genres");
Ingredient = require("./models/ingredient");
Order = require("./models/order")

//Connect to mongoose
mongoose.connect("mongodb://localhost/stuff")
var db = mongoose.connection;

//Clear the ingredients collection for the new data from the json
Ingredient.remove(function (err, product) {
  if (err) return handleError(err);
})

// Reinilize the ingredient database with the json file provided. Begin
var jsonIngredientFile = path.join(__dirname, "resource", "ingredients.json");
fs.readFile(jsonIngredientFile, "UTF-8", function (err, data) {
  if(err){
    throw err;
  }
  var listIngredient = JSON.parse(data);
  for(var i in listIngredient.ingredients){
    Ingredient.addIngredient(listIngredient.ingredients[i],function(err){
      if(err){
        throw err;
      }
    });

    console.log(`Ingredient has been inserted`);
  }
});
//End

// Reinilize the ingredient database with the json file provided. Begin
var jsonOrder =
{
  "customerName" : "Bernard",
  "listIngredient" :
  [
    {
      "name": "oignons",
      "price": 0.5,
      "stock": 15
    },
    {
      "name": "champignons",
      "price": 2.0,
      "stock": 45
    }
  ]
};

//  var obj = JSON.parse(jsonOrder);
Order.addOrder(jsonOrder,function(err){
  if(err){
    throw err;
  }
  console.log(`Order has been inserted`);
});
//End


app.get("/", function (req,res) {
  res.send("Please use /api/orders  or /api/ingredients");
});

app.get("/api/ingredients", function(req,res) {
  Ingredient.getIngredients(function(err,ingredients){
    if(err){
      throw err;
    }
    res.json(ingredients);
  });
});

app.post("/api/ingredients", function(req,res) {
  var ingredient = req.body;
  Ingredient.addIngredient(ingredient, function(err,ingredient){
    if(err){
      throw err;
    }
    res.json(ingredient);
    //console.log(util.inspect(ingredient, {showHidden: false, depth: null}));
  });
});

app.put("/api/ingredients/:_id", function(req,res) {
  var id =  req.params._id;
  var ingredient = req.body;
  Ingredient.updateIngredient(id,ingredient,{new: true}, function(err,ingredient){
    if(err){
      throw err;
    }
    res.json(ingredient);
  });
});


app.delete("/api/ingredients/:_id", function(req,res) {
  var id =  req.params._id;
  Ingredient.deleteIngredient(id, function(err,numberRowAffected){
    if(err){
      throw err;
    }
    res.json(numberRowAffected);
  });
});



app.get("/api/orders", function(req,res) {
  Order.getOrders(function(err,orders){
    if(err){
      throw err;
    }
    res.json(orders);
  });
});


/*
app.use(function (req, res, next) {
console.log(`${req.method} request for ${req.url}`)
next();
});

app.use(express.static("./public"));
*/
app.listen(3000);

console.log("Express app ruinning on http://localhost:3000/")

module.exports = app;
