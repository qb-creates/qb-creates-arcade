export class SpriteSheet {
    image: HTMLImageElement = null;
    sX: number = 0;
    sY: number = 0;
    sW: number = 0;
    sH: number = 0;

    constructor(src: string, sW, sH) {
        this.image = new Image();
        this.image.src = `./assets/${src}.png`;
        this.sW = sW;
        this.sH = sH;
    }
}