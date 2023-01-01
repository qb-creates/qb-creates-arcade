import { BoxCollider, Rigidbody2d, SpriteRenderer, Vector2 } from "../../engine/qbcreates-js-engine";
import { Prefab } from "src/app/engine/q-object";
import { ButtonInterface, BoxColliderInterface, SpriteRendererInterface, LabelInterface } from "src/app/engine/component-interface";
import { FishmanInput } from "./fishman/fishman-input";
import { LabelUI } from "src/app/engine/ui/label-ui";
import { Sprite } from "src/app/engine/sprite";
import { SpriteSheet } from "src/app/engine/sprite-sheet";
import { squareSprite } from "src/app/engine/sprite-shape";

export let player: Prefab = {
    children: [],
    layer: 2,
    objectName: "player",
    position: new Vector2(-5, 5),
    scale: new Vector2(1.5, 1.5),
    components: [
        {
            component: SpriteRenderer,
            properties: <SpriteRendererInterface>{
                color: 'red',
                sprite: new SpriteSheet('Fishman-Fighter-Sheet', 48, 48)
            }
        },
        {
            component: BoxCollider,
            properties: <BoxColliderInterface>{
                position: new Vector2(-5, 5),
                scale: new Vector2(2, 3),
            }
        },
        {
            component: FishmanInput,
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
                scale: new Vector2(20.5, .3),
            }
        }
    ]
}