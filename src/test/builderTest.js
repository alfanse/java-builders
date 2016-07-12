var assert = require('chai').assert;
var builder = require('../app/builder.js');

describe('convertUsingConstructor', function() {

  it('should output package, imports and javadoc unchanged', function() {
    var input = "package one;\n"+"import two.three.Thing;"+"/** some java doc */";
    var output = builder.convertUsingConstructor(input);
    assert.equal(output, input);
  }),

  it('should rename class with name+Builder', function() {
    var input ="public class Alpha {\n" + "\n" +"}";
    var expected ="public class AlphaBuilder {\n" + "\n" +"}"
    assert.equal(builder.convertUsingConstructor(input), expected);
  });

  it('should rename class with name+Builder when extends other class', function() {
    var input ="public class Alpha extends Object\n" + "{\n" +"}";
    var expected ="public class AlphaBuilder extends Object\n" + "{\n" +"}"
    assert.equal(builder.convertUsingConstructor(input), expected);
  });


  it('should rename class with name+Builder when implements an interface', function() {
    var input ="public class Alpha implements Thing {\n" + "\n" +"}";
    var expected ="public class AlphaBuilder implements Thing {\n" + "\n" +"}"
    assert.equal(builder.convertUsingConstructor(input), expected);
  });
})
