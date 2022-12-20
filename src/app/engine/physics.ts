import { Canvas } from "./canvas";
import { Vector2 } from "./vector2";

export class Physics2d {
    static rayCast(origin: Vector2, direction: Vector2, distance: number) {
        let newLocation = Vector2.add(Vector2.multiply(direction.normalize(), distance), origin);

        Canvas.context.strokeStyle = "#FF0000";
        Canvas.context.beginPath();
        Canvas.context.moveTo((origin.x * Canvas.ppu), (-1 * origin.y * Canvas.ppu));
        Canvas.context.lineTo((newLocation.x * Canvas.ppu), (-1 * newLocation.y * Canvas.ppu));
        Canvas.context.stroke();
    }

    static overlapBox() {

    }

    static overlapCircle() {

    }
}