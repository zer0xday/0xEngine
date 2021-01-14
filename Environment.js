class Hero extends Rect {
    constructor(x, y, depth, width, height, src) {
        super(x, y, depth, width, height, src);
        this.state = {stand: true, moving: false};
        this.direction = {
            right: false,
            left: false,
            bottom: true,
            top: false
        };
        this.shooting = true;
        this.velocity = 2;
        this.collision = {
            right: false,
            left: false,
            bottom: false,
            top: false
        };
        this.frame = 0;
        this.sprite = {
            direction: 2, // lets start with sprite directed to the bottom
            frame: 0
        };

        this.MOVEMENT = new Movement(this);
        this.PHYSICS = new Physics(this);
        this.PROJECTILE = new Projectile(this);
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

        const {sH, sW, sX, sY} = sprite;

        // directions
        const {top, left, right, bottom} = this.direction;

        if (top) {
            this.sprite.direction = 0;
        } else if (left) {
            this.sprite.direction = 1;
        } else if (bottom) {
            this.sprite.direction = 2;
        } else if (right) {
            this.sprite.direction = 3;
        }

        // animate sprites
        const {stand} = this.state;
        if (!stand) {
            if (this.frame % 5 === 0) {
                if (this.sprite.frame > 6) {
                    this.sprite.frame = 0;
                }
                this.sprite.frame++;
            }
        } else {
            this.sprite.frame = 0;
        }

        // draw sprite
        const {frame, direction} = this.sprite;

        ctx.drawImage(
            img,
            sX * frame, sY * direction,
            sW, sH,
            position.x[0], position.y[0],
            width, height
        );
    };

    shotsFired() {
        if (this.shooting) {
            this.PROJECTILE.fire();
        }

        this.PROJECTILE.updatePositions();
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
    }

    draw() {
        this.frame++;
        this.collisionCheck();
        // this.moveBot();
        this.animateSprite();
        this.collisionRect();
    }
}

class Projectile {
    constructor(owner) {
        this.CANVAS = new Canvas;
        this.ctx = this.CANVAS.fgCtx;
        this.owner = owner;
        this.velocity = 3.5;
        this.objects = [];
        this.delay = 200; // ms
        this.lifeTime = 3000; // ms
        this.nextFireTime = null;
    };

    create() {
        this.nextFireTime = this.getNextFireTime();
        const direction = this.owner.direction;
        const startPosition = {
            x: [this.owner.position.x[0], this.owner.position.x[1]],
            y: [this.owner.position.y[0], this.owner.position.y[1]]
        };

        this.setPositionByDirection(direction, startPosition);

        this.objects.push({
            startPosition,
            direction,
            finishAt: this.getFinishedAt()
        });
    }

    getNextFireTime() {
        return performance.now() + this.delay;
    }

    getFinishedAt() {
        return performance.now() + this.lifeTime;
    }

    setPositionByDirection(direction, position) {
        if (direction.top) {
            this.fillCtxArea(this.getCenteredPosition(position.x), position.y[0]);
        } else if (direction.left) {
            this.fillCtxArea(position.x[0], this.getCenteredPosition(position.y));
        } else if (direction.bottom) {
            this.fillCtxArea(this.getCenteredPosition(position.x), position.y[1]);
        } else if (direction.right) {
            this.fillCtxArea(position.x[1], this.getCenteredPosition(position.y));
        }
    }

    fillCtxArea(x, y, radius = 5, startAngle = 0, endAngle = 2 * Math.PI) {
        this.ctx.fillStyle = "#FF0000";
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, startAngle, endAngle);
        this.ctx.fill();
    }

    getCenteredPosition(position) {
        return (position[0] + position[1]) / 2;
    }

    canBeFiredAgain() {
        return performance.now() > this.nextFireTime;
    }

    projectileFinished(finishTime) {
        return performance.now() > finishTime;
    }

    updatePositions() {
        this.objects.forEach((projectile) => {
            if (this.projectileFinished(projectile.finishAt)) {
                return this.objects.shift();
            }

            if (projectile.direction.left) {
                projectile.startPosition.x[0] -= this.velocity;
                projectile.startPosition.x[1] -= this.velocity;
            } else if (projectile.direction.right) {
                projectile.startPosition.x[0] += this.velocity;
                projectile.startPosition.x[1] += this.velocity;
            } else if (projectile.direction.bottom) {
                projectile.startPosition.y[0] += this.velocity;
                projectile.startPosition.y[1] += this.velocity;
            } else if (projectile.direction.top) {
                projectile.startPosition.y[0] -= this.velocity;
                projectile.startPosition.y[1] -= this.velocity;
            }

            this.fillCtxArea(
                this.getCenteredPosition(projectile.startPosition.x),
                this.getCenteredPosition(projectile.startPosition.y)
            );
        });
    }

    fire() {
        if (this.canBeFiredAgain()) {
            this.create();
        }
    }
}