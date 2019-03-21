class Movement {
    constructor(object) {
        this.object = object;

        this.CONTROLLER = new Controller;
        this.PHYSICS = new Physics(object);
    };

    move() {
        let { position, velocity, state, direction } = this.object;
        let keyState = this.CONTROLLER.init();

        if(keyState[39] && !this.PHYSICS.screenCollision().right) {
            position.x[0] += velocity;
            position.x[1] += velocity;
            state = 'moving';
            direction = 'right';
        }
        if(keyState[37] && !this.PHYSICS.screenCollision().left) {
            position.x[0] -= velocity;
            position.x[1] -= velocity;
            state = 'moving';
            direction = 'left';
        }
        if(keyState[32] && !this.PHYSICS.screenCollision().top) {
            position.y[0] -= this.object.jump;
            position.y[1] -= this.object.jump;
            state = 'moving';
        }
    }

    init() {
        this.move();
    }
}