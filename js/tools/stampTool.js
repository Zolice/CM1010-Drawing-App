class stampTool extends Tool {
    constructor() {
        super()

        this.name = "Stamp"
        this.description = "Stamps an image onto the Canvas"
        this.icon = "assets/stampTool.png"

        // Load assets
        this.cloudImage = loadImage("assets/cloud.png")

        this.initialize()
    }

    initialize() {
        // Initialize Values
        this.starInnerRadius = 30
        this.starOuterRadius = 70

        this.cloudWidth = 100
        this.cloudHeight = 100

        this.image = null

        // Create a selector for the stamp
        this.stampSelector = this.createStampSelector()

        // Create default settings options for star, cloud and custom stamp
        this.starStampOptions = this.createStarStampOptions()
        this.cloudStampOptions = this.createCloudStampOptions()
        this.customStampOptions = this.createCustomStampOptions()

        // This is to provide compatibility for classes to work with sketch.js and toolbox.js
        this.draw = () => { this.drawing() }
        this.unselectTool = () => { this.reset() }
        this.populateOptions = () => { this.populateOption() }
    }

    createStampSelector() {
        // Create a divider for populateOptions()
        let selector = document.createElement('select')
        selector.id = 'selectStamp'
        selector.className = 'toolOptionsWrapper toolOptionsText toolOptionsButton'

        // Create a star option
        let option = document.createElement('option')
        option.value = "star"
        option.innerText = "Star"
        option.className = "toolOptionsSelectOption"

        // Add option to selector
        selector.appendChild(option)

        // Create a cloud option
        option = document.createElement('option')
        option.value = "cloud"
        option.innerText = "Cloud"
        option.className = "toolOptionsSelectOption"

        // Add option to selector
        selector.appendChild(option)

        // Create a custom option
        option = document.createElement('option')
        option.value = "custom"
        option.innerText = "Image"
        option.className = "toolOptionsSelectOption"

        // Add option to selector
        selector.appendChild(option)

        // Change options when selector is changed
        selector.onchange = () => {
            this.populateOption()
        }

        return selector
    }

    createStarStampOptions() {
        // Add Inner and Outer Radius Settings for Star Stamp
        // Create an array for Star Stamp to store the elements
        let starStampOptions = []

        // Create a text element to indicate Inner Radius
        let innerRadiusText = document.createElement('h5')
        innerRadiusText.className = 'toolOptionsType toolOptionsText'
        innerRadiusText.innerHTML = 'Inner Radius'
        innerRadiusText.id = 'innerRadiusText'

        // Add the text element to the Star Stamp array
        starStampOptions.push(innerRadiusText)

        // Create a Div to hold the Inner Radius options
        let innerRadiusDiv = document.createElement('div')
        innerRadiusDiv.className = 'toolOptionsWrapper'

        // Create a number input element to hold the Inner Radius Size
        let innerRadiusInput = document.createElement('input')
        innerRadiusInput.className = 'textSelector'
        innerRadiusInput.type = 'number'
        innerRadiusInput.id = 'innerRadius'
        innerRadiusInput.value = this.starInnerRadius
        innerRadiusInput.step = 0.1

        // Call the callback function when the input is changed
        innerRadiusInput.oninput = () => {
            // Update the value
            this.starInnerRadius = innerRadiusInput.valueAsNumber
        }

        // Add the number input element to the Inner Radius divider
        innerRadiusDiv.appendChild(innerRadiusInput)

        // Add the Inner Radius divider to the Star Stamp array
        starStampOptions.push(innerRadiusDiv)

        // Create a text element to indicate Outer Radius
        let outerRadiusText = document.createElement('h5')
        outerRadiusText.className = 'toolOptionsType toolOptionsText'
        outerRadiusText.innerHTML = 'Outer Radius'
        outerRadiusText.id = 'outerRadiusText'

        // Add the text element to the Star Stamp array
        starStampOptions.push(outerRadiusText)

        // Create a Div to hold the Outer Radius options
        let outerRadiusDiv = document.createElement('div')
        outerRadiusDiv.className = 'toolOptionsWrapper'

        // Create a number input element to hold the Outer Radius Size
        let outerRadiusInput = document.createElement('input')
        outerRadiusInput.className = 'textSelector'
        outerRadiusInput.type = 'number'
        outerRadiusInput.id = 'outerRadius'
        outerRadiusInput.value = this.starOuterRadius
        outerRadiusInput.step = 0.1

        // Call the callback function when the input is changed
        outerRadiusInput.oninput = () => {
            // Update the value
            this.starOuterRadius = outerRadiusInput.valueAsNumber
        }

        // Add the number input element to the Outer Radius divider
        outerRadiusDiv.appendChild(outerRadiusInput)

        // Add the Outer Radius divider to the Star Stamp array
        starStampOptions.push(outerRadiusDiv)

        return starStampOptions
    }

    createCloudStampOptions() {
        // Add Size Settings for Cloud Stamp
        // Create an array for Cloud Stamp to store the elements
        let cloudStampOptions = []

        // Create a text element to indicate Size
        let sizeText = document.createElement('h5')
        sizeText.className = 'toolOptionsType toolOptionsText'
        sizeText.innerHTML = 'Size'
        sizeText.id = 'sizeText'

        // Add the text element to the Cloud Stamp array
        cloudStampOptions.push(sizeText)

        // Create a Div to hold the Size options
        let sizeDiv = document.createElement('div')
        sizeDiv.className = 'toolOptionsWrapper'

        // Create a text element to indicate Width
        let widthText = document.createElement('h5')
        widthText.className = 'toolOptionsSetting toolOptionsText'
        widthText.innerHTML = 'Width'

        // Add the text element to the Size divider
        sizeDiv.appendChild(widthText)

        // Create a number input element to hold the Width
        let widthInput = document.createElement('input')
        widthInput.className = 'textSelector'
        widthInput.type = 'number'
        widthInput.id = 'widthInput'
        widthInput.value = this.cloudWidth
        widthInput.step = 0.1

        // Call the callback function when the input is changed
        widthInput.oninput = () => {
            // Update the value
            this.cloudWidth = widthInput.valueAsNumber
        }

        // Add the number input element to the Size divider
        sizeDiv.appendChild(widthInput)

        // Create a text element to indicate Height
        let heightText = document.createElement('h5')
        heightText.className = 'toolOptionsSetting toolOptionsText'
        heightText.innerHTML = 'Height'
        heightText.id = 'heightText'

        // Add the text element to the Size divider
        sizeDiv.appendChild(heightText)

        // Create a number input element to hold the Height
        let heightInput = document.createElement('input')
        heightInput.className = 'textSelector'
        heightInput.type = 'number'
        heightInput.id = 'heightInput'
        heightInput.value = this.cloudHeight
        heightInput.step = 0.1

        // Call the callback function when the input is changed
        heightInput.oninput = () => {
            // Update the value
            this.cloudHeight = heightInput.valueAsNumber
        }

        // Add the number input element to the Size divider
        sizeDiv.appendChild(heightInput)

        // Add the Size divider to the Cloud Stamp array
        cloudStampOptions.push(sizeDiv)

        return cloudStampOptions
    }

    createCustomStampOptions() {
        // Unload currently loaded image
        this.image = null

        // Create an array for Custom Stamp to store the elements
        let customStampOptions = []

        // Create a divider
        let button = document.createElement('div')
        button.id = 'loadImageButton'
        button.className = 'toolOptionsWrapper toolOptionsButton'

        // Create a p5.js File Input
        let input = createFileInput((file) => { this.selectImageCallback(file) })
        input.elt.className += `toolOptionsText`

        // Append File Input to button
        button.appendChild(input.elt)

        // Append button to array
        customStampOptions.push(button)

        // Create a divider
        button = document.createElement('div')
        button.id = 'imageSizeButton'
        button.className = 'toolOptionsWrapper toolOptionsButton'

        // Create a text element
        let text = document.createElement('h5')
        text.className = 'toolOptionsSetting toolOptionsText'
        text.id = 'imageWidth'
        text.innerHTML = 'Width'

        // Create an input element
        this.inputWidth = document.createElement('input')
        this.inputWidth.className = 'textSelector'
        this.inputWidth.id = 'imageWidthInput'
        this.inputWidth.type = 'number'

        // Append text and input to button
        button.appendChild(text)
        button.appendChild(this.inputWidth)

        // Append button to array
        customStampOptions.push(button)

        // Create a divider
        button = document.createElement('div')
        button.id = 'imageSizeButton'
        button.className = 'toolOptionsWrapper toolOptionsButton'

        // Create a text element
        text = document.createElement('h5')
        text.className = 'toolOptionsSetting toolOptionsText'
        text.id = 'imageHeight'
        text.innerHTML = 'Height'

        // Create an input element
        this.inputHeight = document.createElement('input')
        this.inputHeight.className = 'textSelector'
        this.inputHeight.id = 'imageHeightInput'
        this.inputHeight.type = 'number'

        // Append text and input to button
        button.appendChild(text)
        button.appendChild(this.inputHeight)

        // Append button to array
        customStampOptions.push(button)

        return customStampOptions
    }

    selectImageCallback(file) {
        console.log(file.file.name + " loaded")
        // Check if an image is selected
        if (file.type === 'image') {
            // Save the image
            this.image = loadImage(file.data, (image) => { this.loadImageCallback(image) })

            // Draw the Image in the middle of the Canvas
            // image(this.image, width / 2, height / 2)
        }
        // Check if a non-image is selected
        else {
            // Alert the user
            alert("Please select an image")

            // Reset Options
            this.customStampOptions = this.createCustomStampOptions()
            this.populateOption()
        }
    }

    loadImageCallback(loadedImage) {
        // Ensure that the loaded image is the one currently stored in this.image
        this.image = loadedImage

        // Update the input values
        this.inputWidth.value = this.image.width
        this.inputHeight.value = this.image.height
    }

    drawing() {
        if (mouseIsPressed && mouseInBounds()) {
            // this.drawStar(mouseX, mouseY, 30, 70)
            this.stamp(mouseX, mouseY, 30, 70)
        }
    }

    reset() {
        // Reset this tool
        this.initialize()
    }

    populateOption() {
        // Declare default values
        let extraOptions = null
        let colourOptions = false

        // Check which stamp is selected
        switch (this.stampSelector.value) {
            case "star":
                // Add the star stamp options to the footer
                extraOptions = this.starStampOptions
                colourOptions = true
                break
            case "cloud":
                // Add the cloud stamp options to the footer
                extraOptions = this.cloudStampOptions
                break;
            case "custom":
                // Add the custom stamp options to the footer
                extraOptions = this.customStampOptions
                break;
        }

        // Empty the footer's current options
        select("#footer").html("")

        // Append this.stampSelector to footer
        select("#footer").elt.appendChild(this.stampSelector)

        extraOptions.forEach(option => {
            select("#footer").elt.appendChild(option)
        })

        // Add stroke options to footer
        if (colourOptions) colourP.loadColors(true, true)
    }

    stamp(x, y) {
        switch (this.stampSelector.value) {
            case "star":
                // Draw a star at the given position with the given width and height
                this.drawStar(x, y, this.starInnerRadius, this.starOuterRadius)
                break

            case "cloud":
                // Draw a cloud at the given position with the given width and height
                this.drawCloud(x, y, this.cloudWidth, this.cloudHeight)
                break
            case "custom":
                // Draw the image at the given position with the given width and height
                this.drawCustomImage(x, y)
        }
    }

    // https://p5js.org/examples/form-star.html
    drawStar(x = mouseX, y = mouseY, radius1, radius2, npoints = 5) {
        let angle = TWO_PI / npoints;
        let halfAngle = angle / 2.0;

        colourP.setStrokeAndFill()
        beginShape();
        for (let a = 0 - PI / 2; a < 1.5 * PI; a += angle) {
            let sx = x + cos(a) * radius2;
            let sy = y + sin(a) * radius2;
            vertex(sx, sy);
            sx = x + cos(a + halfAngle) * radius1;
            sy = y + sin(a + halfAngle) * radius1;
            vertex(sx, sy);
        }
        endShape(CLOSE);
    }

    drawCloud(x = mouseX, y = mouseY, width, height) {
        // Set Image to draw from center
        imageMode(CENTER)

        // Draw the image
        image(this.cloudImage, x, y, width, height)

        // Reset Image Mode to CORNER
        imageMode(CORNER)
    }

    drawCustomImage(x = mouseX, y = mouseY, width = this.inputWidth.valueAsNumber, height = this.inputHeight.valueAsNumber) {
        // Set Image to draw from center
        imageMode(CENTER)

        // Check if the image is laoded
        if (this.image && this.image.width > 0) {
            // Draw the image
            image(this.image, x, y, width, height)
        }

        // Reset Image Mode to CORNER
        imageMode(CORNER)
    }
}