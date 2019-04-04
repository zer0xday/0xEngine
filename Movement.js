class Movement {
    constructor(object) {
        this.object = object;

        this.CONTROLLER = new Controller;
    };

    predictMove() {
        let { position, velocity } = this.object;
        let keyState = this.CONTROLLER.init();

        this.object.state = { stand: true };
        this.object.direction = {};

        if(keyState[39]) {
            this.object.state = { moving: true };
            this.object.direction = { right: true };
        }
        if(keyState[37]) {
            this.object.state = { moving: true };
            this.object.direction = { left: true };
        }

        if(keyState[40]) {
            this.object.state = { moving: true };
            this.object.direction = { bottom: true };
        }
        if(keyState[38]) {
            this.object.state = { moving: true };
            this.object.direction = { top: true };
        }
    };

    move() {
        let { position, velocity, collision } = this.object;
        let keyState = this.CONTROLLER.init();

        if(keyState[39] && !collision.right) {
            position.x[0] += velocity;
            position.x[1] += velocity;
        }
        if(keyState[37] && !collision.left) {
            position.x[0] -= velocity;
            position.x[1] -= velocity;
        }

        if(keyState[40] && !collision.bottom) {
            position.y[0] += velocity;
            position.y[1] += velocity;
        }
        if(keyState[38] && !collision.top) {
            position.y[0] -= velocity;
            position.y[1] -= velocity;
        }
    };
}