function HelperFunctions() {

	//Jquery click events. Notice that there is no this. at the
	//start we don't need to do that here because the event will
	//be added to the button and doesn't 'belong' to the object

	//event handler for the clear button event. Clears the screen
	select("#clearButton").mouseClicked(function () {
		// Update the values of the Create New side pop up
		select("#createHeight").elt.value = height
		select("#createWidth").elt.value = width

		// Update preview
		adjustPreview()

		// Open the Create New side pop up
		select("#sideOptionsContainer").elt.classList.remove("sideOptionsContainerHidden")
	})

	select("#cancelButton").mouseClicked(function () {
		// Close the Create New side pop up
		select("#sideOptionsContainer").elt.classList.add("sideOptionsContainerHidden")
	})

	//event handler for the save image button. saves the canvsa to the
	//local file system.
	select("#saveImageButton").mouseClicked(function () {
		saveCanvas("myPicture", "jpg");
	})

	// Create New buttons event handler
	select("#createButton").mouseClicked(function () {
		// Create a new canvas and override current canvas
		let c = createCanvas(select("#createWidth").elt.value, select("#createHeight").elt.value); //subtract 4 for the border
		c.parent("content");

		background(select("#backgroundColour").elt.value)

		loadPixels()

		// Close the Create New side pop up
		select("#sideOptionsContainer").elt.classList.add("sideOptionsContainerHidden")
	})

	// Edit the Preview on Width/Height/Colour Change
	select("#createWidth").input(adjustPreview)
	select("#createHeight").input(adjustPreview)
	select("#backgroundColour").input(adjustPreview)
}

function adjustPreview() {
	// Use parseInt() to convert string to integer
	// String comparison works differently than integer comparison
	if (parseInt(select("#createWidth").elt.value) >= parseInt(select("#createHeight").elt.value)) {
		// set Width to 100%, Height to auto
		select("#sideOptionsPreview").elt.style.width = "100%"
		select("#sideOptionsPreview").elt.style.height = "auto"
	}
	else {
		// set Width to auto, Height to 100%
		select("#sideOptionsPreview").elt.style.width = "auto"
		select("#sideOptionsPreview").elt.style.height = "100%"
	}

	// Set Aspect Ratio
	select("#sideOptionsPreview").elt.style.aspectRatio = select("#createWidth").elt.value + "/" + select("#createHeight").elt.value

	// Set Background Colour
	select("#sideOptionsPreview").elt.style.backgroundColor = select("#backgroundColour").elt.value
}

function drawImage(p5Image, x = 0, y = 0, width, height, corners, sides, designData, border = true) {
	console.log("Helper FUnction")
	
	// Check if there's a loaded image
	if (!p5Image) return

	width = width ? width : p5Image.width
	height = height ? height : p5Image.height

	console.log(width, height, corners, sides, designData, border)
	// Set fill and stroke
	// Set Stroke
	stroke(designData.strokeColor)
	strokeWeight(designData.strokeWeight)

	// Set fill
	fill(designData.fillColor)

	// Make the rectangle have dotted lines
	drawingContext.setLineDash(designData.lineDash)

	// Draw the border
	if (border) rect(x, y, width, height)

	// Draw the image to the canvas
	image(p5Image, x, y, width, height)

	// Draw buttons at the 4 corners to adjust the size
	// Reset Line Dash
	drawingContext.setLineDash([0, 0])

	// Add Fill and Stroke Colours
	fill(designData.buttonColor)
	stroke(designData.buttonColor)

	// Draw the buttons
	if (border) {
		corners.forEach(corner => {
			ellipse(corner.x, corner.y, designData.buttonSize, designData.buttonSize)
		})

		sides.forEach(side => {
			ellipse(side.x, side.y, designData.buttonSize, designData.buttonSize)
		})
	}
}