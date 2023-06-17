class Tool {
    constructor() {
        this.name = "Tool"
        this.description = "This is a tool"
        this.icon = "assets/freehand.png"

        this.previousMouseX = -1
        this.previousMouseY = -1

        this.initialize()
    }

    initialize() {
        // This is used to provide compatibility for classes to work with sketch.js and toolbox.js
        // Set draw() to this.draw
        console.log("Hello")
        this.draw = draw()
    }

    draw() {
        console.log("drawing...")
        // This is a stub
    }

    populateOptions() {
        // This is a stub
    }
}