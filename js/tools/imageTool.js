class imageTool extends Tool {
    constructor() {
        super()

        this.name = "Image"
        this.description = "Add an Image to the Canvas"
        // this.icon = "assets/select.png"

        this.initialize()

        this.strokeColor = color(0, 0, 0, 204) // 80% Transparent
        this.strokeWeight = 2
        this.fillColor = color(0, 0, 0, 0) // 100% Transparent
        this.lineDash = [0, 8]
        this.buttonColor = color(0, 0, 0, 204) // 80% Transparent
        this.buttonSize = 5
    }

    initialize() {
        this.previousMouseX = -1
        this.previousMouseY = -1

        this.original = []

        this.selectedWidth = -1
        this.selectedHeight = -1

        this.inputWidth = null
        this.inputHeight = null

        this.selectedX = -1
        this.selectedY = -1

        this.image = null
        this.loaded = false

        this.corners = [] // top-left, top-right, bottom-right, bottom-left
        this.sides = [] // top, right, bottom, left

        // This is to provide compatibility for classes to work with sketch.js and toolbox.js
        this.draw = () => { this.drawing() }
        this.unselectTool = () => { this.reset() }
        this.populateOptions = () => { this.populateOption() }
    }

    drawing() {
        // Check if mouse is pressed
        // Check if mouse is within Canvas
        // Check if an image is loaded
        if (mouseIsPressed && mouseInBounds() && this.loaded) {
            // Check if mouse is clicking on the selection
            if (mouseX >= this.selectedX && mouseX <= this.selectedX + this.selectedWidth && mouseY >= this.selectedY && mouseY <= this.selectedY + this.selectedHeight) {
                // Check if this is the first instance of clicking the selection
                if (this.previousMouseX <= 0) {
                    console.log("Clicking Selection")
                    this.previousMouseX = mouseX
                    this.previousMouseY = mouseY
                }

                // Move the selection accordingly
                this.selectedX += mouseX - this.previousMouseX
                this.selectedY += mouseY - this.previousMouseY

                // Move the corners and side buttons accordingly
                this.corners.forEach(corner => {
                    corner.x += mouseX - this.previousMouseX
                    corner.y += mouseY - this.previousMouseY
                })

                this.sides.forEach(side => {
                    side.x += mouseX - this.previousMouseX
                    side.y += mouseY - this.previousMouseY
                })

                // Set the click values to the current 
                this.previousMouseX = mouseX
                this.previousMouseY = mouseY

                // Copy this.original to pixels[] to update the canvas
                pixels = this.original.slice()

                // Push the modifications to pixels
                updatePixels()

                // Draw the image to the canvas
                this.drawImage()
            }
        }
        else {
            // Reset previousMouse coordinates
            this.previousMouseX = -1
            this.previousMouseY = -1
        }
    }

    reset() {
        // Reset the image
        // Copy this.edited to pixels[] to update the canvas
        pixels = this.original.slice()

        // Push the modifications to pixels
        updatePixels()

        // Draw the image to the canvas
        // Without the border
        this.drawImage(false)

        // Save the image
        loadPixels()

        // Reset this tool
        this.initialize()
    }

    populateOption(settings = false) {
        // Empty the footer's current options
        select("#footer").html("")

        // Create a divider
        let button = document.createElement('div')
        button.id = 'loadImageButton'
        button.className = 'toolOptionsWrapper toolOptionsButton'

        // Create a text element
        // let text = document.createElement('h5')
        // text.className = 'toolOptionsSetting toolOptionsText'
        // text.id = 'mirrorDrawToolDirection'
        // text.innerHTML = 'Select New Image'

        // Create a p5.js File Input
        let input = createFileInput((file) => { this.selectImageCallback(file) })
        input.elt.className += `toolOptionsText`

        // Append File Input to button
        button.appendChild(input.elt)

        // Append button to footer
        select("#footer").elt.appendChild(button)

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

        // Adjust the width in input.oninput
        this.inputWidth.oninput = () => {
            this.selectedWidth = this.inputWidth.value
        }

        // Append text and input to button
        button.appendChild(text)
        button.appendChild(this.inputWidth)

        // Append button to footer
        select("#footer").elt.appendChild(button)

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

        // Adjust the height in input.oninput
        this.inputHeight.oninput = () => {
            console.log("hello")
            this.selectedHeight = this.inputHeight.value
        }

        // Append text and input to button
        button.appendChild(text)
        button.appendChild(this.inputHeight)

        // Append button to footer
        select("#footer").elt.appendChild(button)

    }

    selectImageCallback(file) {
        console.log(file.file.name + " loaded")
        // Check if an image is selected
        if (file.type === 'image') {
            // Save the image
            this.image = loadImage(file.data, (image) => { this.loadImageCallback(image) })
            console.log(this.image)

            // Draw the Image in the middle of the Canvas
            // image(this.image, width / 2, height / 2)
        }
        // Check if a non-image is selected
        else {
            // Alert the user
            alert("Please select an image")

            // Reset Options
            this.populateOption()
        }
    }

    loadImageCallback(loadedImage) {
        // Ensure that the loaded image is the one currently stored in this.image
        this.image = loadedImage

        // Save current (original) state
        loadPixels() // Saves current pixels to pixels[]
        this.original = pixels.slice()

        // Get the coordinates for the image
        // Top Left Corner (Origin)
        this.selectedX = width / 2 - this.image.width / 2
        this.selectedY = height / 2 - this.image.height / 2

        // Bottom Right Corner
        let bottomRightX = width / 2 + this.image.width / 2
        let bottomRightY = height / 2 + this.image.height / 2

        // Top Right Corner 
        let topRightX = bottomRightX
        let topRightY = this.selectedY

        // Bottom Left Corner
        let bottomLeftX = this.selectedX
        let bottomLeftY = bottomRightY

        // Add the corner coordinates to this.corners[]
        this.corners = [createVector(this.selectedX, this.selectedY), createVector(topRightX, topRightY), createVector(bottomRightX, bottomRightY), createVector(bottomLeftX, bottomLeftY)]

        // Get the side coordinates
        // Top Side
        let topX = (this.corners[0].x + this.corners[1].x) / 2
        let topY = this.corners[0].y

        // Right Side
        let rightX = this.corners[1].x
        let rightY = (this.corners[1].y + this.corners[2].y) / 2

        // Bottom Side
        let bottomX = (this.corners[2].x + this.corners[3].x) / 2
        let bottomY = this.corners[2].y

        // Left Side
        let leftX = this.corners[3].x
        let leftY = (this.corners[0].y + this.corners[3].y) / 2

        // Add the side coordinates to this.sides[]
        this.sides = [createVector(topX, topY), createVector(rightX, rightY), createVector(bottomX, bottomY), createVector(leftX, leftY)]

        // Set the width and height of the image
        this.selectedWidth = this.image.width
        this.selectedHeight = this.image.height

        this.inputWidth.value = this.image.width
        this.inputHeight.value = this.image.height

        // Set loaded to true
        this.loaded = true

        // Draw the image in the middle of the Canvas
        this.drawImage()
    }

    drawImage(border = true) {
        console.log("Drawing Height: " + this.selectedHeight + " Width: " + this.selectedWidth + " X: " + this.selectedX + " Y: " + this.selectedY + "")
        // Check if there's a loaded image
        if (!this.loaded) return

        // Set fill and stroke
        // Set Stroke
        stroke(this.strokeColor)
        strokeWeight(this.strokeWeight)

        // Set fill
        fill(this.fillColor)

        // Make the rectangle have dotted lines
        drawingContext.setLineDash(this.lineDash)

        // Draw the border
        if (border) rect(this.selectedX, this.selectedY, this.selectedWidth, this.selectedHeight)

        // Draw the image to the canvas
        image(this.image, this.selectedX, this.selectedY, this.selectedWidth, this.selectedHeight)

        // Draw buttons at the 4 corners to adjust the size
        // Reset Line Dash
        drawingContext.setLineDash([0, 0])

        // Add Fill and Stroke Colours
        fill(this.buttonColor)
        stroke(this.buttonColor)

        // Draw the buttons
        if (border) {
            this.corners.forEach(corner => {
                ellipse(corner.x, corner.y, this.buttonSize, this.buttonSize)
            })

            this.sides.forEach(side => {
                ellipse(side.x, side.y, this.buttonSize, this.buttonSize)
            })
        }
    }
}