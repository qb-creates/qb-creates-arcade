import { Canvas } from "./canvas";
import { Vector2 } from "./vector2";

/**
 * Debug class that has tools to help debug the game while it is running.
 */
export abstract class Debug {

    /**
     * Draws a line from the origin in the specified direction and at the specified distance.
     * @param origin - The Point in 2D space where the ray originates.
     * @param direction - A vector representing the direction of the ray.
     * @param distance - The maximium distance over which to cast the ray.
     * @param color - The color of the ray.
     */
    static drawRay(origin: Vector2, direction: Vector2, distance: number, color: string) {
        let targetVector = Vector2.add(Vector2.multiply(direction.normalize(), distance), origin);

        Canvas.context.strokeStyle = color;
        Canvas.context.lineWidth = 1;
        Canvas.context.beginPath();
        Canvas.context.moveTo((origin.x * Canvas.ppu), (-1 * origin.y * Canvas.ppu));
        Canvas.context.lineTo((targetVector.x * Canvas.ppu), (-1 * targetVector.y * Canvas.ppu));
        Canvas.context.stroke();
    }
}