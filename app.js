//npm init -y - creates package.json for us

//npm install express morgan body-parser nunjucks --save (--save updates the .json file for us with whatever we've listed)

//npm install --save-dev nodemon (updates .json but lists as dev purposes)

//in .json file you can assign "nodemon index.js" to "start" and this will be the way we start our server

var express = require('express');
var nunjucks = require('nunjucks')
var morgan = require('morgan');
var bodyParser = require('body-parser');
var db = require('./models') //database folder
var wikiRouter = require('./routes/wiki'); //middle-ware folder (needs full path because it's not a module)

var app = express();

app.use(morgan('dev')); //logging middle-ware

//the view engine - basically so we don't have to keep specifying that files are html files 
app.engine('html', nunjucks.render);
//telling it to not reuse a previous read so that it will update any changes
nunjucks.configure('views', {noCache: true});
//the line that gets res.render to do its work - when res.render is called it will know to use the nunjucks function to create views
app.set('view engine', 'html')

//if request is of type post of put then it might have a body and this line will deal with parsing those bodies (if you use urlencoded you need to add extended: false)
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//makes anything in the public folder able to be accessed via the url
app.use(express.static(__dirname + 'public'));

app.use('/wiki', wikiRouter); //must go here so all the functions before it run first

app.get('/', function(req, res) {
    res.render('index');
}); 

// app.use(function(err, req, res, next) { //error handler should always go at the end of the pipe. right? 
    
// })

db.db.sync()// sooo first it needs the file and then it needs what's being exported???
.then(function() {
    app.listen(3001, function(){
        console.log('listening on port 3001');
    });
})






