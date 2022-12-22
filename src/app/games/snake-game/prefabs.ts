import { BoxCollider, SpriteRenderer, Vector2 } from "../../engine/qbcreates-js-engine";
import { snakeBodyColor, SnakeCollision, snakeHeadColor, SnakeInput, SnakeMovement, SnakeSize } from "./snake/snake-exports";
import { Prefab } from "src/app/engine/q-object";
import { squareSprite } from "src/app/engine/sprite-shape";
import { ButtonUI } from "src/app/engine/ui/button-ui";

import { PlayButton } from "./ui/play-button";

import { ButtonInterface, BoxColliderInterface, SpriteRendererInterface } from "src/app/engine/component-interface";



// export let apple: Prefab = {
//     children: [],
//     layer: 1,
//     objectName: "apple",
//     position: new Vector2(5, 5),
//     scale: new Vector2(.4, .4),
//     components: [
//         new SpriteRendererObject('red', squareSprite),
//         new BoxColliderObject(new Vector2(5, 5), new Vector2(.4, .4)),
//         new MonoBehaviourObject(AppleBehaviour),
//     ]
// }

export let playButton: Prefab = {
    children: [],
    layer: 0,
    objectName: "playButton",
    position: new Vector2(0, 0),
    scale: new Vector2(3.8, 4),
    components: [
        {
            component: PlayButton,
            properties: {
            }
        },
        {
            component: ButtonUI,
            properties: <ButtonInterface> {
                text: 'Play\nNow',
                font: 'Monospace',
                textSize: 30,
                textColor: 'white',
                buttonColor: 'red',
                bold: true
            }
        }
    ]
}

// export let scoreLabel: Prefab = {
//     children: [],
//     layer: 0,
//     objectName: 'Score Label',
//     position: new Vector2(0, 13),
//     scale: new Vector2(1, 1),
//     components: [
//         new LabelObject('Score\n0', 'white', 'Bold 40px Monospace', 35)
//     ]
// }

// export let enemy: Prefab = {
//     children: [],
//     layer: 2,
//     objectName: "enemy",
//     position: new Vector2(-5, 5),
//     scale: new Vector2(1, 1),
//     components: [
//         new SpriteRendererObject('red', squareSprite),
//         new BoxColliderObject(new Vector2(-5, 5), new Vector2(3, 3)),
//         new MonoBehaviourObject(TestFollow)
//     ]
// }

// export let background: Prefab = {
//     children: [],
//     layer: 0,
//     objectName: "background",
//     position: new Vector2(0, 0),
//     scale: new Vector2(19.5, 19.5),
//     components: [
//         new SpriteRendererObject('#1E1E1E', squareSprite)
//     ]
// }

// export let verticalBorder: Prefab = {
//     children: [],
//     layer: 0,
//     objectName: "border",
//     position: new Vector2(0, 0),
//     scale: new Vector2(.5, 20),
//     components: [
//         new SpriteRendererObject('white', squareSprite),
//         new BoxColliderObject(new Vector2(0, 0), new Vector2(.3, 19))
//     ]
// }

// export let horizontalBorder: Prefab = {
//     children: [],
//     layer: 0,
//     objectName: "border",
//     position: new Vector2(0, 0),
//     scale: new Vector2(20.5, .5),
//     components: [
//         new SpriteRendererObject('white', squareSprite),
//         new BoxColliderObject(new Vector2(0, 0), new Vector2(19, .3))
//     ]
// }

// let a = Object.assign(new ButtonObject(), <Buttonsss>{
    
// });

