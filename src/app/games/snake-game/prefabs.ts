import { BoxCollider, Rigidbody2d, SpriteRenderer, Vector2 } from "../../engine/qbcreates-js-engine";
import { snakeBodyColor, SnakeCollision, snakeHeadColor, SnakeInput, SnakeMovement, SnakeSize } from "./snake/snake-exports";
import { Prefab } from "src/app/engine/q-object";
import { squareSprite } from "src/app/engine/sprite-shape";
import { ButtonUI } from "src/app/engine/ui/button-ui";

import { PlayButton } from "./ui/play-button";

import { ButtonInterface, BoxColliderInterface, SpriteRendererInterface, LabelInterface } from "src/app/engine/component-interface";
import { TestFollow } from "./test-follow";
import { LabelUI } from "src/app/engine/ui/label-ui";
import { AppleBehaviour } from "./apple/apple-behaviour";

export let apple: Prefab = {
    children: [],
    layer: 1,
    objectName: "apple",
    position: new Vector2(5, 5),
    scale: new Vector2(.4, .4),
    components: [
        {
            component: SpriteRenderer,
            properties: <SpriteRendererInterface>{
                color: 'red',
                sprite: squareSprite,
            }
        },
        {
            component: BoxCollider,
            properties: <BoxColliderInterface>{
                position: new Vector2(5, 5),
                scale: new Vector2(.4, .4),
            }
        },
        {
            component: AppleBehaviour,
            properties: {}
        }
    ]
}

export let playButton: Prefab = {
    children: [],
    layer: 0,
    objectName: "playButton",
    position: new Vector2(0, 8),
    scale: new Vector2(3.8, 2),
    components: [
        {
            component: PlayButton,
            properties: {
            }
        },
        {
            component: ButtonUI,
            properties: <ButtonInterface>{
                text: 'Play',
                font: 'Monospace',
                textSize: 30,
                textColor: 'white',
                buttonColor: 'red',
                bold: true
            }
        }
    ]
}

export let scoreLabel: Prefab = {
    children: [],
    layer: 0,
    objectName: 'Score Label',
    position: new Vector2(0, 12.5),
    scale: new Vector2(1, 1),
    components: [
        {
            component: LabelUI,
            properties: <LabelInterface>{
                text: 'Score\n0',
                font: 'Monospace',
                textSize: 40,
                textColor: 'white',
                bold: true
            }
        }
    ]
}

export let enemy: Prefab = {
    children: [],
    layer: 2,
    objectName: "enemy",
    position: new Vector2(-5, 5),
    scale: new Vector2(1, 1),
    components: [
        {
            component: SpriteRenderer,
            properties: <SpriteRendererInterface>{
                color: 'red',
                sprite: squareSprite,
            }
        },
        {
            component: BoxCollider,
            properties: <BoxColliderInterface>{
                position: new Vector2(-5, 5),
                scale: new Vector2(1, 1),
            }
        },
        {
            component: TestFollow,
            properties: {}
        },
        {
            component: Rigidbody2d,
            properties: {}
        }
    ]
}

export let background: Prefab = {
    children: [],
    layer: 0,
    objectName: "background",
    position: new Vector2(0, 0),
    scale: new Vector2(19.5, 19.5),
    components: [
        {
            component: SpriteRenderer,
            properties: <SpriteRendererInterface>{
                color: '#1E1E1E',
                sprite: squareSprite,
            }
        }
    ]
}

export let verticalBorder: Prefab = {
    children: [],
    layer: 0,
    objectName: "border",
    position: new Vector2(0, 0),
    scale: new Vector2(.5, 20),
    components: [
        {
            component: SpriteRenderer,
            properties: <SpriteRendererInterface>{
                color: 'white',
                sprite: squareSprite,
            }
        },
        {
            component: BoxCollider,
            properties: <BoxColliderInterface>{
                position: new Vector2(0, 0),
                scale: new Vector2(.3, 19),
            }
        }
    ]
}

export let horizontalBorder: Prefab = {
    children: [],
    layer: 0,
    objectName: "border",
    position: new Vector2(0, 0),
    scale: new Vector2(20.5, .5),
    components: [
        {
            component: SpriteRenderer,
            properties: <SpriteRendererInterface>{
                color: 'white',
                sprite: squareSprite,
            }
        },
        {
            component: BoxCollider,
            properties: <BoxColliderInterface>{
                position: new Vector2(0, 0),
                scale: new Vector2(19, .3),
            }
        }
    ]
}