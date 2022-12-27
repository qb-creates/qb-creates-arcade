import { MonoBehaviour, PlayerInput, KeyCode } from "../../../engine/qbcreates-js-engine";
import { SnakeMovement } from "./snake-exports";

export class SnakeInput extends MonoBehaviour {
    private _snakeMovement = null;

    awake() {
        this._snakeMovement = this.gameObject.getComponent(SnakeMovement);
    }

    start() {
    }

    update() {
        if (PlayerInput.getKeyDown(KeyCode.KeyW) && this._snakeMovement.currentDirection.y != -1) {
            this._snakeMovement.verticalAxis = 1;
            this._snakeMovement.horizontalAxis = 0;
        } else if (PlayerInput.getKeyDown(KeyCode.KeyS) && this._snakeMovement.currentDirection.y != 1) {
            this._snakeMovement.verticalAxis = -1;
            this._snakeMovement.horizontalAxis = 0;
        } else if (PlayerInput.getKeyDown(KeyCode.KeyA) && this._snakeMovement.currentDirection.x != 1) {
            this._snakeMovement.verticalAxis = 0;
            this._snakeMovement.horizontalAxis = -1;
        } else if (PlayerInput.getKeyDown(KeyCode.KeyD) && this._snakeMovement.currentDirection.x != -1) {
            this._snakeMovement.verticalAxis = 0;
            this._snakeMovement.horizontalAxis = 1;
        }
    }
}