class ColourPalette {
	constructor() {
		this.strokeColor = "#000000"
		this.strokeSize = 2
		this.fillColor = "#000000"
	}

	loadColors(useStroke = true, useFill = true, callback = (event) => this.updateOptions(event), fillColor = this.fillColor, strokeColor = this.strokeColor, strokeSize = this.strokeSize) {
		// Add the fill/stroke options to the footer
		// Fill is not needed if fillColor is not indicated
		if (useFill) {
			// Create a text element to indicate Fill
			let fillText = document.createElement("h5")
			fillText.className = "toolOptionsType toolOptionsText"
			fillText.innerHTML = "Fill"

			// Append text element to footer
			select("#footer").elt.appendChild(fillText)

			// Create a Div to hold the Fill options
			let fillDiv = document.createElement("div")
			fillDiv.className = "toolOptionsWrapper"

			// Create a text element to indicate Color of Fill 
			let fillColourText = document.createElement("h5")
			fillColourText.className = "toolOptionsSetting toolOptionsText"
			fillColourText.innerHTML = "Colour"

			// Add the text element to the Fill divider
			fillDiv.appendChild(fillColourText)

			// Create a color input element to hold the Fill Color
			let fillColorInput = document.createElement("input")
			fillColorInput.className = "colorSelector"
			fillColorInput.type = "color"
			fillColorInput.id = "fillColor"
			fillColorInput.value = fillColor

			// Call the callback function when the input is changed
			fillColorInput.oninput = callback

			// Add the color input element to the Fill divider
			fillDiv.appendChild(fillColorInput)

			// Add the Fill divider to the footer
			select("#footer").elt.appendChild(fillDiv)
		}
		if (useStroke) {
			// Create a text element to indicate stroke
			let strokeText = document.createElement("h5")
			strokeText.className = "toolOptionsType toolOptionsText"
			strokeText.innerHTML = "Stroke"

			// Append text element to footer
			select("#footer").elt.appendChild(strokeText)

			// Create a Div to hold the stroke options
			let strokeDiv = document.createElement("div")
			strokeDiv.className = "toolOptionsWrapper"

			// Create a text element to indicate Color of stroke 
			let strokeColourText = document.createElement("h5")
			strokeColourText.className = "toolOptionsSetting toolOptionsText"
			strokeColourText.innerHTML = "Colour"

			// Add the text element to the stroke divider
			strokeDiv.appendChild(strokeColourText)

			// Create a color input element to hold the stroke Color
			let strokeColorInput = document.createElement("input")
			strokeColorInput.className = "colorSelector"
			strokeColorInput.type = "color"
			strokeColorInput.id = "strokeColor"
			strokeColorInput.value = strokeColor

			// Call the callback function when the input is changed
			strokeColorInput.oninput = callback

			// Add the color input element to the stroke divider
			strokeDiv.appendChild(strokeColorInput)

			// Create a text element to indicate Size of stroke
			let strokeSizeText = document.createElement("h5")
			strokeSizeText.className = "toolOptionsSetting toolOptionsText"
			strokeSizeText.innerHTML = "Size"

			// Add the text element to the stroke divider
			strokeDiv.appendChild(strokeSizeText)

			// Create a number input element to hold the stroke Size
			let strokeSizeInput = document.createElement("input")
			strokeSizeInput.className = "textSelector"
			strokeSizeInput.type = "number"
			strokeSizeInput.id = "strokeSize"
			strokeSizeInput.value = strokeSize
			strokeSizeInput.step = 0.1

			// Call the callback function when the input is changed
			strokeSizeInput.oninput = callback

			// Add the number input element to the stroke divider
			strokeDiv.appendChild(strokeSizeInput)

			// Add the stroke divider to the footer
			select("#footer").elt.appendChild(strokeDiv)
		}
	}

	updateOptions(event) {
		if (select("#strokeColor")) this.strokeColor = select("#strokeColor").elt.value
		if (select("#strokeSize")) this.strokeSize = select("#strokeSize").elt.valueAsNumber
		if (select("#fillColor")) this.fillColor = select("#fillColor").elt.value
	}

	setStrokeAndFill(strokeColor = this.strokeColor, strokeSize = this.strokeSize, fillColor = this.fillColor) {
		this.setStroke(strokeColor, strokeSize)
		this.setFill(fillColor)
	}

	setStroke(strokeColor = this.strokeColor, strokeSize = this.strokeSize) {
		stroke(strokeColor)
		strokeWeight(strokeSize)
	}

	setFill(fillColor = this.fillColor) {
		fill(fillColor)
	}
}