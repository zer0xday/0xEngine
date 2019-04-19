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
        const {
            velocity, collision,
            direction, state
        } = this.object;
        let { position } = this.object;

        if(state.moving) {
            if(direction.right && !collision.right) {
                position.x[0] += velocity;
                position.x[1] += velocity;
            }
            if(direction.left && !collision.left) {
                position.x[0] -= velocity;
                position.x[1] -= velocity;
            }

            if(direction.bottom && !collision.bottom) {
                position.y[0] += velocity;
                position.y[1] += velocity;
                position.z[0] += velocity;
                position.z[1] += velocity;
            }
            if(direction.top && !collision.top) {
                position.y[0] -= velocity;
                position.y[1] -= velocity;
                position.z[0] -= velocity;
                position.z[1] -= velocity;
            }
        }
    };

    moveAI() {
        let {
            position, direction, velocity,
            collision, frame, sprite
        } = this.object;

        this.object.direction = {
            right: false,
            left: false,
            bottom: false,
            top: false
        };

        const getRandom = () => {
            return Math.round(Math.random() * (3 - 1)) + 1;
        }

        this.object.state.stand = false;

        let rnd = 0;
        if(frame % 20 === 0) {
            rnd = getRandom();
        }
        console.log(rnd * velocity);

        if(!collision.left && frame % 3 === 0) {
            sprite.direction = 1;
            position.x[0] -= (velocity * rnd);
            position.x[1] -= (velocity * rnd);
        }

        console.log(collision);
    }
}