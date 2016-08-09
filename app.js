var express = require('express');
var app = express();
var conf = require('./conf'); 

var apiController = require('./controllers/apiController');
var htmlController = require('./controllers/htmlController');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var port = conf.port;
app.use('/assets', express.static(__dirname + '/public/assets'));
app.use('/', express.static(__dirname + '/public/bower_components'));



app.set('view engine', 'ejs');

app.use('/', function (req, res, next) {
	console.log('Request Url:' + req.url);
	next();
});

htmlController(app);

apiController(app);     

app.listen(port);  