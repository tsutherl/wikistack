const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const db = require('./models');
const nunjucks = require('nunjucks');
const wikiRouter = require('./routes/wiki')


app.use(morgan('dev')); //it logs middleware... check this out

app.use(express.static(__dirname + 'public'));

app.use(bodyParser.urlencoded({extended: false})); 
app.use(bodyParser.json());

app.engine('html', nunjucks.render);
nunjucks.configure('views', {noCache: true});
app.set('view engine', 'html');

app.use('/wiki', wikiRouter);

app.get('/', function(req, res, next) {
    res.render('index')

})

app.use(function(err, req, res, next) {
    console.error(err)
    res.status(500).json(err.message);
})


db.db.sync()
.then(function() {
    app.listen(3001, function() {
        console.log('listening on port 3001');
    });
});

