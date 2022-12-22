import { SpriteRenderer } from "./sprite-renderer";

export class Sprite {
    image: HTMLImageElement = null;

    constructor(src: string) {
        this.image = new Image();
        this.image.src = `./assets/${src}.png`;
    }
}