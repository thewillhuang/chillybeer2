'use strict';
// BASE SETUP
// ==============================================
var express = require('express');
var app     = express();
var port    = process.env.PORT || 3000;
var path    = __dirname + '/build/';
var request = require('superagent');
var wUApi = process.env.WUAPI;
var wUground = 'http://api.wunderground.com/api/' + wUApi + '/conditions/q/autoip.json?geo_ip=';
// ROUTES
// ==============================================
// get an instance of router
var router = express.Router();

// apply the routes to our application
app.use('/', router);
app.use(express.static(path));

// route middleware that will happen on every request
router.use(function(req, res, next) {
  console.log(req.method, req.url);
  next();
});

//load the static webpage http file.
router.get('/', function(req, res) {
  res.sendFile(path + 'index.html');
});

//post route.
router.post('/api/:ip', function(req, res) {
  //sends a request to weather underground with specified ip address and get temp back
  request
  .get(wUground + req.params.ip)
  .end(function(req, wData) {
    var parsedData = JSON.parse(wData.text);
    var temp = parsedData.current_observation.temp_f;
    var loc = parsedData.current_observation.display_location.full;
    var message = '';
    if (temp < 45) {
      message = 'It is ' + temp + ' degrees F in ' + loc;
    } else {
      message = 'It is ' + temp + ' degrees F in ' + loc + '. DON\'T';
    }
          //sends the correct message.
    res.send(message);
  });
});

// START THE SERVER
// ==============================================
app.listen(port);
console.log('server started on ' + port);
