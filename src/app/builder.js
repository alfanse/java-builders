
function doSubmitSource() {
  var body = document.getElementById("source").value;
  document.getElementById("output").innerHTML = "output:"+body;
  document.getElementById("output-div").style.display="block";
}
