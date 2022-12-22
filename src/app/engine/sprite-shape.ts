import { Canvas } from "./canvas";
import { SpriteRenderer } from "./sprite-renderer";
import { Vector2 } from "./vector2";

export interface SpriteShape {
    drawShape(renderer: SpriteRenderer);
}

export let squareSprite: SpriteShape = {
    drawShape: function (renderer: SpriteRenderer) {

        let color: string = renderer.color;
        let borderColor: string = renderer.color
        let scale: Vector2 = renderer.transform.scale;

        let w = Canvas.ppu * scale.x;
        let h = Canvas.ppu * scale.y;

        let x = Canvas.ppu * (renderer.transform.position.x - 0.5);
        let y = -Canvas.ppu * (renderer.transform.position.y + 0.5);

        x = x + (Canvas.ppu - w) / 2;
        y = y + (Canvas.ppu - h) / 2;
        
        Canvas.context.fillStyle = color;
        Canvas.context.strokeStyle = borderColor;
        Canvas.context.beginPath();
        Canvas.context.roundRect(x, y, w, h, 5);
        Canvas.context.stroke();
        Canvas.context.fill();
    }
}