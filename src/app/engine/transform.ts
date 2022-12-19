import { Vector2, Component, BoxCollider, GameObject } from "./qbcreates-js-engine";

export class Transform extends Component {
    private _position: Vector2 = new Vector2(0, 0);
    private _scale: Vector2 = new Vector2(1, 1);

    get position() {
        return this._position;
    }

    set position(value: Vector2) {
        // Calculates the change in position and applies the difference to all attached colliders and children.
        let distanceMoved = Vector2.subtract(value, this._position);

        this.gameObject.getComponents(BoxCollider).forEach(collider => {
            collider.position = Vector2.add(distanceMoved, collider.position);
        });

        this.gameObject.children.forEach(child => {
            child.transform.position = Vector2.add(distanceMoved, child.transform.position);
        });
        this._position = value;
    }

    get scale() {
        return this._scale;
    }

    set scale(value: Vector2) {
        // Calculates the change in scale and applies the difference to all attached colliders and children.
        let scaleDifference = Vector2.subtract(value, this._scale);

        this.gameObject.getComponents(BoxCollider).forEach(collider => {
            collider.scale = Vector2.add(scaleDifference, collider.scale);
        });

        this.gameObject.children.forEach(child => {
            child.transform.scale = Vector2.add(scaleDifference, child.transform.scale);
        });
        this._scale = value;
    }

    constructor(gameObject: GameObject) {
        super(gameObject);
    }
}