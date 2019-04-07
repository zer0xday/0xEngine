class Map {
    constructor() {
        this.ground = new Ground(64, 64, 64, 64, 'grass.png')
        this.walls = [
            new Wall(0, 0, 'horizontal', 5, 16, 64, 64, 'wall-top.png'),
            new Wall(64 * 5, 0, 'vertical', 5, 64, 64, 64, 'wall-right-fix.png')
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
        const { x, y, z } = this.position;
        const { ctx } = this;
        ctx.beginPath();
        ctx.rect(x[0], z[0], this.width, this.depth);
        ctx.strokeStyle = '#ff0000';
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
    constructor(x, y, direction, parts, depth, sWidth, sHeight, src) {
        super();
        this.depth = depth;
        this.src = '/sprites/' + src;
        this.parts = parts;
        this.sWidth = sWidth;
        this.sHeight = sHeight;
        this.direction = direction;
        this.width = this.calculateDimensions(direction).width;
        this.height = this.calculateDimensions(direction).height;
        this.position = {
            x: [x, x + this.width],
            y: [y, y + this.height],
            z: [(y + this.height) - this.depth, y + this.height]
        };
    }

    calculateDimensions(direction) {
        const { sWidth, sHeight, parts } = this;
        let width, height;

        switch(direction) {
            case 'horizontal':
                width = sWidth * parts;
                height = sHeight;
                break;

            case 'vertical':
                width = sWidth;
                height = sHeight * parts;
                break;

            default:
                width = 0,
                height = 0;
                break;
        }
        return {
            width: width,
            height: height
        }
    }

    buildWall(direction) {
        const {
            ctx, src,
            position, parts,
            sWidth, sHeight
        } = this;

        let img = new Image;
        img.src = src;

        switch(direction) {
            case 'horizontal':
                for(let i = 0; i < parts; i++) {
                    ctx.drawImage(
                        img,
                        position.x[0] + (sWidth * i), position.y[0],
                        sWidth, sHeight,
                    );
                }
                break;

            case 'vertical':
                for(let i = 0; i < parts; i++) {
                    ctx.drawImage(
                        img,
                        position.x[0], position.y[0] + (sHeight * i),
                        sWidth, sHeight,
                    );
                }
                break;

            default: break;
        }
    }

    draw() {
        const { direction } = this;
        this.buildWall(direction);
        this.collisionRect();
        console.log(this.position.z[0], this.position.z[1]);
    }
}