function FreehandTool() {
	//set an icon and a name for the object
	this.icon = "assets/freehand.png";
	this.name = "freehand";

	//to smoothly draw we'll draw a line from the previous mouse location
	//to the current mouse location. The following values store
	//the locations from the last frame. They are -1 to start with because
	//we haven't started drawing yet.
	var previousMouseX = -1;
	var previousMouseY = -1;

	this.strokeColor = "#000000"
	this.strokeSize = 5

	this.draw = function () {
		//if the mouse is pressed
		if (mouseIsPressed && mouseInBounds()) {
			//check if they previousX and Y are -1. set them to the current
			//mouse X and Y if they are.
			if (previousMouseX == -1) {
				previousMouseX = mouseX;
				previousMouseY = mouseY;
			}
			//if we already have values for previousX and Y we can draw a line from 
			//there to the current mouse location
			else {
				// Set the Stroke properties
				stroke(this.strokeColor)
				strokeWeight(this.strokeSize)

				line(previousMouseX, previousMouseY, mouseX, mouseY);
				previousMouseX = mouseX;
				previousMouseY = mouseY;
			}
		}
		//if the user has released the mouse we want to set the previousMouse values 
		//back to -1.
		//try and comment out these lines and see what happens!
		else {
			previousMouseX = -1;
			previousMouseY = -1;
		}
	};

	this.populateOptions = function () {
		// console.log("Loading")
		colourP.loadColors((value) => { this.updateOptions(value) }, this.strokeColor, this.strokeSize)
	}

	this.updateOptions = function (event) {
		console.log(event)
		// Update the values
		this.strokeColor = select("#strokeColor").elt.value
		this.strokeSize = select("#strokeSize").elt.value
	}
}