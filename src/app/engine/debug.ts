import { Canvas } from "./canvas";
import { Vector2 } from "./vector2";

export abstract class Debug {

    /**
     * 
     * @param origin 
     * @param direction 
     * @param distance 
     * @param color 
     */
    static drawRay(origin: Vector2, direction: Vector2, distance: number, color: string) {
        let targetVector = Vector2.add(Vector2.multiply(direction.normalize(), distance), origin);

        Canvas.context.strokeStyle = color;
        Canvas.context.beginPath();
        Canvas.context.moveTo((origin.x * Canvas.ppu), (-1 * origin.y * Canvas.ppu));
        Canvas.context.lineTo((targetVector.x * Canvas.ppu), (-1 * targetVector.y * Canvas.ppu));
        Canvas.context.stroke();
    }
}