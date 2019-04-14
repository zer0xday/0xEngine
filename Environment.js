class Hero extends Rect {
    constructor(x, y, depth, width, height, src) {
        super(x, y, depth, width, height, src);
        this.state = { stand: true, moving: false };
        this.direction = {
            right: false,
            left: false,
            bottom: false,
            top: false
        };
        this.shooting = false;
        this.velocity = 2;
        this.collision = {
            right: false,
            left: false,
            bottom: false,
            top: false
        };
        this.frame = 0,
        this.sprite = {
            direction: 2, // lets start with sprite directed to the bottom
            frame: 0
        };

        this.MOVEMENT = new Movement(this);
        this.PHYSICS = new Physics(this);
    };

    collisionCheck() {
        this.MOVEMENT.predictMove();
        this.PHYSICS.collisionDetection();
        this.MOVEMENT.move();
    }

    animateSprite() {
        let {
            src, ctx,
            position,
            width, height
        } = this;
        let img = new Image();
        img.src = src;

        const sprite = {
            sH: height, // height
            sW: width,  // width
            sX: width,  // pos x
            sY: height, // pos y
        };

        const { sH, sW, sX, sY } = sprite;

        // directions
        const { top, left, right, bottom } = this.direction;

        if(top) {
            this.sprite.direction = 0;
        } else if(left) {
            this.sprite.direction = 1;
        } else if(bottom) {
            this.sprite.direction = 2;
        } else if(right) {
            this.sprite.direction = 3;
        }

        // animate sprites
        const { stand } = this.state;
        if(!stand) {
            if(this.frame % 5 === 0) {
                if(this.sprite.frame > 6) {
                    this.sprite.frame = 0;
                }
                this.sprite.frame++;
            }
        } else {
            this.sprite.frame = 0;
        }

        // draw sprite
        const { frame, direction } = this.sprite;

        ctx.drawImage(
            img,
            sX * frame, sY * direction,
            sW, sH,
            position.x[0], position.y[0],
            width, height
        );
    };

    shotsFired() {
        const { shooting } = this;
        if(shooting) {
            const projectile = new Projectile(this);
            projectile.fire();
        }
    };

    draw() {
        this.frame++;
        this.collisionCheck();
        this.animateSprite();
        this.shotsFired();
        this.collisionRect();
    }
}

class Enemy extends Hero {
    constructor(x, y, depth, width, height, src) {
        super(x, y, depth, width, height, src);
    }

    moveBot() {
        this.MOVEMENT.moveAI();
    }

    draw() {
        this.frame++;
        this.collisionCheck();
        this.moveBot();
        this.animateSprite();
        this.collisionRect();
    }
}


class Projectile {
    constructor(owner) {
        this.CANVAS = new Canvas;
        this.ctx = this.CANVAS.fgCtx;
        this.owner = owner;
        this.active = owner.shooting;
        this.velocity = 10;
        this.position = {
            x: [this.owner.position.x[0], this.owner.position.x[1]],
            y: [this.owner.position.y[0], this.owner.position.y[1]]
        };
        this.direction = owner.direction;
    };

    create() {
        this.ctx.fillStyle = "#FF0000";
        this.ctx.beginPath();

        const { top, right, bottom, left } = this.direction;
        const { x, y } = this.position;
        if(top) {
            this.ctx.arc( (x[0] + x[1]) / 2, y[0], 10, 0, 2 * Math.PI);
        } else if(left) {
            this.ctx.arc( x[0], (y[0] + y[1]) / 2, 10, 0, 2 * Math.PI);
        } else if(bottom) {
            this.ctx.arc( (x[0] + x[1]) / 2, y[1], 10, 0, 2 * Math.PI);
        } else if(right) {
            this.ctx.arc( x[1], (y[0] + y[1]) / 2, 10, 0, 2 * Math.PI);
        }

        this.ctx.fill();
    }

    fire() {
        this.create();
    }
};