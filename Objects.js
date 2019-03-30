class Rect {
    constructor(x, y, width, height, color) {
        this.ctx = Canvas.ctx();
        this.width = width;
        this.height = height;
        this.color = color;
        this.position = {
            x: [x, x + width],
            y: [y, y + height]
        };
        this.PHYSICS = new Physics(this);
    };

    screenCollision() {
        return {
            bottom: Canvas.resolution.height - (this.position.y[0] + this.height)
        }
    };

    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.position.x[0], this.position.y[0], this.width, this.height);
    }
};

class Hero extends Rect{
    constructor(x, y, width, height, color) {
        super(x, y, width, height, color);
        this.state = { stand: true, moving: false, jumping: false };
        this.direction = {};
        this.moving = false;
        this.velocity = 5;
        this.jumpVelocity = 20;
        this.acceleration = .5;
        this.collision = {};

        this.MOVEMENT = new Movement(this);
        this.PHYSICS = new Physics(this);
    };

    collisionCheck() {
        this.MOVEMENT.predictMove();
        this.PHYSICS.objectCollision();
        this.MOVEMENT.move();
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