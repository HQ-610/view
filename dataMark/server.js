var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');

var app = express();


app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    if (req.method === 'OPTIONS') {
        res.send(200); // options请求快速返回
    } else {
        next();
    }
});

app.use(bodyParser.json());
app.get('/select', function (req, res) {
    fs.readFile('save.csv', 'utf-8', function (err, data) {
        if (err) {
            res.send('文件不存在');
        } else {
            res.send(data);
        }
    });
});

app.post('/save', function (req, res) {
    var result = req.body;
    fs.writeFile('save.csv', result.dataSource + '\r', {
        'flag': 'a'
    }, function (err) {
        if (err) throw err;
        res.send('success save');
    });
});

app.post('/clear', function (req, res) {
    fs.unlink('save.csv', function (err) {
        if (err) {
            console.log(err);
            return false;
        }
        res.send("success delete");
    });
});

app.listen(8800, function () {
    console.log('success connect');
});