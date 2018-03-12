var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');
var util = require('util');
var jwt = require('jsonwebtoken');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});


IngredientModel = require('./models/ingredient');
OrderModel = require('./models/order');
UserModel = require('./models/users');

//Connect to mongoose
mongoose.connect('mongodb://localhost/pizzaria');
var db = mongoose.connection;
/*
//Clear the ingredients collection for the new data from the json
IngredientModel.remove(function (err, product) {
  if (err) return handleError(err);
});
*/
// Reinilize the ingredient database with the json file provided. Begin
var jsonIngredientFile = path.join(__dirname, 'resource', 'ingredients.json');
fs.readFile(jsonIngredientFile, 'UTF-8', function (err, data) {
  if (err) {
    throw err;
  }

  var listIngredient = JSON.parse(data);
  for (var i in listIngredient.ingredients) {
    IngredientModel.addIngredient(listIngredient.ingredients[i], function (err) {
      if (err) {
        //console.log(`Ingredient already exist`);
      } else {
        //console.log(`Ingredient has been inserted`);
      }
    });

  }
}); //End

// Reinilize the ingredient database with the json file provided. Begin
var jsonOrder =
{
  "customerName": "Bernard",
  "listIngredient" :
  [
    {
      'name': 'oignons',
    },
    {
      'name': 'champignons',
    },
    {
      'name': 'roquette',
    }
  ]
};

//  var obj = JSON.parse(jsonOrder);
OrderModel.validateIngredientOrder(jsonOrder, OrderModel
  .addOrder(jsonOrder, function (err, newOrder) {
  if (err) {
    throw err;
  }

  //console.log(`Order has been inserted`);
  //console.log(newOrder);
})
);


/*
//  var obj = JSON.parse(jsonOrder);
OrderModel.addOrder(jsonOrder, function (err) {
  if (err) {
    throw err;
  }

  console.log(`Order has been inserted`);
});  //End

*/
app.get('/', function (req, res) {
  res.send('Please use /api/orders  or /api/ingredients');
});

app.get('/api/ingredients', function (req, res) {
  IngredientModel.getIngredients(function (err, ingredients) {
    if (err) {
      throw err;
    }

    res.json(ingredients);
  });
});

app.get('/api/ingredients/instock', function (req, res) {
  IngredientModel.getIngredientsInstock(function (err, ingredients) {
    if (err) {
      throw err;
    }

    res.json(ingredients);
  });
});

app.post('/api/ingredients', function (req, res) {
  var ingredient = req.body;
  IngredientModel.addIngredient(ingredient, function (err, ingredient) {
    if (err) {
      throw err;
    }
    //res.sendStatus(201);
    res.json(ingredient);

  });
});

app.put('/api/ingredients/:_id', function(req, es) {
  var id =  req.params._id;
  var ingredient = req.body;
  IngredientModel.updateIngredient(id, ingredient, { new: true }, function (err, ingredient) {
    if (err) {
      throw err;
    }

    res.json(ingredient);
  });
});


app.delete('/api/ingredients/:_id', function (req, res) {
  var id =  req.params._id;
  IngredientModel.deleteIngredient(id, function (err, numberRowAffected) {
    if (err) {
      throw err;
    }

    res.json(numberRowAffected);
  });
});



app.get('/api/orders', function (req, res) {
  OrderModel.getOrders(function (err, orders) {
    if (err) {
      throw err;
    }

    res.json(orders);
  });
});

app.post('/auth/login', function (req, res) {
  UserModel.findUserbyEmailAndPassword(req.body, function (err, user) {
    if (err) {
      throw err;
    }
    if (!user) {
      return res.json({
        success: false,
        message: 'email or password is incorrect'
      });
    } else {
      sendToken(user, res);
    }

  });
});

app.post('/auth/register', function (req, res) {
  UserModel.addUser(req.body, function (err, user) {
    if (err) {
      throw err;
    }

    sendToken(user, res);
  });
});

function sendToken(user, res) {
  var token = jwt.sign(user.id, '123');
  res.json({ name: user.name, token });
}

function checkAuthenticated(req, res, next) {
  if (!req.header('authorization')) {
    return res.status(401).send(
      { message: 'Unauthorized request. Missing authentication header' });
  }

  var token = req.header('authorization').split(' ')[1];
  var payload = jwt.decode(token, '123');

  if (!payload) {
    return res.status(401).send(
      { message: 'Unauthorized requested. Authentication header invalid' });
  }

  req.user = payload;

  next();
}

app.get('/users/me', checkAuthenticated, (req, res) => {
  UserModel.findUserbyId(req.user, function (err, authUser) {
    res.json(authUser);
  });
});

app.listen(3000);

console.log('Express app ruinning on http://localhost:3000/');

module.exports = app;
