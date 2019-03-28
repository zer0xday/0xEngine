class Physics {
    constructor(object) {
        this.object = object;
        this.GRAVITY = 5;
    }

    objectCollision() {
        const engine = new Engine;
        const collisionArray = engine.CollisionWALL;
        let hero = this.object;
        let collision = false;

        collisionArray.forEach((el) => {
            const { position } = hero;

            if(position.x[1] >= el[0] && position.x[0] <= el[1]     // left right
            && position.y[1] >= el[2] && position.y[0] <= el[3]) {  // bottom top
                collision = true;
            }
        });

        return collision;
    }

    gravity() {
        let { position, height, state, jumpVelocity } = this.object;

        if(position.y[0] < Canvas.floor.height() - (height)) {
            position.y[0] += this.GRAVITY;
            position.y[1] += this.GRAVITY;
        } else {
            if('jumping' in state) {
                position.y[0] -= jumpVelocity;
                position.y[1] -= jumpVelocity;
            }
        }
    }

    init() {
        // this.objectCollision();
        this.gravity();
    }
}