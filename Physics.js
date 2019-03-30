class Physics {
    constructor(object) {
        this.object = object;
        this.GRAVITY = 5;
    }

    objectCollision() {
        const engine = new Engine;
        const collisionArray = engine.CollisionWALL;
        let hero = this.object;
        hero.collision = {};

        collisionArray.forEach((el) => {
            const { position } = hero;

            if(position.x[1] >= el[0] && position.x[0] <= el[1]     // left right
            && position.y[1] >= el[2] && position.y[0] <= el[3]) {  // bottom top
                if(position.x[1] === el[0]) {
                    hero.collision = { right: true };
                }
                if(position.x[0] === el[1]) {
                    hero.collision = { left: true };
                }
                if(position.y[1] === el[2]) {
                    hero.collision = { bottom: true };
                }
                if(position.y[0] === el[3]) {
                    hero.collision = { top: true };
                }
            }
        });

        return hero.collision;
    }

    gravity() {
        let { position, height, state, jumpVelocity, collision } = this.object;

        if((position.y[0] < Canvas.floor.height() - (height)) && (!('bottom' in collision))) {
            position.y[0] += this.GRAVITY;
            position.y[1] += this.GRAVITY;
        }

        if('jumping' in state) {
            if(!('top' in collision)) {
                position.y[0] -= jumpVelocity;
                position.y[1] -= jumpVelocity;
            } else {
                console.log(collision);
            }
        }
    }

    init() {
        // this.objectCollision();
        this.gravity();
    }
}