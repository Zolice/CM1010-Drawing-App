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
        this.draw = () => { this.drawing() }
        this.unselectTool = () => { this.reset() }
        this.populateOptions = () => { this.populateOption() }
    }

    drawing() {
        // This is a stub
        return
    }

    reset() {
        // This is a stub
        return
    }

    populateOptions() {
        // This is a stub
        return
    }
}