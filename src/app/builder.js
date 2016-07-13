
function doSubmitSource() {
  var body = document.getElementById("source").value;
  document.getElementById("output").innerHTML = "output:"+body;
  document.getElementById("output-div").style.display="block";
}

/** Converts the source
(expected to be a java bean with a constructor with params)
 to a builder class */
exports.convertUsingConstructor = function(source) {
  var sourceArray = source.split('\n');
  var output = "";
  var classNameFinder = / class\s*(\w*)\s*[{|extends|implements|\n]/;
  var classname;

  for(var rowIndex = 0; rowIndex < sourceArray.length; ++rowIndex){
      //reintroduce the line break
      if(rowIndex>0) {
        output+="\n";
      }
      var parsedRow = sourceArray[rowIndex];

      //find class declaration
      if(~parsedRow.indexOf(' class ')){
         //find the classes name.
         var regGroup = classNameFinder.exec(parsedRow);
         classname = regGroup[1];

         //replace Classname with new builder name
         parsedRow = parsedRow.replace(" "+classname+" ", " "+classname+"Builder ");
     }

     //remove superclasses
     if(~parsedRow.indexOf('extends ')){
        parsedRow = parsedRow.replace(/(extends \w*\s)/, "");
     }

     //remove interfaces
     if(~parsedRow.indexOf('implements ')){
        parsedRow = parsedRow.replace(/(implements \w*,*\w*\s)/, "");
     }

     //find the constructor
     if(new RegExp("[^class ]["+classname+"]?").test(parsedRow)){
      //  console.log("constructor line"+parsedRow);
     }


     output+=parsedRow;
  }
  return output;
};
