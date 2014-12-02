'use strict';
var expect = require('chai').expect;
var someFunc = require('../../public/js/some_func');

describe('some test', function() {
  it('should be true', function() {
    expect(true).to.eql(true);
  });

  it('should also be true', function() {
    expect(someFunc()).to.eql(true);
  });
});
