var express = require('express');
var router = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;

module.exports = router;

router.get('/', function(req, res, next) { //pretty much everything sequelize does is a promise
//     Page.findAll({attributes: ['title']}).then('/', function(result) {
// console.log('hi')
//         res.send(result);
console.log(Page)
});

router.post('/', function(req, res, next) { 
    res.send('posted');
});

router.get('/add', function(req, res, next) { 
    res.render('addpage');
});
