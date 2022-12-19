import { MonoBehaviour, Canvas, Time, Input, KeyCode, QObject, Vector2 } from "../../../engine/qbcreates-js-engine";

export class SnakeSize extends MonoBehaviour {
    private _isGrowing: boolean = false;
    private _isGrowingTimer: number = 0;

    get isGrowing() {
        return this._isGrowing;
    }

    awake() {
    }

    start() {
    }

    update() {
        if (this._isGrowingTimer > 0) {
            this._isGrowingTimer -= Time.deltaTime;
            if (this._isGrowingTimer <= 0) {
                this._isGrowing = false;
            }
        }
    }

    grow() {
        this._isGrowing = true;
        let tailCoordinates = this.gameObject.children[0].transform.position;
        QObject.instantiate(this.gameObject.children[0], this.gameObject, new Vector2(tailCoordinates.x, tailCoordinates.y));
        this._isGrowingTimer = .09;
    }
}