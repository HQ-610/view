var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var router = express.Router();
var url = 'mongodb://localhost:27017/';

router.get('/select', function(req, res) { // 查询数据
    MongoClient.connect(url, function(err, db) {
        if(err) throw err;
        var dbo = db.db('analysis');
        dbo.collection('emotion').find().toArray(function(err, resp) {
            if(err) throw err;
            res.send(resp);
            db.close();
        });
    });
});

router.post('/modify', function(req, res) { // 修改标注
    var result = req.body;
    MongoClient.connect(url, function(err, db) {
        if(err) throw err;
        var dbo = db.db('analysis');
        var where = {'label.name': result.name},
            update = {$set: {['data.' + result.index + '.case']: result.value}};
        dbo.collection('emotion').updateOne(where, update, function(err, resp) {
            if(err) throw err;
            res.send(true);
            db.close();
        });
    });
});

router.post('/delete', function(req, res) { // 删除数据
    var result = req.body;
    MongoClient.connect(url, function(err, db) {
        if(err) throw err;
        var dbo = db.db('analysis');
        var where = {'label.name': result.name},
            update1 = {$set: {['data.' + result.index]: null}},
            update2 = {$pull: {data: null}}
        dbo.collection('emotion').updateOne(where, update1, function(err, resp) { // 先将要删除的元素设置为null
            if (err) throw err;
            db.close();
        });
        dbo.collection('emotion').updateOne(where, update2, function(err, resp) { // 然后将数组中的null删除
            if (err) throw err;
            res.send(true);
            db.close();
        });
    });
});

router.post('/add', function(req, res) { // 添加数据
    var result = req.body;
    MongoClient.connect(url, function(err, db) {
        if(err) throw err;
        var dbo = db.db('analysis');
        dbo.collection('emotion').insertOne(result.params, function(err, resp) {
            if(err) throw err;
            res.send(true);
            db.close();
        });
    });
});

module.exports = router;