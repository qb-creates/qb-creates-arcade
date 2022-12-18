import { Canvas } from "./canvas";
import { Vector2 } from "./vector2";

export class Physics2d {
    static rayCast(origin, direction) {
        let directionNormalized = direction.normalize();
        let length = direction.magnitude;
        let newLocation = Vector2.add(Vector2.multiply(directionNormalized, length), origin);
        Canvas.context.strokeStyle = "#FF0000";
        Canvas.context.beginPath();
        Canvas.context.moveTo(origin.x * Canvas.ppu, origin.y * Canvas.ppu);
        Canvas.context.lineTo(newLocation.x * Canvas.ppu, newLocation.y * Canvas.ppu);
        Canvas.context.stroke();
    }

    static overlapBox() {

    }

    static overlapCircle() {

    }
}