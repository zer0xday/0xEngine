class Physics {
    constructor(object) {
        this.object = object;
        this.GRAVITY = 5;
        this.MAP = new Map;
    }

    projectileCollisionDetection() {
        const projectile = this.object.PROJECTILE;
        const projectilesArray = projectile.objects;
    }

    collisionDetection() {
        let hero = this.object;
        hero.collision.right = false; hero.collision.left = false;
        hero.collision.bottom = false; hero.collision.top = false;

        return this.calculateCollision(this.MAP.staticObjectsArray, hero);
    }

    calculateCollision(collisionArray, hero) {
        collisionArray.forEach((el) => {
            const { position } = hero;
            const type = el[6].toLowerCase();
            const obj = {
                x: [el[0], el[1]],
                y: [el[2], el[3]],
                z: [el[4], el[5]]
            }

            switch(type) {
                case 'rect':
                    return this.staticRectCollision(hero, position, obj);

                case 'wall':
                    // this condition's checking Wall direction
                    // is horizontal?
                    if( (obj.x[1] - obj.x[0]) > (obj.y[1] - obj.y[0]) ) {
                        return this.horizontalWallCollision(hero, position, obj);
                    } else { // vertical
                        return this.verticalWallCollision(hero, position, obj);
                    }

                default: return;
            }
        });
    }

    staticRectCollision(hero, position, obj) {
        if(position.x[1] >= obj.x[0] && position.x[0] <= obj.x[1]     // left right
        && position.z[1] >= obj.z[0] && position.z[0] <= obj.z[1]) {  // bottom top
            if(position.z[1] === obj.z[0]) {
                hero.collision.bottom = true;
            }
            else if(position.z[0] === obj.z[1]) {
                hero.collision.top = true;
            }
            else if(position.z[0] <= obj.z[1] && position.x[1] === obj.x[0]) {
                hero.collision.right = true;
            }
            else if(position.z[0] <= obj.z[1] && position.x[0] === obj.x[1]) {
                hero.collision.left = true;
            }
        }
        return hero.collision;
    }

    horizontalWallCollision(hero, position, obj) {
        return this.staticRectCollision(hero, position, obj);
    }

    verticalWallCollision(hero, position, obj) {
        if(position.x[1] >= obj.x[0] && position.x[0] <= obj.x[1]     // left right
        && position.y[1] >= obj.y[0] && position.y[0] <= obj.y[1]) {  // bottom top
            if(position.y[1] === obj.y[0]) {
                hero.collision.bottom = true;
            }
            else if(position.z[0] === obj.z[1]) {
                hero.collision.top = true;
            }
            else if(position.z[0] <= obj.z[1] && position.x[1] === obj.x[0]) {
                hero.collision.right = true;
            }
            else if(position.z[0] <= obj.z[1] && position.x[0] === obj.x[1]) {
                hero.collision.left = true;
            }
        }
        return hero.collision;
    }
}