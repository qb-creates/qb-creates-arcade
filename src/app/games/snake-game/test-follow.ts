import { MonoBehaviour, Canvas, Time, PlayerInput, KeyCode, Vector2, SpriteRenderer } from "../../engine/qbcreates-js-engine";
import { GameStateManager } from "./managers/game-state-manager.js";
import { Physics2d } from "../../engine/physics2d";
import { squareSprite } from "src/app/engine/sprite-shape";
import { Debug } from "src/app/engine/debug";

export class TestFollow extends MonoBehaviour {
    target = null;
    speed = 1;
    _play = false;

    awake() {
        GameStateManager.gameStateEvent.subscribe(isStarted => {
            this._play = true;
        });

        this.animation.push((renderer) => {
            squareSprite.drawShape(renderer)
        });
        this.animation.push((renderer) => {
            squareSprite.drawShape(renderer)
        });
        this.animation.push((renderer) => {
            squareSprite.drawShape(renderer)
        });
        this.animation.push((renderer) => {
            squareSprite.drawShape(renderer)
        });
        this.animation.push((renderer) => {
            squareSprite.drawShape(renderer)
        });
    }

    start() {
    }
    animation = [];
    animationcount = 0;
    test = false
    update() {
        if (PlayerInput.getKey(KeyCode[0])) {
            if (!this.test && Math.abs(Canvas.mousePosition.x - this.transform.position.x) <= 0.2 && Math.abs(Canvas.mousePosition.y - this.transform.position.y) <= 0.2) {
                this.test = true;
            }
            if (this.test) {
                let direction = Vector2.subtract(Canvas.mousePosition, this.transform.position);
                let colliders = Physics2d.rayCast(this.transform.position, direction, direction.magnitude);
                let hitting = false;
                if (colliders.filter(collider => collider.gameObject.objectName.includes('snake')).length > 0) {
                    hitting = true;
                }
                Debug.drawRay(this.transform.position, direction, direction.magnitude, hitting ? "#00FF00" : "#FF0000")
            }
        }
        if (PlayerInput.getKeyUp(KeyCode[0])) {
            this.test = false;
        }

        if (this.animationcount == 0) {
            this.gameObject.transform.scale = new Vector2(.8, .8);
        }
        if (this.animationcount == 5) {
            this.gameObject.transform.scale = new Vector2(.6, .6);
        }
        if (this.animationcount == 10) {
            this.gameObject.transform.scale = new Vector2(.4, .4);
        }
        if (this.animationcount == 15) {
            this.gameObject.transform.scale = new Vector2(.3, .3);
        }
        if (this.animationcount == 20) {
            this.gameObject.transform.scale = new Vector2(.3, .3);
        }
        if (this.animationcount == 30) {
            this.gameObject.transform.scale = new Vector2(.4, .4);
        }
        if (this.animationcount == 40) {
            this.gameObject.transform.scale = new Vector2(.6, .6);
        }
        if (this.animationcount == 50) {
            this.gameObject.transform.scale = new Vector2(.8, .8);
            this.animationcount = 0;
        }

        if (false) {
            let step = this.speed * Time.deltaTime;
            let myTarg = this.target.children[this.target.children.length - 1];
            let placeholder = Vector2.subtract(myTarg.transform.position, this.transform.position).normalize();
            let xDistance = Math.abs(this.transform.position.x - myTarg.transform.position.x);
            let yDistance = Math.abs(this.transform.position.y - myTarg.transform.position.y);

            if (xDistance <= 0.02 && yDistance <= 0.02) {
                this.transform.position = new Vector2(myTarg.transform.position.x, this.transform.position.y);
            } else {
                this.transform.position = Vector2.add(this.transform.position, Vector2.multiply(placeholder, step));
            }
        }
        this.animationcount++;
    }

    onTriggerEnter(colliders) {

    }

    onTriggerExit(colliders) {
    }
}