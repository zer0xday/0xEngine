class Canvas {
    constructor() {
        this.area = document.querySelector('canvas#area');
        this.background = document.querySelector('canvas#background');
        this.foreground = document.querySelector('canvas#foreground');
        this.resolution = {
            width: this.area.width,
            height: this.area.height
        },
        this.areaCtx = this.area.getContext('2d');
        this.bgCtx = this.background.getContext('2d');
        this.fgCtx = this.foreground.getContext('2d');
    }
}
