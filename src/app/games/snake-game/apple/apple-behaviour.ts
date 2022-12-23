import { Guid } from "guid-typescript";
import { Physics2d } from "src/app/engine/physics2d";
import { MonoBehaviour, Canvas, PlayerInput, KeyCode, Vector2, BoxCollider, SpriteRenderer, QObject } from "../../../engine/qbcreates-js-engine";
import { ScoreManager } from "../managers/score-manager";
import { SnakeSize } from "../snake/snake-exports";

export class AppleBehaviour extends MonoBehaviour {

    awake() {
        while (true) {
            let w = (500 / (Canvas.ppu * 2) - 1);
            let h = (500 / (Canvas.ppu * 2) - 1);
            let x = Math.floor(Math.random() * (w * (Math.round(Math.random()) > 0 ? 1 : -1)));
            let y = Math.floor(Math.random() * (h * (Math.round(Math.random()) > 0 ? 1 : -1)));

            let collisionList = Physics2d.overlapBox(new Vector2(x, y), this.transform.scale)

            if (collisionList.filter(collider => collider.gameObject.objectName.includes('snake')).length == 0) {
                this.transform.position = new Vector2(x, y);
                return;
            }
        }
    }

    start() {
    }

    update() {
    }

    onTriggerEnter(colliders: Map<Guid, BoxCollider>) {
        colliders.forEach(collider => {
            if (collider.gameObject.objectName.includes('snake')) {
                ScoreManager.addPoint();
                collider.gameObject.parent.getComponent(SnakeSize).grow();
                QObject.instantiate(this.gameObject);
                QObject.destroy(this.gameObject);
                return;
            }
        })
    }
}