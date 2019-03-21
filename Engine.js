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
        this.objects = [    // start X, start Y, object WIDTH, object HEIGHT, object COLOR
            // new Rect(0, Canvas.floor.height(), Canvas.floor.width(), Canvas.floor.heightPX, 'rgb(95,205, 0)'),
            new Rect(300, Canvas.floor.height() - 250, 50, 150, 'rgb(0, 0, 255)'),
            new Hero(0, 0, 80, 80, 'rgb(255, 0, 0)'),  // hero
        ];
        this.frame = 0;
        this.WALL = [];
    };

    drawWalls(wall) {
        let phys = new Physics(this.objects);
        phys.objectCollision(wall);
    }

    drawObjects() {
        this.WALL = [];
        // lets automate some drawings
        for(let i = 0; i < this.objects.length; i++) {
            this.objects[i].draw();
            this.WALL.push([
                this.objects[i].position.x[0],
                this.objects[i].position.x[1],
                this.objects[i].position.y[0],
                this.objects[i].position.y[1],
                this.objects[i].width,
                this.objects[i].height
            ]);
        }
        this.drawWalls(this.WALL);
    }

    update() {
        this.ctx.clearRect(0, 0, Canvas.resolution.width, Canvas.resolution.height);
    }

    render = () => {
        this.update();
        this.drawObjects();
        requestAnimationFrame(this.render);
    };

    init() {
        console.log('initialized engine');
        this.render();
    };
};

