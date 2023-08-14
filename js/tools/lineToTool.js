class LineToTool extends Tool {
	constructor() {
		super()

		this.name = "LineTo"
		this.description = "Draw a line to the canvas with your mouse"
		this.icon = "assets/lineTo.png"

		this.initialize()
	}

	initialize() {
		// Initialize Values
		this.startMouseX = -1
		this.startMouseY = -1
		this.drawing = false
	}

	draw() {
		//only draw when mouse is clicked
		if (mouseIsPressed && mouseInBounds()) {
			//if it's the start of drawing a new line
			if (this.startMouseX == -1) {
				this.startMouseX = mouseX;
				this.startMouseY = mouseY;
				this.drawing = true;
				//save the current pixel Array
				loadPixels();
			}

			else {
				//update the screen with the saved pixels to hide any previous
				//line between mouse pressed and released
				updatePixels();
				//draw the line
				colourP.setStroke()
				line(this.startMouseX, this.startMouseY, mouseX, mouseY);
			}

		}

		else if (this.drawing) {
			//save the pixels with the most recent line and reset the
			//drawing bool and start locations
			loadPixels();
			this.drawing = false;
			this.startMouseX = -1;
			this.startMouseY = -1;
		}
	}

	populateOptions() {
		// Empty the footer's current options
		select("#footer").html("")

		// Add stroke options to footer
		colourP.loadColors(true, false)
	}
}