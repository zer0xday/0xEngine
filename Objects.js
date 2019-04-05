class Map {
    constructor() {
        this.walls = [];
        this.trees = [
            new Rect(150, 150, 26, 72, 136, 'tree.png'),
            new Rect(50, 50, 26, 72, 136, 'tree.png'),
        ];
        this.hero = new Hero(
            300, 150, 20,       // x, y, z
            32, 50,             // width, height
            'hero-sprites.png'  // src
        );
        this.staticObjects = this.staticObjects(this.trees);
        this.staticWallsArray = this.staticWallsArray(this.walls);
        this.staticObjectsArray = this.staticObjectsArray(this.trees);
    };

    staticObjects(objects) {
        let array = [];
        return array.concat(objects);
    }

    staticWallsArray(objects) {
        let array = [];
        for(let i = 0; i < objects.length; i++) {
            array.push([
                objects[i].position.x[0],
                objects[i].position.x[1],
                objects[i].position.y[0],
                objects[i].position.y[1],
            ]);
        }
        return array;
    }

    staticObjectsArray(objects) {
        let array = [];
        for(let i = 0; i < objects.length; i++) {
            array.push([
                objects[i].position.x[0],
                objects[i].position.x[1],
                objects[i].position.y[0],
                objects[i].position.y[1],
                objects[i].position.z[0],
                objects[i].position.z[1]
            ]);
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

class Rect {
    constructor(x, y, z, width, height, src) {
        this.ctx = Canvas.ctx();
        this.width = width;
        this.height = height;
        this.depth = z;
        this.src = '/sprites/' + src;
        this.position = {
            x: [x, x + width],
            y: [y, y + height],
            z: [(y + height) - z, y + height]
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
        let img = new Image();
        img.src = this.src;

        this.collisionRect();

        const { x, y } = this.position;
        ctx.drawImage(img, x[0], y[0], this.width, this.height);
    }
};

class Wall extends Rect {
    constructor(x, y, z, width, height, src) {
        super(x, y, z, width, height, src);
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
        const { ctx, sprite, direction } = this;

        let img = new Image();
        img.src = this.src;

        const wallParts = {
            counter: direction === 'right'
                ? Math.ceil(this.width / sprite.width)
                : Math.ceil(this.height / sprite.height),
        };

        for(let i = 0; i < wallParts.counter; i++) {
            if(direction === 'right') {
                ctx.drawImage(img, sprite.width * i, this.position.y[0], sprite.width, sprite.height);
            } else if(direction === 'bottom') {
                ctx.drawImage(img, this.position.x[0], sprite.height * i, sprite.width, sprite.height);
            }
        }
    }
}