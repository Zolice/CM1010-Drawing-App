class SprayCanTool extends Tool {
    constructor() {
        super()

        this.name = "sprayCanTool"
        this.icon = "assets/sprayCan.png"
        this.description = "Spray paint on the canvas with your mouse"

        this.initialize()
    }

    initialize() {
        // Initialize Values
        this.count = 13
        this.spread = 10
    }

    draw() {
        var r = random(5, 10)
        if (mouseIsPressed && mouseInBounds()) {
            for (var i = 0; i < this.count; i++) {
                colourP.setStroke()
                point(random(mouseX - this.spread, mouseX + this.spread), random(mouseY - this.spread, mouseY + this.spread))
            }
        }
    }

    populateOptions() {
        // Empty the footer's current options
        select("#footer").html("")

        // Add Spread options to footer
        // Create a text element to indicate Spread
        let spreadText = document.createElement("h5")
        spreadText.className = "toolOptionsType toolOptionsText"
        spreadText.innerHTML = "Spread"

        // Append text element to footer
        select("#footer").elt.appendChild(spreadText)

        // Create a Div to hold the spread options
        let spreadDiv = document.createElement("div")
        spreadDiv.className = "toolOptionsWrapper"

        // Create a number input element to hold the spread Size
        let spreadSizeInput = document.createElement("input")
        spreadSizeInput.className = "textSelector"
        spreadSizeInput.type = "number"
        spreadSizeInput.id = "spreadSize"
        spreadSizeInput.value = this.spread
        spreadSizeInput.step = 0.1

        // Call the callback function when the input is changed
        spreadSizeInput.oninput = () => {
            // Update the value
            this.spread = spreadSizeInput.valueAsNumber
        }

        // Add the number input element to the spread divider
        spreadDiv.appendChild(spreadSizeInput)

        // Add the spread divider to the footer
        select("#footer").elt.appendChild(spreadDiv)

        // Add count options to footer
        // Create a text element to indicate count
        let countText = document.createElement("h5")
        countText.className = "toolOptionsType toolOptionsText"
        countText.innerHTML = "Count"

        // Append text element to footer
        select("#footer").elt.appendChild(countText)

        // Create a Div to hold the count options
        let countDiv = document.createElement("div")
        countDiv.className = "toolOptionsWrapper"

        // Create a number input element to hold the count Size
        let countSizeInput = document.createElement("input")
        countSizeInput.className = "textSelector"
        countSizeInput.type = "number"
        countSizeInput.id = "countSize"
        countSizeInput.value = this.count
        countSizeInput.step = 0.1

        // Call the callback function when the input is changed
        countSizeInput.oninput = () => {
            // Update the value
            this.count = countSizeInput.valueAsNumber
        }

        // Add the number input element to the count divider
        countDiv.appendChild(countSizeInput)

        // Add the count divider to the footer
        select("#footer").elt.appendChild(countDiv)

        // Add spread options to footer
        colourP.loadColors(true, false)
    }
}