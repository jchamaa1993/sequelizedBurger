// var express = require("express");

// var router = express.Router();
// require all of the models.
var db = require("./../models");

//Create routes.


module.exports = function(app) {
	// redirect to index.
	app.get('/', function(req, res) {
		res.redirect('/index');
	});

	
	app.get("/index", function(req, res) {
		db.burgers.findAll().then(function(dbBurger) {
			console.log(dbBurger);
			var hbsObject = { burgers: dbBurger };
			res.render("index", hbsObject);
		});
	});

	app.post('/create', function(req, res) {
		db.burgers.create(req.body).then(function(dbBurger) {
			res.redirect("/index");
		});
	});

	app.put('/:id', function(req, res) {
		db.burgers.update({
			devoured: true
		}, {
			where: {
				id: req.params.id
			}
		}).then(function(dbBurger) {
			res.redirect("/index");
		});
	});
};





