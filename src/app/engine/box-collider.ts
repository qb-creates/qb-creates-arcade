import { ComponentObject, ObjectBase } from "./q-object";
import { Canvas, Component, GameObject, Vector2 } from "./qbcreates-js-engine";

export class BoxCollider extends Component {
    public position: Vector2 = new Vector2(0, 0);
    public scale: Vector2 = new Vector2(1, 1);
    private _render = null;
    private _collisionList = new Map();
    private _previousListCount: number = 0;

    public get render() {
        return this._render;
    }

    public get collisionList() {
        return new Map(this._collisionList);
    }

    constructor(gameObject: GameObject) {
        super(gameObject)
        this.position = new Vector2(gameObject.transform.position.x, gameObject.transform.position.y);
        this.scale = new Vector2(gameObject.transform.scale.x, gameObject.transform.scale.y);
        this._render = () => {
            this.onRender(this.position.x, this.position.y, this.scale);
        };
    }

    /**
     * The collider will determine if it overlaps with the input collider. R
     * @param {BoxCollider} collider - The collider we want to check for overlap with.
     * @returns {boolean} Returns true if the colliders overlap.
     */
    checkForCollision(collider: BoxCollider) {
        this._previousListCount = this._collisionList.size;

        // Get the top left corner coordinates of the box
        let l1 = new Vector2((this.position.x - .5) - (this.scale.x / 2), (this.position.y - .5) + (this.scale.y / 2));
        let r1 = new Vector2((this.position.x - .5) + (this.scale.x / 2), (this.position.y - .5) - (this.scale.y / 2));

        // Get the bottom right coordinates of the box
        let l2 = new Vector2((collider.position.x - .5) - (collider.scale.x / 2), (collider.position.y - .5) + (collider.scale.y / 2));
        let r2 = new Vector2((collider.position.x - .5) + (collider.scale.x / 2), (collider.position.y - .5) - (collider.scale.y / 2));

        // if rectangle has area 0, no overlap
        if ((l1.x == r1.x || l1.y == r1.y || r2.x == l2.x || l2.y == r2.y)) {
            if (this._collisionList.has(collider.metaData)) {
                this._collisionList.delete(collider.metaData);
            }
            return false;
        }

        // If one rectangle is on left side of other
        if (l1.x > r2.x || l2.x > r1.x) {
            if (this._collisionList.has(collider.metaData)) {
                this._collisionList.delete(collider.metaData);
            }
            return false;
        }

        // If one rectangle is above the other
        if (r1.y > l2.y || r2.y > l1.y) {
            if (this._collisionList.has(collider.metaData)) {
                this._collisionList.delete(collider.metaData);
            }
            return false;
        }

        if (!this._collisionList.has(collider.metaData)) {
            this._collisionList.set(collider.metaData, collider);
        }
        return true;
    }

    private onRender(x: number, y: number, scale: Vector2) {
        let w = Canvas.ppu * scale.x;
        let h = Canvas.ppu * scale.y;

        x = (Canvas.ppu * x) + ((Canvas.ppu - w) / 2);
        y = -1 * (Canvas.ppu * y) + ((Canvas.ppu - h) / 2);
        Canvas.context.lineWidth = 2;
        Canvas.context.strokeStyle = 'green';
        Canvas.context.beginPath();
        Canvas.context.roundRect(x - (Canvas.ppu / 2), y - (Canvas.ppu / 2), w, h);
        Canvas.context.stroke();
        Canvas.context.lineWidth = 1;
    }
}

export class BoxColliderObject extends ObjectBase {
    private _position: Vector2 = new Vector2(0, 0);
    private _scale: Vector2 = new Vector2(0, 0);

    constructor(position: Vector2, scale: Vector2) {
        super();
        this._position = position;
        this._scale = scale;
    }

    public returnInterface(): ComponentObject {
        let boxCollider: ComponentObject = {
            component: BoxCollider,
            properties: {
                position: this._position,
                scale: this._scale
            }
        }

        return boxCollider;
    }
}

// Circle collision Test
// let n = 25;
// let w = 1;
// let h = 1;
// let x = 0;
// let y = 0;
// Canvas.context.fillRect(x - (w/2), y - (h/2), w, h);
// // collider 1
// Canvas.context.beginPath();
// Canvas.context.strokeStyle = 'green';
// Canvas.context.moveTo((2 - .5) * n, (0 - .5) * n);
// Canvas.context.lineTo((2 - .5) * n, (1 - .5)* n);
// Canvas.context.lineTo((3 - .5) * n, (1 - .5)* n);
// Canvas.context.lineTo((3 - .5) * n, (0 - .5)* n);
// Canvas.context.lineTo((2 - .5)  * n,( 0 -.5)* n);
// Canvas.context.stroke();

// Canvas.context.beginPath();
// Canvas.context.strokeStyle = 'green';
// Canvas.context.moveTo((0 - .5) * n, (0 - .5) * n);
// Canvas.context.lineTo((0 - .5) * n, (1 - .5)* n);
// Canvas.context.lineTo((1 - .5) * n, (1 - .5)* n);
// Canvas.context.lineTo((1 - .5) * n, (0 - .5)* n);
// Canvas.context.lineTo((0 - .5)  * n,( 0 -.5)* n);
// Canvas.context.stroke();


// let n = 25;
// let w = 1;
// let h = 1;
// let x = 0;
// let y = 0;
// Canvas.context.fillRect(x - (w/2), y - (h/2), w, h);
// // collider 1
// Canvas.context.beginPath();
// Canvas.context.strokeStyle = 'green';
// Canvas.context.moveTo((1.914 - .5) * n, (1.2065- .5) * n);
// Canvas.context.lineTo((1.207 - .5) * n, (1.913 - .5)* n);
// Canvas.context.lineTo((1.915 - .5) * n, (2.620 - .5)* n);
// Canvas.context.lineTo((2.621 - .5) * n, (1.913 - .5)* n);
// Canvas.context.lineTo((1.914 - .5)  * n,( 1.2065 -.5)* n);
// Canvas.context.stroke();