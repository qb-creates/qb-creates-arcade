import { Canvas } from "./canvas";
import { SpriteRenderer } from "./sprite-renderer";
import { Vector2 } from "./vector2";

export interface SpriteShape {
    drawShape(renderer: SpriteRenderer);
}

export let squareSprite: SpriteShape = {
    drawShape: function (renderer: SpriteRenderer) {
        let x: number = renderer.transform.position.x;
        let y: number = renderer.transform.position.y;
        let color: string = renderer.color;
        let borderColor: string = renderer.color
        let scale: Vector2 = renderer.transform.scale;
    
        let w = Canvas.ppu * scale.x;
        let h = Canvas.ppu * scale.y;
        
        x = (Canvas.ppu * x) + ((Canvas.ppu - w) / 2);
        y = -1 * (Canvas.ppu * y) + ((Canvas.ppu - h) / 2);
    
        Canvas.context.fillStyle = color;
        Canvas.context.strokeStyle = borderColor;
        Canvas.context.beginPath();
        Canvas.context.roundRect(x - (Canvas.ppu / 2), y - (Canvas.ppu / 2), w, h, 5);
        Canvas.context.stroke();
        Canvas.context.fill();
    }
}