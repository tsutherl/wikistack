var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack');
// var db = new Sequelize('postgres://localhost:5432/wikistack', {
//     logging: false
// });

var Page = db.define('page', { //the actual table is called pages soo can this first param technically be whatever?? page is the tablename (an s will be added to it) and Page is the class name(which is what we use to get data back ex from this class get me this)
    title: {
        type: Sequelize.STRING, //is there only a char limit if you give it a limit? also string is limited in length you think but double check
        allowNull: false
    },
    urlTitle: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT, //not limited at all in length?
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('open', 'closed') //status can either be set to open or closed
    },
    date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    } 
},  { 
    hooks: {
        beforeValidate: function(page) {
            if (page.title) { //if there is a title...
                // Removes all non-alphanumeric characters from title
                // And make whitespace underscore
                page.urlTitle = page.title.replace(/\s+/g, '_').replace(/\W/g, '');
            } else {
                // Generates random 5 letter string
                return Math.random().toString(36).substring(2, 7);
            }
          
        }
    },
    getterMethods: { //this is a virtual property - route is not actually visible in our table but can still
        route: function() {
            return '/wiki/' + this.urlTitle;
        }
    }
});

var User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false 
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true, 
        validate: {
            isEmail: true
        }
    }
});


module.exports = {db, Page, User} //I guess this is ES6 notation which is why the video shows it differently?
