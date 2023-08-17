class imageTool extends Tool {
    constructor() {
        super()

        this.name = "Image"
        this.description = "Add an Image to the Canvas"
        this.icon = "assets/imageTool.png"

        this.initialize()

        this.designData = {
            "strokeColor": color(0, 0, 0, 204), // 80% Transparent
            "strokeWeight": 2,
            "fillColor": color(0, 0, 0, 0), // 100% Transparent
            "lineDash": [0,8],
            "buttonColor": color(0, 0, 0, 204), // 80% Transparent
            "buttonSize": 5
        }
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
    }

    draw() {
        // Check if mouse is pressed
        // Check if mouse is within Canvas
        // Check if an image is loaded
        if (mouseIsPressed && mouseInBounds() && this.loaded) {
            // Check if mouse is clicking on the selection
            if (mouseX >= this.selectedX && mouseX <= this.selectedX + this.selectedWidth && mouseY >= this.selectedY && mouseY <= this.selectedY + this.selectedHeight) {
                // Check if this is the first instance of clicking the selection
                if (this.previousMouseX <= 0) {
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
                drawImage(this.image, this.selectedX, this.selectedY, this.selectedWidth, this.selectedHeight, this.corners, this.sides, this.designData, true)
            }
        }
        else {
            // Reset previousMouse coordinates
            this.previousMouseX = -1
            this.previousMouseY = -1
        }
    }

    unselectTool() {
        // Reset the image
        // Copy this.edited to pixels[] to update the canvas
        pixels = this.original.slice()

        // Push the modifications to pixels
        updatePixels()

        // Draw the image to the canvas
        // Without the border
        drawImage(this.image, this.selectedX, this.selectedY, this.selectedWidth, this.selectedHeight, this.corners, this.sides, this.designData, false)

        // Save the image
        loadPixels()

        // Reset this tool
        this.initialize()
    }

    populateOptions() {
        // Empty the footer's current options
        select("#footer").html("")

        // Create a divider
        let button = document.createElement('div')
        button.id = 'loadImageButton'
        button.className = 'toolOptionsWrapper toolOptionsButton'

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
            this.selectedWidth = this.inputWidth.valueAsNumber
            this.calculateCornersAndSides()
            this.updateImage()
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
            this.selectedHeight = this.inputHeight.valueAsNumber
            this.calculateCornersAndSides()
            this.updateImage()
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

        // Set the width and height of the image
        this.selectedWidth = this.image.width
        this.selectedHeight = this.image.height

        this.inputWidth.value = this.image.width
        this.inputHeight.value = this.image.height

        // Calculate the corners and sides
        this.calculateCornersAndSides()

        // Set loaded to true
        this.loaded = true

        // Draw the image in the middle of the Canvas
        drawImage(this.image, this.selectedX, this.selectedY, this.selectedWidth, this.selectedHeight, this.corners, this.sides, this.designData, true)
    }

    calculateCornersAndSides() {
        // Empty this.corners and this.sides
        this.corners = []
        this.sides = []

        // Get the coordinates based on the selectedX, selectedY, selectedWidth, and selectedHeight
        // Get corner coordinates
        // Top Left Corner (Origin)
        this.corners.push(createVector(this.selectedX, this.selectedY))

        // Top Right Corner
        this.corners.push(createVector(this.selectedX + this.selectedWidth, this.selectedY))

        // Bottom Left Corner
        this.corners.push(createVector(this.selectedX, this.selectedY + this.selectedHeight))

        // Bottom Right Corner
        this.corners.push(createVector(this.selectedX + this.selectedWidth, this.selectedY + this.selectedHeight))

        // Get the side coordinates
        // Top Side
        this.sides.push(createVector((this.corners[0].x + this.corners[1].x) / 2, this.corners[0].y))

        // Right Side
        this.sides.push(createVector(this.corners[1].x, (this.corners[1].y + this.corners[2].y) / 2))

        // Bottom Side
        this.sides.push(createVector((this.corners[2].x + this.corners[3].x) / 2, this.corners[2].y))

        // Left Side
        this.sides.push(createVector(this.corners[2].x, (this.corners[0].y + this.corners[3].y) / 2))
    }

    updateImage() {
        // Check if an image is loaded
        if (!this.loaded) return

        // Copy this.original to pixels[] to update the canvas
        pixels = this.original.slice()

        // Push the modifications to pixels
        updatePixels()

        // Draw the image to the canvas
        drawImage(this.image, this.selectedX, this.selectedY, this.selectedWidth, this.selectedHeight, this.corners, this.sides, this.designData, true)
    }
}