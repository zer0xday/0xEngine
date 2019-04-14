class Map {
    constructor() {
        this.ground = new Ground(64, 64, 64, 64, 'grass.png')
        this.walls = [
            new Wall(80, 50, 'horizontal', 5, 64 / 4, 64, 64, 'wall-top.png'),
            new Wall( (64 * 5) + 80, 50, 'vertical', 5, 16, 16, 64, 'wall-right-roof.png', 0, 48, 48),
            new Wall(96, (64 * 6) - 14, 'horizontal', 5, 64 / 4, 64, 64, 'wall-top.png'),
        ];
        this.trees = [
            // new Rect(150, 150, 16, 72, 136, 'tree.png'),
            new Rect(50, 50, 16, 72, 136, 'tree.png', 10),
        ];
        this.enemies = [
            new Enemy(
                500, 200, 10,       // x, y, z
                32, 50,             // width, height
                'hero-sprites.png'  // src
            )
        ]
        this.hero = new Hero(
            300, 150, 10,       // x, y, z
            32, 50,             // width, height
            'hero-sprites.png'  // src
        );
        this.staticObjects = this.staticObjects(
            this.walls, this.trees
        );
        this.staticWallsArray = this.staticObjectsArray(this.walls);
        this.staticObjectsArray = this.staticObjectsArray(this.trees, this.walls);
    };

    staticObjects(...objects) {
        let array = [];
        return array.concat(...objects);
    }

    staticObjectsArray(...objects) {
        let array = [];
        for(let obj of objects) {
            obj.forEach( (el) => {
                array.push([
                    el.position.x[0] + el.offset.x,
                    el.position.x[1] - el.offset.x,
                    el.position.y[0] + el.offset.y,
                    el.position.y[1],
                    el.position.z[0],
                    el.position.z[1] + el.offset.z,
                    el.type
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

class Rect {
    constructor(
            x, y, depth, width, height, src,
            offsetX = null, offsetY = null, offsetZ = null
        ) {
        this.type = this.constructor.name;
        this.CANVAS = new Canvas;
        this.ctx = this.CANVAS.fgCtx;
        this.width = width;
        this.height = height;
        this.depth = depth;
        this.src = '/sprites/' + src;
        this.position = {
            x: [x, x + this.width],
            y: [y, y + this.height],
            z: [(y + this.height) - depth, y + this.height]
        };
        this.offset = {
            x: offsetX,
            y: offsetY,
            z: offsetZ,
        }
    };

    collisionRect() {
        const { x, y, z } = this.position;
        const { ctx, width, height, depth, offset } = this;
        ctx.beginPath();
        ctx.rect(x[0], y[0], width, height);
        ctx.rect(x[0] + offset.x, z[0], width - offset.x * 2, depth);
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
    constructor(
            x, y, direction, parts, depth, sWidth, sHeight,
            src, offsetX = null, offsetY = null, offsetZ = null
        ) {
        super();
        this.type = this.constructor.name;
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
        this.offset = {
            x: offsetX,
            y: offsetY,
            z: offsetZ,
        }
    };

    calculatePosition() {
        const { direction, width, height, depth } = this;

        switch(direction.toLowerCase()) {
            case 'horizontal':
                return {
                    x: [x, x + width],
                    y: [y, y + height],
                    z: [(y + height) - depth, y + height]
                }

            case 'vertical':
                return {
                    x: [x, x + width],
                    y: [y + 48, y + height],
                    z: [(y + height) - depth, y + height]
                }

            default: break;
        }
    }

    calculateDimensions(direction) {
        const { sWidth, sHeight, parts } = this;
        let width, height;

        switch(direction.toLowerCase()) {
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

        switch(direction.toLowerCase()) {
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