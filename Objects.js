class Rect {
    constructor(x, y, width, height, src) {
        this.ctx = Canvas.ctx();
        this.width = width;
        this.height = height;
        this.src = '/sprites/' + src;
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
        let img = new Image();
        img.src = this.src;

        this.ctx.drawImage(img, this.position.x[0], this.position.y[0], this.width, this.height);
    }
};

class Hero extends Rect{
    constructor(x, y, width, height, color) {
        super(x, y, width, height, color);
        this.state = { stand: true, moving: false };
        this.direction = {};
        this.shooting = false;
        this.moving = false;
        this.velocity = 5;
        this.jumpVelocity = this.velocity * 2;
        this.acceleration = .5;
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
        this.PHYSICS.objectCollision();
        this.MOVEMENT.move();
    }

    animateSprite() {
        let {
            src, ctx,
            direction, position,
            width, height
        } = this;
        let img = new Image();
        img.src = src;

        const sprite = {
            sH: 64, // height
            sW: 64, // width
            sX: 64, // pos x
            sY: 64, // pos y
        };

        const { sH, sW, sX, sY } = sprite;

        if('top' in direction) {
            this.sprite.direction = 0;
        } else if('left' in direction) {
            this.sprite.direction = 1;
        } else if('bottom' in direction) {
            this.sprite.direction = 2;
        } else if('right' in direction) {
            this.sprite.direction = 3;
        }

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

        ctx.drawImage(
            img,
            sX * this.sprite.frame, sY * this.sprite.direction,
            sW, sH,
            position.x[0], position.y[0],
            width, height
        );
    };

    createProjectile() {
        const { shooting, ctx, position, direction } = this;

        if(shooting) {  // it has to be depended on direction *TODO*
            ctx.fillStyle = "#FF0000";
            ctx.beginPath();

            if('top' in direction) {
                ctx.arc((position.x[0] + position.x[1]) / 2, position.y[0], 10, 0, 2 * Math.PI);
            } else if('left' in direction) {
                ctx.arc(position.x[0], (position.y[0] + position.y[1]) / 2, 10, 0, 2 * Math.PI);
            } else if('bottom' in direction) {
                ctx.arc((position.x[0] + position.x[1]) / 2, position.y[1], 10, 0, 2 * Math.PI);
            } else if('right' in direction) {
                ctx.arc(position.x[1], (position.y[0] + position.y[1]) / 2, 10, 0, 2 * Math.PI);
            }
            // direction cannot be null all the time if not moving
            console.log(direction);

            ctx.fill();
        }
    };

    animateProjectile() {
        this.createProjectile();
    }

    draw() {
        this.frame++;
        this.collisionCheck();
        this.animateSprite();
        this.animateProjectile();
    }
}