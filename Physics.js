class Physics {
    constructor(object) {
        this.object = object;
        this.GRAVITY = 5;
    }

    objectCollision() {
        const map = new Map;
        const collisionArray = map.staticObjectsArray;
        let hero = this.object;
        hero.collision.right = false; hero.collision.left = false;
        hero.collision.bottom = false; hero.collision.top = false;

        // Fix collision array in vertical walls

        collisionArray.forEach((el) => {
            const { position } = hero;
            const obj = {
                x: [el[0], el[1]],
                z: [el[4], el[5]]
            }

            console.log(el);

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
        });
        return hero.collision;
    }
}