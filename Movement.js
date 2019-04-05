class Movement {
    constructor(object) {
        this.object = object;

        this.CONTROLLER = new Controller;
    };

    predictMove() {
        let keyState = this.CONTROLLER.init();

        this.object.state = { stand: true };
        this.object.direction = {
            right: false,
            left: false,
            bottom: false,
            top: false
        };

        // right arrow
        if(keyState[39]) {
            this.object.state = { moving: true };
            this.object.direction.right = true;
        }
        // left arrow
        if(keyState[37]) {
            this.object.state = { moving: true };
            this.object.direction.left = true;
        }
        // down arrow
        if(keyState[40]) {
            this.object.state = { moving: true };
            this.object.direction.bottom = true;
        }
        // up arrow
        if(keyState[38]) {
            this.object.state = { moving: true };
            this.object.direction.top = true;
        }

        // spacebar
        if(keyState[32]) {
            this.object.shooting = true;
        } else {
            this.object.shooting = false;
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
            position.z[0] += velocity;
            position.z[1] += velocity;
        }
        if(keyState[38] && !collision.top) {
            position.y[0] -= velocity;
            position.y[1] -= velocity;
            position.z[0] -= velocity;
            position.z[1] -= velocity;
        }
    };
}