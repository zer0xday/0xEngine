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
