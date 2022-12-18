import { MonoBehaviour, Canvas, Input, KeyCode, Vector2, BoxCollider, SpriteRenderer, QObject } from "../../../engine/qbcreates-js-engine";
import { ScoreManager } from "../managers/score-manager";
import { SnakeSize } from "../snake/snake-exports";

export class AppleBehaviour extends MonoBehaviour {

    awake() {
        // while (true) {
        //     let x = Math.floor(Math.random() * Canvas.canvasWidth );
        //     let y = Math.floor(Math.random() * Canvas.canvasHeight );

        //     let collisionList = Canvas.checkForCollisions({ x: x, y: y });
        //     let snakeGameObject = collisionList.find(object => object instanceof (SnakeGameObject));

        //     if (snakeGameObject == null) {
        //         let cell = new Cell(x, y, appleColor);
        //         this.gameObject.cells.push(cell);
        //         return;
        //     }
        // }

        let w = (Canvas.canvasWidth / (Canvas.ppu * 2) - 1);
        let h = (Canvas.canvasHeight / (Canvas.ppu * 2) - 1);
        let x = Math.floor(Math.random() * (w * (Math.round(Math.random()) > 0 ? 1 : -1)));
        let y = Math.floor(Math.random() * (h * (Math.round(Math.random()) > 0 ? 1 : -1)));
        
        this.transform.position = new Vector2(x, y);
    }

    start() {
    }

    update() {
        // console.log(this.gameObject.objectName, "    ", this.gameObject.getComponent(BoxCollider))
    }

    onTriggerEnter(colliders) {
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