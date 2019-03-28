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
        if(keyState[32]) {
            this.object.state = { jumping: true };
        }
    };

    move() {
        let { position, velocity, jumpVelocity, direction } = this.object;
        let keyState = this.CONTROLLER.init();

        if(keyState[39]) {
            position.x[0] += velocity;
            position.x[1] += velocity;
        }
        if(keyState[37]) {
            position.x[0] -= velocity;
            position.x[1] -= velocity;
        }
    };

    init() {
        this.move();
    }
}