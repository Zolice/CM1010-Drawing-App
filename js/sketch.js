//global variables that will store the toolbox colour palette
//amnd the helper functions
var toolbox = null
var colourP = null
var helpers = null

window.onload = function () {
	//create a canvas to fill the content div from index.html
	canvasContainer = select('#content')
	var c = createCanvas(canvasContainer.size().width, canvasContainer.size().height - 4) //subtract 4 for the border
	c.parent("content")

	background(255)
}

function setup() {
	// Attempt to set Frame Rate to 60 FPS
	frameRate(60)

	//create helper functions and the colour palette
	helpers = new HelperFunctions()
	colourP = new ColourPalette()

	//create a toolbox for storing the tools
	toolbox = new Toolbox()

	//add the tools to the toolbox.
	toolbox.addTool(new FreehandTool())
	toolbox.addTool(new LineToTool())
	toolbox.addTool(new SprayCanTool())
	toolbox.addTool(new mirrorDrawTool())

	toolbox.addTool(new scissorTool())
	toolbox.addTool(new imageTool())
	toolbox.addTool(new stampTool())
}

function draw() {
	//call the draw function from the selected tool.
	// As each tool extends base class Tool, they all have a draw() function
	toolbox.selectedTool.draw()
}

function mouseDragged() {
	// Call the mouseDragged() function from the selected tool
	// As each tool extends base class Tool, they all have a mouseDragged() function
	toolbox.selectedTool.mouseDragged()
}