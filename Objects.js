class Map {
    constructor() {
        this.ground = new Ground(64, 64, 64, 64, 'grass.png')
        this.walls = [
            new Wall(0, 0, 64, 64*5, 64, 'wall-top.png'),
            new Wall(64*5 - 32, 12, 32, 128, 240, 'wall-right-fix.png'),
        ];
        this.trees = [
            new Rect(150, 150, 26, 72, 136, 'tree.png'),
            new Rect(50, 50, 26, 72, 136, 'tree.png'),
        ];
        this.hero = new Hero(
            300, 150, 20,       // x, y, z
            32, 50,             // width, height
            'hero-sprites.png'  // src
        );
        this.staticObjects = this.staticObjects(
            this.walls, this.trees
        );
        this.staticWallsArray = this.staticWallsArray(this.walls);
        this.staticObjectsArray = this.staticObjectsArray(this.trees, this.walls);
    };

    staticObjects(...objects) {
        let array = [];
        return array.concat(...objects);
    }

    staticWallsArray(objects) {
        let array = [];
        for(let i = 0; i < objects.length; i++) {
            array.push([
                objects[i].position.x[0],
                objects[i].position.x[1],
                objects[i].position.y[0],
                objects[i].position.y[1]
            ]);
        }
        return array;
    }

    staticObjectsArray(...objects) {
        let array = [];
        for(let obj of objects) {
            obj.forEach( (el) => {
                array.push([
                    el.position.x[0],
                    el.position.x[1],
                    el.position.y[0],
                    el.position.y[1],
                    el.position.z[0],
                    el.position.z[1]
                ]);
            });
        }
        return array;
    }

    init() {
        let array = [];
        return array.concat(
            this.walls, this.trees, this.hero
        );
    }
}

class Ground {
    constructor(x, y, width, height, src) {
        this.CANVAS = new Canvas;
        this.ctx = this.CANVAS.bgCtx;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.src = '/sprites/' + src;
    }

    draw() {
        let img = new Image;
        img.src = this.src;

        const { ctx, x, y, width, height } = this;
        for(let j = 0; j < 8; j++) {
            for(let i = 0; i < 10; i++) {
                ctx.drawImage(
                    img,
                    (x * i), (y * j),
                    width, height
                );
            }
        }
    }
}

class Rect {
    constructor(x, y, depth, width, height, src) {
        this.CANVAS = new Canvas;
        this.ctx = this.CANVAS.fgCtx;
        this.width = width;
        this.height = height;
        this.depth = depth;
        this.src = '/sprites/' + src;
        this.position = {
            x: [x, x + width],
            y: [y, y + height],
            z: [(y + height) - depth, y + height]
        };
    };

    collisionRect() {
        const { x, z } = this.position;
        const { ctx } = this;
        ctx.beginPath();
        ctx.rect(x[0], z[0], this.width, this.depth);
        ctx.stroke();
    }

    draw() {
        const { ctx } = this;
        let img = new Image;
        img.src = this.src;

        this.collisionRect();

        const { x, y } = this.position;
        ctx.drawImage(img, x[0], y[0], this.width, this.height);
    }
};

class Wall extends Rect {
    constructor(x, y, depth, width, height, src) {
        super(x, y, depth, width, height, src);
        this.sprite = {
            height: 64,
            width: 64
        }
        this.direction = this.wallDirection();
    }

    wallDirection() {
        if(this.width > this.height) {
            return 'right';
        } else {
            return 'bottom';
        }
    }

    draw() {
        const { ctx, sprite, direction, position } = this;

        let img = new Image;
        img.src = this.src;

        const wallParts = {
            counter: direction === 'right'
                ? Math.ceil(this.width / sprite.width)
                : Math.ceil(this.height / sprite.height),
        };
        for(let i = 0; i < wallParts.counter; i++) {
            if(direction === 'right') {
                ctx.drawImage(img, position.x[0] + (sprite.width * i), position.y[0], sprite.width, sprite.height);
            } else if(direction === 'bottom') {
                ctx.drawImage(img, position.x[0], position.y[0] + (sprite.height * i), sprite.width, sprite.height);
            }
        }
    }
}