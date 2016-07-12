var assert = require('chai').assert;
var sayhello = require('../app/builder.js').sayhello;

describe('hello', function() {
  it('should say hello', function() {
    assert.equal(sayhello(), "hello");
  });
});
