'use strict';

var chai = require('chai');
var chaihttp = require('chai-http');
var expect = chai.expect;
var server = 'http://localhost:' + (process.env.PORT || 3000);
var request = require('superagent');
require('../server');
chai.use(chaihttp);

describe('should send out an api request to get current ip address', function() {
  var ip;
  it('should return location data', function(done) {
    //due to the slow response of freegeoip, i have to modify the timeout so the test will pass.
    this.timeout(10000);
    request
    .get('https://freegeoip.net/json/')
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body).to.have.property('ip');
      ip = res.body.ip;
      expect(res.body).to.have.property('country_code');
      expect(res.body).to.have.property('country_name');
      expect(res.body).to.have.property('region_code');
      expect(res.body).to.have.property('region_name');
      expect(res.body).to.have.property('city');
      expect(res.body).to.have.property('zip_code');
      expect(res.body).to.have.property('time_zone');
      expect(res.body).to.have.property('latitude');
      expect(res.body).to.have.property('longitude');
      expect(res.body).to.have.property('metro_code');
      done();
    });
  });

  it('should be able to get ip address and return a valid message', function(done) {
    this.timeout(10000);
    chai.request(server)
    .post('/api/' + ip)
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.text).to.be.a('String');
      done();
    });
  });
});
