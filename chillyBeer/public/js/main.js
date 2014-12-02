  'use strict';
var $ = require('jquery');
var randomColorHex = require('./random');
var square = require('./squared');

$.getJSON('https://freegeoip.net/json/', function(data) {
  var ip = data.ip;
  console.log(ip);
  $.post('/api/' + ip, function(wdata) {
    $('.message').html('<h3>' + wdata + '</h3>');
    console.log(wdata);
  });
});

$('div').css('background-color', randomColorHex());

$('#square').append(square(4) + 'is the square of 4');
