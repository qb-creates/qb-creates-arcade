import { MonoBehaviour, SpriteRenderer, Time, Vector2 } from "../../../engine/qbcreates-js-engine";
import { GameStateManager } from "../managers/game-state-manager";
import { SnakeSize, snakeHeadColor, snakeBodyColor } from "./snake-exports";

export class SnakeMovement extends MonoBehaviour {
    private _play = false;
    private _snakeSize = null;
    private _verticalAxis = 0;
    private _horizontalAxis = 1;
    private _movePlayerTimer = 0;
    private _currentDirection = new Vector2(0, 1);

    get currentDirection() {
        return this._currentDirection;
    }

    set horizontalAxis(newHorizontalAxis) {
        this._horizontalAxis = newHorizontalAxis;
    }

    set verticalAxis(newVerticalAxis) {
        this._verticalAxis = newVerticalAxis;
    }

    awake() {
        GameStateManager.gameStateEvent.subscribe(isStarted => {
            this._play = isStarted;
        });
        this._snakeSize = this.gameObject.getComponent(SnakeSize);
    }

    start() {

    }

    update() {
        // console.log(this.gameObject)
        if (this._play) {
            this._movePlayerTimer += Time.fixedDeltaTime;

            if (this._movePlayerTimer >= .11 && !this._snakeSize.isGrowing) {
                let headIndex = this.gameObject.children.length - 1
                let coordinates = this.gameObject.children[headIndex].transform.position;
                let headX = coordinates.x + this._horizontalAxis;
                let headY = coordinates.y + this._verticalAxis;
                let tailTransform = this.gameObject.children[0].transform;
                tailTransform.position = new Vector2(headX, headY);

                // Push the tail cell to the front of the array.
                this.gameObject.children.push(this.gameObject.children.shift());

                // Adjust snake head and body color
                this.gameObject.children[headIndex].getComponent(SpriteRenderer).color = snakeHeadColor;
                this.gameObject.children[headIndex - 1].getComponent(SpriteRenderer).color = snakeBodyColor;

                // Adjust snake scale;
                this.gameObject.children[headIndex].transform.scale = new Vector2(1, 1);
                this.gameObject.children[headIndex - 1].transform.scale = new Vector2(.8, .8);
                this.gameObject.children[0].transform.scale = new Vector2(.6, .6);

                this._currentDirection = new Vector2(this._horizontalAxis, this._verticalAxis);
                this._movePlayerTimer = 0;
            }
        }
    }
}