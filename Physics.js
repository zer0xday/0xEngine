class Physics {
    constructor(object) {
        this.object = object;
        this.GRAVITY = 5;
    }

    objectCollision() {
        const engine = new Engine;
        const collisionArray = engine.CollisionWALL;
        let hero = this.object;
        hero.collision.right = false; hero.collision.left = false;
        hero.collision.bottom = false; hero.collision.top = false;

        collisionArray.forEach((el) => {
            const { position } = hero;

            if(position.x[1] >= el[0] && position.x[0] <= el[1]     // left right
            && position.y[1] >= el[2] && position.y[0] <= el[3]) {  // bottom top
                if(position.x[1] === el[0]) {
                    hero.collision.right = true;
                }
                else if(position.x[0] === el[1]) {
                    hero.collision.left = true;
                }
                else if(position.y[1] === el[2]) {
                    hero.collision.bottom = true;
                }
                else if(position.y[0] === el[3]) {
                    hero.collision.top = true;
                }
            }
        });
        return hero.collision;
    }

    gravity() {
        let { position, height, state, jumpVelocity, velocity, collision } = this.object;

        if((position.y[0] < Canvas.floor.height() - (height)) && (!('bottom' in collision))) {
            position.y[0] += this.GRAVITY;
            position.y[1] += this.GRAVITY;
        }
    }

    init() {
        // this.objectCollision();
        // this.gravity();
    }
}