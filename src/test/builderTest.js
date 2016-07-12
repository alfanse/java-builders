var assert = require('chai').assert;
var convertBeanToBuilder = require('../app/builder.js').convertBeanToBuilder;

describe('convertBeanToBuilder', function() {
  it('should return whats given', function() {
    assert.equal(convertBeanToBuilder('given stuff'), "given stuff");
  });
});
