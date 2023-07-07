//Displays and handles the colour palette.
function ColourPaletteOld() {
	//a list of web colour strings
	this.colours = ["black", "silver", "gray", "white", "maroon", "red", "purple",
		"orange", "pink", "fuchsia", "green", "lime", "olive", "yellow", "navy",
		"blue", "teal", "aqua"
	];
	//make the start colour be black
	this.selectedColour = "black";

	var self = this;

	var colourClick = function () {
		//remove the old border
		var current = select("#" + self.selectedColour + "Swatch");
		current.style("border", "0");

		//get the new colour from the id of the clicked element
		var c = this.id().split("Swatch")[0];

		//set the selected colour and fill and stroke
		self.selectedColour = c;
		fill(c);
		stroke(c);

		//add a new border to the selected colour
		this.style("border", "2px solid blue");
	}

	//load in the colours
	this.loadColours = function () {
		//set the fill and stroke properties to be black at the start of the programme
		//running
		fill(this.colours[0]);
		stroke(this.colours[0]);

		//for each colour create a new div in the html for the colourSwatches
		for (var i = 0; i < this.colours.length; i++) {
			var colourID = this.colours[i] + "Swatch";

			//using JQuery add the swatch to the palette and set its background colour
			//to be the colour value.
			var colourSwatch = createDiv()
			colourSwatch.class('colourSwatches');
			colourSwatch.id(colourID);

			select(".colourPalette").child(colourSwatch);
			select("#" + colourID).style("background-color", this.colours[i]);
			colourSwatch.mouseClicked(colourClick)
		}

		select(".colourSwatches").style("border", "2px solid blue");
	};
	//call the loadColours function now it is declared
	this.loadColours();
}

class ColourPalette {
	constructor() {

		this.fill = {
			"color": null,
			"size": null
		}

		this.stroke = {
			"color": null,
			"size": null
		}
	}

	loadColors(callback, strokeColor = "#000000", strokeWidth = 5, fillColor = null) {
		// Empty the footer's current options
		select("#footer").html("")

		// Add the fill/stroke options to the footer
		// Fill is not needed if fillColor is not indicated
		if (fillColor) {
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
		strokeSizeInput.value = strokeWidth
		strokeSizeInput.min = 0.1
		strokeSizeInput.max = 99.9
		strokeSizeInput.step = 0.1

		// Call the callback function when the input is changed
		strokeSizeInput.oninput = callback

		// Add the number input element to the stroke divider
		strokeDiv.appendChild(strokeSizeInput)

		// Add the stroke divider to the footer
		select("#footer").elt.appendChild(strokeDiv)
	}
}