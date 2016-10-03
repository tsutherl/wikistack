const express = require('express');
const router = express.Router();
const models = require('../models');
var Page = models.Page;
var User = models.User;
const Bluebird = require('bluebird') 

router.get('/', function (req, res, next) {
    Page.findAll({})
    .then(function(pages) {
        res.render('index', {pages: pages})

    }).catch(next)
     
})

router.post('/', function(req, res, next) {
    User.findOrCreate({
        where: {
            name: req.body.authorName,
            email: req.body.authorEmail
        }
    }).spread(function(user) {
        return Page.create({
            title: req.body.title,
            content: req.body.content,
            status: req.body.status
        }).then(function(page) {
            return page.setAuthor(user)
        })
    }).then(function(page) {
        res.redirect(page.route)
    }).catch(next); 
})

router.get('/add', function(req, res, next) {
    res.render('addpage');
})

router.get('/:urlTitle', function(req, res, next) {
    var urlTitleOfPage = req.params.urlTitle;
    Page.findOne({
        where: {
            urlTitle: urlTitleOfPage
        }
    }).then(function(page) {
        if (page === null) {
            return next(new Error('that page does not exist'))
        }
        res.render('wikipage', {
            page: page
        })
    }).catch(next)
})
router.get('/users', function() {
    Users.findAll() 
    .then(function(authors) {
        res.render('authors', {authors: authors})
    }).catch(next)
})


module.exports = router;





