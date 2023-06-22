//global variables that will store the toolbox colour palette
//amnd the helper functions
var toolbox = null;
var colourP = null;
var helpers = null;

window.onload = function() {
	//create a canvas to fill the content div from index.html
	canvasContainer = select('#content');
	var c = createCanvas(canvasContainer.size().width, canvasContainer.size().height - 4); //subtract 4 for the border
	c.parent("content");

	background(255);
}

function setup() {

	//create helper functions and the colour palette
	helpers = new HelperFunctions();
	colourP = new ColourPalette();

	//create a toolbox for storing the tools
	toolbox = new Toolbox();

	//add the tools to the toolbox.
	toolbox.addTool(new FreehandTool())
	toolbox.addTool(new LineToTool())
	toolbox.addTool(new SprayCanTool())
	toolbox.addTool(new mirrorDrawTool())
	toolbox.addTool(new selectTool())
}

function draw() {
	//call the draw function from the selected tool.
	//hasOwnProperty is a javascript function that tests
	//if an object contains a particular method or property
	//if there isn't a draw method the app will alert the user
	if (toolbox.selectedTool.hasOwnProperty("draw")) {
		toolbox.selectedTool.draw();
	} else {
		alert("it doesn't look like your tool has a draw method!");
	}
}

// Open sidebar containing 
function ConfigureCanvas() {
	
}

// Check if mouse is within canvas
function mouseInBounds() {
	// If mouse is within canvas, return true
	return (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height)
}