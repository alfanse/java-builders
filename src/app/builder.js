
function doSubmitSource() {
  var body = document.getElementById("source").value;
  document.getElementById("output").innerHTML = convertUsingConstructor(body);
  document.getElementById("output-div").style.display="block";
}

var phases = ["package", "imports", "class", "implements", "extends", "constructor", "methods"];
/** Converts the source
(expected to be a java bean with a constructor with params)
 to a builder class */
 function convertUsingConstructor(source) {
  var phase = {classname:false, extends:false, implements:false};
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
     if(!phase.classname && ~parsedRow.indexOf(' class ')){
         //find the classes name.
         var regGroup = classNameFinder.exec(parsedRow);
         classname = regGroup[1];

         //replace Classname with new builder name
         parsedRow = parsedRow.replace(" "+classname+" ", " "+classname+"Builder ");
         phase.classname=true;
     }

     //remove superclass
     if(phase.classname && ~parsedRow.indexOf('extends ')){
        parsedRow = parsedRow.replace(/(extends \w*\s?)/, "");
     }

     //remove interfaces
     if(phase.classname && ~parsedRow.indexOf('implements ')){
        parsedRow = parsedRow.replace(/(implements \w*,*\w*\s?)/, "");
     }

     //find the constructor
     if(phase.classname && new RegExp("[^class ]["+classname+"]?\s?\((.*)\)").test(parsedRow)){
        // console.log("constructor line"+parsedRow);
     }


     output+=parsedRow;
  }
  return output;
};

// If we're running under Node,
if(typeof exports !== 'undefined') {
    exports.convertUsingConstructor = convertUsingConstructor;
}
