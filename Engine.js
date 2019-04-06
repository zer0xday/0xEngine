class Engine {
    constructor() {
        this.CANVAS = new Canvas;
        this.ctx = {
            area: this.CANVAS.areaCtx,
            background: this.CANVAS.bgCtx,
            foreground: this.CANVAS.fgCtx
        }
        this.MAP = new Map;
        this.GROUND = this.MAP.ground;
        this.staticObjects = this.MAP.staticObjects;
        this.HERO = this.MAP.hero;
    };

    update() {
        const { width, height } = this.CANVAS.resolution;
        for(let i in this.ctx) {
            this.ctx[i].clearRect(0, 0, width, height);
        }
        // this.ctx.clearRect(0, 0, width, height);
    }

    drawings() {
        this.GROUND.draw();
        // draw objects
        for(let obj of this.staticObjects) {
            obj.draw();
        }
        // draw hero
        this.HERO.draw();
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

