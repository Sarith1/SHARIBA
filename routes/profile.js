var express = require('express');
var router = express.Router();
var pg = require('pg');
var Sequelize = require('sequelize');
var session = require('express-session');
var db = require('../modules/database');
var bodyParser = require('body-parser');

router.get('/', function(req, res) {
	var user = req.session.user;
	console.log('Getting session: ')
	console.log(req.session)
	console.log('Setting session user: ')
	console.log(user)
	if (user === undefined) {
		res.redirect('/?message=' + encodeURIComponent("Please log in to view your profile."));
	} else {
		var ID = req.session.user.id;
		db.cityTip.findAll({
			where: {
				user_id: ID,
			}
		}).then(function(cityTips) {
			var Data = cityTips.map(function(profiletips) {
				return {
					title: profiletips.dataValues.title,
					body: profiletips.dataValues.body,
					user_id: profiletips.dataValues.user_id
				}


			})
			var usersCityTips = Data;

			console.log(usersCityTips);
			res.render('profile', {
				title: 'Tipster Profile',
				usersCityTips: usersCityTips,
				name: req.session.user.name
			});
		});
	}
});

module.exports = router;