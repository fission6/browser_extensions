var x;
var y;
var imageData;
var color;
var hex;

var box = document.createElement('div');
document.body.insertBefore(box, document.body.firstChild);
void(box.style.cssText='')
box.setAttribute('id', "bcolorbox19234735");

function HandleClick(event){
  if (imageData == null) {
  		box.style.display = "none";
  		}
    if (imageData != null) {
        //event = return false;
		//alert(""+hex+" or "+color)
		prompt("Hex", hex);
		imageData = null;
		//box.style.display = "none";
		box.innerHTML = "<div id='bcolorbox19234735text'>Hex: "+hex+" RGB: "+color+"</div>";
    }
}
function HandleMouseMove(event){
    if (imageData != null) {
    	box.innerHTML = "";
		x = event.pageX;
		y = event.pageY;
		var index = (y*imageData.width + x) * 4;
		var r = imageData.data[index];
		var g = imageData.data[index + 1];
		var b = imageData.data[index + 2];
		//var alpha = imageData.data[index + 3];
		color = "'rgb("+r+", "+g+", "+b+")'";
		hex = colorToHex(color);
		box.style.backgroundColor = hex;
	}
}
function colorToHex(c) {
var m = /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/.exec(c);
return m ? '#' + (1 << 24 | m[1] << 16 | m[2] << 8 | m[3]).toString(16).substr(1) : c;
}
function handleMessage(event){
	if (event.name === "imageData") {
		imageData = event.message;
		document.addEventListener("click", HandleClick, false);
		document.addEventListener("mousemove", HandleMouseMove, false);
		}
	if (event.name === "showBox")
		box.style.display = "inline";
}

safari.self.addEventListener("message", handleMessage, false);