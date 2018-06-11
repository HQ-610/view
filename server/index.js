var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var emotion = require('./emotion');
var fileOperate = require('./fileOperate');

app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With, yourHeaderFeild');
    next();
});

app.use(express.json({limit: '1024mb'}));
app.use(bodyParser.json());
app.use('/', emotion);
app.use('/file', fileOperate);

app.listen(8800, function() {
    console.log('success connect');
});