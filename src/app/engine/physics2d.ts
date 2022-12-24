import { BoxCollider } from "./box-collider";
import { Canvas } from "./canvas";
import { Vector2 } from "./vector2";

export class Physics2d {
    /**
     * Casts a ray against Colliders in the Scene
     * @param origin - The Point in 2D space where the ray originates.
     * @param direction - A vector representing the direction of the ray.
     * @param distance - The maximium distance over which to cast the ray.
     * @returns - The list of colliders is returned.
     */
    static rayCast(origin: Vector2, direction: Vector2, distance: number) {
        let destination = Vector2.add(Vector2.multiply(direction.normalize(), distance), origin);
        let destinationOffset = new Vector2(destination.x - .5, destination.y - .5);
        let originOffset = new Vector2(origin.x - .5, origin.y - .5);
        let directionOffset = Vector2.subtract(destinationOffset, originOffset);
        let colliderList: BoxCollider[] = []

        Canvas._colliderList.forEach(collider => {
            // Get the top Left and bottom right coordinates of the box
            let topLeftCorner = new Vector2((collider.position.x - .5) - (collider.scale.x / 2), (collider.position.y - .5) + (collider.scale.y / 2));
            let bottomRightCorner = new Vector2((collider.position.x - .5) + (collider.scale.x / 2), (collider.position.y - .5) - (collider.scale.y / 2));

            // Get the percentage of the vector magnitude where it makes contact with the top, bottom, left, and right of the box collider.
            let contactPercentage = Infinity;
            let pY1 = (bottomRightCorner.y - originOffset.y) / (destinationOffset.y - originOffset.y);
            let pY2 = (topLeftCorner.y - originOffset.y) / (destinationOffset.y - originOffset.y);
            let pX1 = (topLeftCorner.x - originOffset.x) / (destinationOffset.x - originOffset.x);
            let pX2 = (bottomRightCorner.x - originOffset.x) / (destinationOffset.x - originOffset.x);

            if ((pX1 >= Math.min(pY1, pY2) && pX1 <= Math.max(pY1, pY2))) {
                contactPercentage = pX1;
            }

            if ((pX2 >= Math.min(pY1, pY2) && pX2 <= Math.max(pY1, pY2))) {
                contactPercentage = Math.min(pX2, contactPercentage);
            }

            if ((pY1 >= Math.min(pX1, pX2) && pY1 <= Math.max(pX1, pX2))) {
                contactPercentage = Math.min(pY1, contactPercentage);
            }

            if ((pY2 >= Math.min(pX1, pX2) && pY2 <= Math.max(pX1, pX2))) {
                contactPercentage = Math.min(pY2, contactPercentage);
            }

            if (contactPercentage != Infinity && contactPercentage >= 0) {
                let contactPointDirection = Vector2.multiply(directionOffset, contactPercentage);
                let contactPoint = Vector2.add(originOffset, contactPointDirection);
                let distanceToContactPoint = Vector2.subtract(contactPoint, originOffset).magnitude;

                if (distanceToContactPoint <= Vector2.subtract(destinationOffset, originOffset).magnitude) {
                    colliderList.push(collider);
                }
            }
        });
        return colliderList;
    }

    /**
     * Checks if a collider falls within a box area.
     * @param position - Position of the Box 
     * @param size - Size of the box
     * @returns - Returns an array of all the colliders that falls within the box area.
     */
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