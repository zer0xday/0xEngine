class Rect {
    constructor(x, y, width, height, color, physicsOn = false) {
        this.ctx = Canvas.ctx();
        this.width = width;
        this.height = height;
        this.color = color;
        this.position = {
            x: [x, x + width],
            y: [y, y + height]
        };
        this.physicsOn = physicsOn;

        this.PHYSICS = new Physics(this);
    };

    screenCollision() {
        return {
            bottom: Canvas.resolution.height - (this.position.y[0] + this.height)
        }
    };

    draw() {
        if(this.physicsOn) this.PHYSICS.init();

        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.position.x[0], this.position.y[0], this.width, this.height);
    }
};

class Hero {
    constructor(x, y, width, height, color) {
        this.ctx = Canvas.ctx();
        this.width = width;
        this.height = height;
        this.color = color;
        this.position = {
            x: [x, x + width],
            y: [y, y + height]
        };
        this.state = null;
        this.direction = null;
        this.moving = false;
        this.velocity = 2;
        this.jump = 9;
        this.acceleration = .5;

        this.MOVEMENT = new Movement(this);
        this.PHYSICS = new Physics(this);
    };

    screenCollision() {
        return {
            top: this.position.y[0],
            right: Canvas.resolution.width - (this.position.x[0] + this.width),
            bottom: Canvas.resolution.height - (this.position.y[0] + this.height),
            left: this.position.x[0]
        };
    };

    animate() {
        this.PHYSICS.init();
        this.MOVEMENT.init();
    }

    draw() {
        this.animate();

        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.position.x[0], this.position.y[0], this.width, this.height);
    }
}

class Rect2 extends Rect {
    constructor() {
        super();
    }
}