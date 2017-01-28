var express = require('express');
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

// setting up the express app

var app = express();
var PORT = process.env.PORT || 8080;

// requiring our models for syncing
var db = require('./models');

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Static directory
app.use(express.static(process.cwd() + "/public"));

// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// import routes from burger controller
require('./controllers/burgers_controller.js')(app);


// Syncing our sequelize models and then starting our express app
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});