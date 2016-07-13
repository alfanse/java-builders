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

  it('should rename class with name+Builder and remove interface, when implements an interface', function() {
    var input ="public class Alpha implements Thing {\n" + "\n" +"}";
    var expected ="public class AlphaBuilder {\n" + "\n" +"}"
    assert.equal(builder.convertUsingConstructor(input), expected);
  });

  it('should rename class with name+Builder and remove extends, when extends an superclass', function() {
    var input ="public class Alpha extends Thing {\n" + "\n" +"}";
    var expected ="public class AlphaBuilder {\n" + "\n" +"}"
    assert.equal(builder.convertUsingConstructor(input), expected);
  });

  xit('should find constructor and use its params to generate with methods and build method', function(){
    var input ="public class Alpha extends Object implements Thing {\n"
      + "    private String field1;\n"
      + "    private final int field2;\n"
      + "    public final AnotherClass field3;\n"
      + "    public static final String FIELD4 = \"VALUE1\";\n"
      + "    public static String FIELD5 = \"VALUE2\";\n"
      + "    public Alpha(String field1, int field2, AnotherClass field3){\n"
      + "       this.field1=field1;\n"
      + "       this.field2=field2;\n"
      + "       this.field3=field3;\n"
      + "    }\n"
      + "    public String getField1(){\n"
      + "        return field1;\n"
      + "    }\n"
      + "    public int getField2(){return field2;}\n"
      + "    public AnotherClass getField3(){return field3;}\n"
      +"}";
    var expected =
      "public class AlphaBuilder {\n"
    + "    private String field1;\n"
    + "    private int field2;\n"
    + "    private AnotherClass field3;\n"
    + "    public AlphaBuilder withField1(String field1){\n"
    + "        this.field1=field1;\n"
    + "        return this;\n"
    + "    }\n"
    + "    public AlphaBuilder withField2(int field2){\n"
    + "        this.field2=field2;\n"
    + "        return this;\n"
    + "    }\n"
    + "    public AlphaBuilder withField3(AnotherClass field3){\n"
    + "        this.field3=field3;\n"
    + "        return this;\n"
    + "    }\n"
    + "    public Alpha build(){\n"
    + "        return new Alpha(field1, field2, field3);\n"
    + "    }\n"
    + "}"
    var actual = builder.convertUsingConstructor(input);
    console.log(actual);
    assert.equal(actual, expected);
  });
})
