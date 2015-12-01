var fs = require('fs');

exports.index = function(req, res){
  res.render('index');
};

exports.skrillex = function(req, res){
  res.render('skrillex');
};

exports.taylor_swift = function(req, res){
  res.render('taylor_swift');
};

exports.lang = function(req, res){
  var path = req.url;
  var data = require("../public/data/" + path.split("?")[1] + ".json");
  res.send(JSON.stringify(data));
};

exports.lyric = function(req, res){
  var path = req.url;
  // var data = require("../public/data/lyric/" + path.split("?")[1] + ".json");
  // res.send(JSON.stringify(data));
  fs.readFile("./public/data/lyric/" + path.split('?')[1] + ".json", 'utf8', function (err, data) {
    res.send(data);
  });
};