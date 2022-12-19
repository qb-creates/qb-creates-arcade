import { MonoBehaviour, Input, KeyCode, Canvas, BoxCollider } from "../../../engine/qbcreates-js-engine";
import { GameStateManager } from "../managers/game-state-manager";

export class SnakeCollision extends MonoBehaviour {
    awake() {
    }

    start() {
    }

    update() {
    }

    onTriggerEnter(colliders: BoxCollider[]) {
        colliders.forEach(collider => {
            if (collider.gameObject.objectName.includes('snake')) {
                if (this.gameObject.parent.children[this.gameObject.parent.children.length - 1] == this.gameObject) {
                    GameStateManager.onGameOver();
                }
                return;
            } else if (collider.gameObject.objectName.includes('border')) {
                GameStateManager.onGameOver();
            }
        })
    }
}