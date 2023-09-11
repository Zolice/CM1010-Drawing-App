class scissorTool extends Tool {
    constructor() {
        super()

        this.name = "Scissor"
        this.description = "Select an area to drag"
        this.icon = "assets/selectTool.png"

        this.initialize()
    }

    initialize() {
        this.designData = {
            "strokeColor": color(0, 0, 0, 204), // 80% Transparent
            "strokeWeight": 2,
            "fillColor": color(0, 0, 0, 0), // 100% Transparent
            "lineDash": [0, 8],
            "buttonColor": color(0, 0, 0, 204), // 80% Transparent
            "buttonSize": 5
        }

        this.previousMouseX = -1
        this.previousMouseY = -1

        this.original = []
        this.edited = []
        this.selectedPixels = createImage(0, 0) // Empty
        this.selectedWidth = -1
        this.selectedHeight = -1

        this.selectedX = -1
        this.selectedY = -1

        this.clickX = -1
        this.clickY = -1

        this.corners = [] // top-left, top-right, bottom-right, bottom-left
        this.sides = [] // top, right, bottom, left

        this.dragging = false

        this.createWidthHeightElements()
    }

    createWidthHeightElements() {
        // Create Width Element
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

        // Create Height Element
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
    }

    draw() {
        // Check if the mouse is pressed
        if (mouseIsPressed && mouseInBounds()) {
            // Check if selection has been made
            // Do this by checking this.selectedPixels
            if (this.selectedPixels.width <= 0) {
                // If previous mouse values are -1, then this is the first time the mouse has been pressed
                if (this.previousMouseX == -1 && this.previousMouseY == -1) {
                    // Prepare to draw the selection box
                    // Initialize the mouse values to current value
                    this.previousMouseX = mouseX
                    this.previousMouseY = mouseY

                    // Save current (original) state
                    loadPixels() // Saves current pixels to pixels[]
                    this.original = pixels.slice()
                }

                // Draw the selection box
                // Remove previously drawn selection rectangles
                updatePixels()

                // Set the stroke and fill of the rectangle
                stroke(this.designData.strokeColor)
                strokeWeight(this.designData.strokeWeight)
                fill(this.designData.fillColor)

                // Make the rectangle have dotted lines
                drawingContext.setLineDash(this.designData.lineDash)

                // Draw the rectangle
                rect(this.previousMouseX, this.previousMouseY, mouseX - this.previousMouseX, mouseY - this.previousMouseY)

                // Reset Line Dash
                drawingContext.setLineDash([0, 0])
            }
            // Check if the selection is made
            else {
                // // Check if the mouse is clicking on the selection
                // if (mouseX >= this.selectedX && mouseX <= this.selectedX + this.selectedWidth && mouseY >= this.selectedY && mouseY <= this.selectedY + this.selectedHeight) {
                //     // Check if this is the first instance of clicking the selection
                //     if (this.clickX <= 0) {
                //         this.clickX = mouseX
                //         this.clickY = mouseY
                //     }

                //     // Move the selection accordingly
                //     this.selectedX += mouseX - this.clickX
                //     this.selectedY += mouseY - this.clickY

                //     // Move the corners and side buttons accordingly
                //     this.corners.forEach(corner => {
                //         corner.x += mouseX - this.clickX
                //         corner.y += mouseY - this.clickY
                //     })

                //     this.sides.forEach(side => {
                //         side.x += mouseX - this.clickX
                //         side.y += mouseY - this.clickY
                //     })

                //     // Set the click values to the current 
                //     this.clickX = mouseX
                //     this.clickY = mouseY

                //     // Copy this.edited to pixels[] to update the canvas
                //     pixels = this.edited.slice()

                //     // Push the modifications to pixels
                //     updatePixels()

                //     // Draw the image to the canvas
                //     drawImage(this.selectedPixels, this.selectedX, this.selectedY, this.selectedWidth, this.selectedHeight, this.corners, this.sides, this.designData, true)
                // }
            }
        }
        // Check if the mouse has been released
        // To check if the mouse was pressed before, check previous mouse values
        else if (this.previousMouseX != -1) {
            // Save the selection
            // Get the stats of the selection
            let pixelDense = pixelDensity()

            // Get the top-left corner of the selection
            let topLeftX = this.previousMouseX < mouseX ? this.previousMouseX : mouseX
            let topLeftY = this.previousMouseY < mouseY ? this.previousMouseY : mouseY

            // Save the top-left corner of the selection as the x and y values of the image
            this.selectedX = topLeftX
            this.selectedY = topLeftY

            // Get the bottom-right corner of the selection
            let bottomRightX = this.previousMouseX > mouseX ? this.previousMouseX : mouseX
            let bottomRightY = this.previousMouseY > mouseY ? this.previousMouseY : mouseY

            // Get the top-right corner of the selection
            let topRightX = bottomRightX
            let topRightY = topLeftY

            // Get the bottom-left corner of the selection
            let bottomLeftX = topLeftX
            let bottomLeftY = bottomRightY

            // Add the corner coordinates to this.corners[]
            this.corners = [createVector(topLeftX, topLeftY), createVector(topRightX, topRightY), createVector(bottomRightX, bottomRightY), createVector(bottomLeftX, bottomLeftY)]

            // Get the side coordinates
            let topX = (topLeftX + topRightX) / 2
            let topY = topLeftY

            let rightX = bottomRightX
            let rightY = (topRightY + bottomRightY) / 2

            let bottomX = (bottomLeftX + bottomRightX) / 2
            let bottomY = bottomRightY

            let leftX = topLeftX
            let leftY = (topLeftY + bottomLeftY) / 2

            // Add the side coordinates to this.sides[]
            this.sides = [createVector(topX, topY), createVector(rightX, rightY), createVector(bottomX, bottomY), createVector(leftX, leftY)]

            // Get the width and height of the selection
            this.selectedWidth = bottomRightX - topLeftX
            this.selectedHeight = bottomRightY - topLeftY

            // Update the image size input values
            this.inputWidth.value = this.selectedWidth
            this.inputHeight.value = this.selectedHeight

            // Check if selection contains any pixels
            if (this.selectedWidth <= 0 || this.selectedHeight <= 0) {
                // There is nothing selected, it's a straight line selection
                // Reset the tool
                return this.unselectTool()
            }

            // Get the pixels of the selection from this.original
            // Re-create this.selectedPixels using the correct dimensions
            this.selectedPixels = createImage(this.selectedWidth, this.selectedHeight)
            for (let i = topLeftY; i < topLeftY + this.selectedHeight; i++) {
                for (let j = topLeftX; j < topLeftX + this.selectedWidth; j++) {
                    let index = ((i * width) + j) * pixelDense * 4
                    let r = this.original[index]
                    let g = this.original[index + 1]
                    let b = this.original[index + 2]
                    let a = this.original[index + 3]

                    this.selectedPixels.set(j - topLeftX, i - topLeftY, color(r, g, b, a))

                    // Set the pixel to Default (White)
                    pixels[index] = 255
                    pixels[index + 1] = 255
                    pixels[index + 2] = 255
                    pixels[index + 3] = 255
                }
            }

            // Push the modifications to this.selectedPixels image object
            this.selectedPixels.updatePixels()

            // Save a copy of the modified pixels to this.edited
            this.edited = pixels.slice()

            // Push the modifications to pixels
            updatePixels()

            // Draw the image to the canvas
            drawImage(this.selectedPixels, this.selectedX, this.selectedY, this.selectedWidth, this.selectedHeight, this.corners, this.sides, this.designData, true)

            // loadPixels()
            // updatePixels()

            // Add Width and Height options to the footer
            this.populateOptions(true)

            // Reset the previous mouse values
            this.previousMouseX = -1
            this.previousMouseY = -1
        }
        else {
            // Reset the previous mouse values
            this.clickX = -1
            this.clickY = -1

            // Reset mouse drag
            this.dragging = false
        }
    }

    mouseDragged() {
        // Check if the mouse is pressed 
        // Check if selection has been made
        // Do this by checking this.selectedPixels
        if (mouseIsPressed && mouseInBounds() && this.selectedPixels.width > 0) {
            // Check if the mouse is clicking on the selection
            if (mouseX >= this.selectedX && mouseX <= this.selectedX + this.selectedWidth && mouseY >= this.selectedY && mouseY <= this.selectedY + this.selectedHeight) {
                // Check if this is the first instance of clicking the selection
                if (this.clickX <= 0) {
                    this.clickX = mouseX
                    this.clickY = mouseY
                    this.dragging = true
                }
            }
            if (this.dragging) {
                // Move the selection accordingly
                this.selectedX += mouseX - this.clickX
                this.selectedY += mouseY - this.clickY

                // Move the corners and side buttons accordingly
                this.corners.forEach(corner => {
                    corner.x += mouseX - this.clickX
                    corner.y += mouseY - this.clickY
                })

                this.sides.forEach(side => {
                    side.x += mouseX - this.clickX
                    side.y += mouseY - this.clickY
                })

                // Set the click values to the current 
                this.clickX = mouseX
                this.clickY = mouseY

                // Copy this.edited to pixels[] to update the canvas
                pixels = this.edited.slice()

                // Push the modifications to pixels
                updatePixels()

                // Draw the image to the canvas
                drawImage(this.selectedPixels, this.selectedX, this.selectedY, this.selectedWidth, this.selectedHeight, this.corners, this.sides, this.designData, true)
            }

        }
    }

    unselectTool() {
        // Reset the image
        // Copy this.edited to pixels[] to update the canvas
        pixels = this.edited.slice()

        // Push the modifications to pixels
        updatePixels()

        // Draw the image to the canvas
        // Without the border
        if (this.selectedPixels.width > 0) drawImage(this.selectedPixels, this.selectedX, this.selectedY, this.selectedWidth, this.selectedHeight, this.corners, this.sides, this.designData, false)

        // Save the image
        loadPixels()

        // Re-populate options
        this.populateOptions()

        // Reset this tool
        this.initialize()
    }

    populateOptions(options = false) {
        // Empty the footer and append button
        select("#footer").html("")

        // Create a divider
        let button = document.createElement('div')
        button.id = 'resetButton'
        button.className = 'toolOptionsWrapper toolOptionsButton'

        // Create a text element
        let text = document.createElement('h5')
        text.className = 'toolOptionsSetting toolOptionsText'
        text.id = 'mirrorDrawToolDirection'
        text.innerHTML = 'Remove Selection'

        // Append text to button
        button.appendChild(text)

        // Add button click event listener
        button.onclick = () => {
            this.unselectTool()
        }

        // Append button to footer
        select("#footer").elt.appendChild(button)

        // Display Width and Height options
        if (options) {
            // Create a divider
            button = document.createElement('div')
            button.id = 'imageSizeButton'
            button.className = 'toolOptionsWrapper'

            // Create a text element
            text = document.createElement('h5')
            text.className = 'toolOptionsSetting toolOptionsText'
            text.id = 'imageWidth'
            text.innerHTML = 'Width'

            // Append text and input to button
            button.appendChild(text)
            button.appendChild(this.inputWidth)

            // Append button to footer
            select("#footer").elt.appendChild(button)

            // Create a divider
            button = document.createElement('div')
            button.id = 'imageSizeButton'
            button.className = 'toolOptionsWrapper'

            // Create a text element
            text = document.createElement('h5')
            text.className = 'toolOptionsSetting toolOptionsText'
            text.id = 'imageHeight'
            text.innerHTML = 'Height'

            // Append text and input to button
            button.appendChild(text)
            button.appendChild(this.inputHeight)

            // Append button to footer
            select("#footer").elt.appendChild(button)
        }
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
        if (this.selectedPixels.width <= 0) return

        // Copy this.original to pixels[] to update the canvas
        pixels = this.original.slice()

        // Push the modifications to pixels
        updatePixels()

        // Draw the image to the canvas
        drawImage(this.selectedPixels, this.selectedX, this.selectedY, this.selectedWidth, this.selectedHeight, this.corners, this.sides, this.designData, true)
    }
}