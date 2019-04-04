const Canvas = {
    element: document.getElementById('canvas'),
    resolution: {
        width: 640,
        height: 480
    },
    floor: {
        heightPX: 100,
        height() {
            return Canvas.resolution.height - this.heightPX;
        },
        width() {
            return Canvas.resolution.width;
        }
    },
    offset: 15,
    ctx() {
        return this.element.getContext('2d');
    },
};

class Engine {
    constructor() {
        this.ctx = Canvas.ctx();
        // this.floor = new Rect(0, Canvas.floor.height(), Canvas.floor.width(), Canvas.floor.heightPX, 'rgb(95,205, 0)');
        this.hero = new Hero(300, 150, 80, 80, 'hero-sprite.png');  // hero
        this.objects = [    // start X, start Y, object WIDTH, object HEIGHT, object COLOR
            new Rect(0, 0, 50, 50, 'wall.png'),
        ];
        this.CollisionWALL = this.collisionStaticWallArray();
    };

    collisionStaticWallArray() {
        let walls = [];
        for(let i = 0; i < this.objects.length; i++) {
            walls.push([
                this.objects[i].position.x[0],
                this.objects[i].position.x[1],
                this.objects[i].position.y[0],
                this.objects[i].position.y[1],
                this.objects[i].width,
                this.objects[i].height
            ]);
        }
        return walls;
    }

    update() {
        this.ctx.clearRect(0, 0, Canvas.resolution.width, Canvas.resolution.height);
    }

    drawings() {
        // draw objects
        for(let obj of this.objects) {
            obj.draw();
        }
        // draw hero
        this.hero.draw();
    }

    render = () => {
        this.update();
        this.drawings();
        requestAnimationFrame(this.render);
    };

    init() {
        console.log('initialized engine');
        this.render();
    };
};

