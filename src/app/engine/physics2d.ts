import { BoxCollider } from "./box-collider";
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

    static overlapBox(position: Vector2, size: Vector2): BoxCollider[] {
        let x = position.x;
        let y = position.y;
        let w = size.x;
        let h = size.y;
        let colliderList: BoxCollider[] = []

        Canvas._colliderList.forEach(collider => {
            // Get the top left corner coordinates of the box
            let l1 = new Vector2((x - .5) - (w / 2), (y - .5) + (h / 2));
            let r1 = new Vector2((x - .5) + (w / 2), (y - .5) - (h / 2));

            // Get the bottom right coordinates of the box
            let l2 = new Vector2((collider.position.x - .5) - (collider.scale.x / 2), (collider.position.y - .5) + (collider.scale.y / 2));
            let r2 = new Vector2((collider.position.x - .5) + (collider.scale.x / 2), (collider.position.y - .5) - (collider.scale.y / 2));

            // if rectangle has area 0, no overlap
            if ((l1.x == r1.x || l1.y == r1.y || r2.x == l2.x || l2.y == r2.y)) {
                return;
            }

            // If one rectangle is on left side of other
            if (l1.x > r2.x || l2.x > r1.x) {
                return;
            }

            // If one rectangle is above the other
            if (r1.y > l2.y || r2.y > l1.y) {
                return;
            }

            colliderList.push(collider)
        });
        return colliderList;
    }

    static overlapCircle() {

    }
}