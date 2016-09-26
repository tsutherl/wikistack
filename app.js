var express = require('express');
var app = express();
var models = require('./models');
var wikiRouter = require('./routes/wiki');


models.db.sync({force: true})
.then(function () {
    app.listen(3001, function () {
        console.log('Server is listening on port 3001!');
    });
})
.catch(console.error);

app.use('/wiki/', wikiRouter);



// app.use('/', routes)


// ...

// or, in one line: app.use('/wiki', require('./routes/wiki'));




