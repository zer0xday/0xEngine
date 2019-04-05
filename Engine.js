class Engine {
    constructor() {
        this.ctx = Canvas.ctx();
        this.MAP = new Map;
        this.staticObjects = this.MAP.staticObjects;
        this.HERO = this.MAP.hero;
    };

    update() {
        this.ctx.clearRect(0, 0, Canvas.resolution.width, Canvas.resolution.height);
    }

    drawings() {
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

