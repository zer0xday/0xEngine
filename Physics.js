class Physics {
    constructor(object) {
        this.object = object;
        this.GRAVITY = 7;
    }

    objectCollision(wall) {
        let collisionArray = wall;
        let hero = {
            array: wall.pop(),
            height() { return this.array[4] },
            width() { return this.array[5] },
            x1() { return this.array[0] },
            x2() { return this.array[1] },
            y1() { return this.array[2] },
            y2() { return this.array[3] }
        };

        collisionArray.forEach((el) => {
            if(hero.x2() >= el[0] && hero.x1() <= el[1]     // left right
            && hero.y1() <= el[3] && hero.y2() >= el[2]) {  // bottom top
                console.log('collision', hero.y1(), el[2], el[3]);
            }
        });
    }

    screenCollision() {
        return {
            right: this.object.screenCollision().right <= 0 ? true : false,
            left: this.object.screenCollision().left <= 0 ? true : false,
            top: this.object.screenCollision().top <= 0 ? true : false,
            bottom: this.object.screenCollision().bottom <= 0 ? true : false,
        }
    }

    gravity() {
        if(this.object.position.y[0] < Canvas.floor.height() - (this.object.height)) {
            this.object.position.y[0] += this.GRAVITY;
            this.object.position.y[1] += this.GRAVITY;
        }
    }

    init() {
        this.screenCollision();
        // this.gravity();
    }
}