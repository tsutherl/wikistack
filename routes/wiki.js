var express = require('express');
var router = express.Router();
var models = require('../models')
var Page = models.Page; //so is models like the name of the obj and Page is the property we want?
var User = models.User;
module.exports = router; //do this right away so you don't forget!!


//pretty much everything sequelize does is a promise
//GET 
router.get('/', function(req, res, next) { 
    res.redirect('/') //how does this know to go back to app.js is the what .redirect does? goes back to the page with the port?
    Page.findAll()
    .then(function(pages) {
        res.render('index', {
            pages: pages
        })//so render always needs the name of the page to render and then in this case the optional info to insert into the html.. how does it work with the hash 
    })
    .catch(next) 
});

router.post('/', function(req, res, next) { 
    var newPage = Page.build(req.body);
    
    newPage.save()
    .then(function(req, res, next) {
        console.log('page added')
        res.redirect('/wiki/' + newPage.urlTitle)
        // res.redirect('/'); //why redirect? also why am I not seeing the error.html page? 
    })
    .catch(function(err) {
        next(err);
    });
});

router.get('/add', function(req, res, next) { 
    res.render('addpage');
});

router.get('/:urlTitle', function(req, res, next) {
    var urlTitleOfAPage = req.params.urlTitle;

    Page.findOne({ //so is Page actually a class and findOne is a class method?
        where: {
            urlTitle: urlTitleOfAPage
        }
    })
    .then(function(page) {
        if (!page) return next(new Error('that page was not found'));
        res.render('wikipage', {CanBeanyName: page}) //what do we treat 'page' like a prop at set value to key (why do we have to do this)? what are the arguments for this? 
    })
    .catch(next) // how does it know to go to the error handling function just by putting next?
})


