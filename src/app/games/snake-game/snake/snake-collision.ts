import { Guid } from "guid-typescript";
import { MonoBehaviour, PlayerInput, KeyCode, Canvas, BoxCollider, QObject, Time } from "../../../engine/qbcreates-js-engine";
import { GameStateManager } from "../managers/game-state-manager";

export class SnakeCollision extends MonoBehaviour {
    private dieTimer = 0;
    private die = false;
    awake() {
    }

    start() {
    }

    update() {
        if (this.die ) {
            this.dieTimer += Time.deltaTime;
            if (this.dieTimer >= .1) {
                this.snakeAnimation();
                this.dieTimer = 0;
            }
        }
    }
    snakeAnimation() {
        QObject.destroy(this.gameObject.parent.children.shift());
        
        if (this.gameObject.parent.children.length == 0){
            this.die = false;
        }
    }
    onTriggerEnter(colliders: Map<Guid, BoxCollider>) {
        colliders.forEach(collider => {
            if (collider.gameObject.objectName.includes('snake')) {
                if (this.gameObject.parent.children[this.gameObject.parent.children.length - 1] == this.gameObject) {
                    GameStateManager.onGameOver();
                    this.die = true;
                }
                return;
            } else if (collider.gameObject.objectName.includes('border')) {
                this.die = true;
                GameStateManager.onGameOver();
            }
        })
    }
}