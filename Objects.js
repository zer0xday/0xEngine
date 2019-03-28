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

class Hero extends Rect{
    constructor(x, y, width, height, color) {
        super(x, y, width, height, color, true);
        this.state = { stand: true, moving: false, jumping: false };
        this.direction = {};
        this.moving = false;
        this.velocity = 5;
        this.jumpVelocity = (width + height) / 2;
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

    collisionCheck() {
        this.MOVEMENT.predictMove();
        if(!this.PHYSICS.objectCollision()) this.MOVEMENT.move();
    }

    animate() {
        this.collisionCheck();
        this.PHYSICS.gravity();
    }

    draw() {
        this.animate();

        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.position.x[0], this.position.y[0], this.width, this.height);
    }
}