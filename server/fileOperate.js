var express = require('express');
var fs = require('fs');
var router = express.Router();

router.post('/save', function(req, res) {
    var result = req.body;
    fs.writeFile('../data/data.csv', result.dataSource, function (err) {
        if (err) throw err;
        res.send(true);
    });
});

module.exports = router;