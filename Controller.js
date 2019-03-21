class Controller {
    constructor() {
        this.keyState = {};
        this.allowedKEYS = [
            39, // right
            37, // left
            32,  // spacebar
            38,
            40
        ];
    }
    keyDown() {
        document.onkeydown = (event) => {
            this.allowedKEYS.includes(event.keyCode) ? this.keyState[event.keyCode] = true : null;
        };
    }

    keyUp() {
        document.onkeyup = (event) => {
            this.allowedKEYS.includes(event.keyCode) ? this.keyState[event.keyCode] = false : null;
        }
    }

    init() {
        this.keyDown();
        this.keyUp();
        return this.keyState;
    }
}