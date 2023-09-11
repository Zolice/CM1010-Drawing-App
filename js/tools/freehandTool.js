class FreehandTool extends Tool {
	constructor() {
		super()

		this.name = "freehand"
		this.description = "Draw on the canvas with your mouse"
		this.icon = "assets/freehand.png"

		this.initialize()
	}

	initialize() {
	}

	draw() {
		//if the mouse is pressed
		if (mouseIsPressed && mouseInBounds()) {
			//check if they previousX and Y are -1. set them to the current
			//mouse X and Y if they are.
			if (this.previousMouseX == -1) {
				this.previousMouseX = mouseX
				this.previousMouseY = mouseY
			}
			//if we already have values for previousX and Y we can draw a line from 
			//there to the current mouse location
			else {
				// Set the Stroke properties
				colourP.setStroke()

				line(this.previousMouseX, this.previousMouseY, mouseX, mouseY)
				this.previousMouseX = mouseX
				this.previousMouseY = mouseY
			}
		}
		//if the user has released the mouse we want to set the this.previousMouse values 
		//back to -1.
		//try and comment out these lines and see what happens!
		else {
			this.previousMouseX = -1
			this.previousMouseY = -1
		}
	}

	unselectTool() {
		this.initialize()
	}

	populateOptions() {
		// Empty the footer's current options
		select("#footer").html("")

		// Add stroke options to footer
		colourP.loadColors(true, false)
	}
}