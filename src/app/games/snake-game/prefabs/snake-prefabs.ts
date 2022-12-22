import { BoxCollider } from "src/app/engine/box-collider";
import { BoxColliderInterface, SpriteRendererInterface } from "src/app/engine/component-interface";
import { Prefab } from "src/app/engine/q-object";
import { SpriteRenderer } from "src/app/engine/sprite-renderer";
import { squareSprite } from "src/app/engine/sprite-shape";
import { Vector2 } from "src/app/engine/vector2";
import { SnakeCollision } from "../snake/snake-collision";
import { snakeBodyColor, snakeHeadColor, SnakeInput, SnakeMovement, SnakeSize } from "../snake/snake-exports";

// Snake
export let snake: Prefab = {
    children: [
        {
            children: [],
            layer: 1,
            objectName: "snakeBody",
            position: new Vector2(-1, 0),
            scale: new Vector2(.6, .6),
            components: [
                {
                    component: BoxCollider,
                    properties: <BoxColliderInterface> {
                        position: new Vector2(-1, 0),
                        scale: new Vector2(0, 0),
                    }
                },
                {
                    component: SpriteRenderer,
                    properties: <SpriteRendererInterface> {
                        color: snakeBodyColor,
                        sprite: squareSprite,
                    }
                },
                {
                    component: SnakeCollision,
                    properties: {}
                }
            ]
        },
        {
            children: [],
            layer: 1,
            objectName: "snakeBody",
            position: new Vector2(0, 0),
            scale: new Vector2(.8, .8),
            components: [
                {
                    component: BoxCollider,
                    properties: <BoxColliderInterface> {
                        position: new Vector2(0, 0),
                        scale: new Vector2(.8, .8),
                    }
                },
                {
                    component: SpriteRenderer,
                    properties: <SpriteRendererInterface> {
                        color: snakeBodyColor,
                        sprite: squareSprite,
                    }
                },
                {
                    component: SnakeCollision,
                    properties: {}
                }
            ]
        },
        {
            children: [],
            layer: 1,
            objectName: "snakeBody",
            position: new Vector2(1, 0),
            scale: new Vector2(1, 1),
            components: [
                {
                    component: BoxCollider,
                    properties: <BoxColliderInterface> {
                        position: new Vector2(1, 0),
                        scale: new Vector2(1, 1),
                    }
                },
                {
                    component: SpriteRenderer,
                    properties: <SpriteRendererInterface> {
                        color: snakeHeadColor,
                        sprite: squareSprite,
                    }
                }
            ]
        }
    ],
    layer: 1,
    objectName: "snake",
    position: new Vector2(0, 0),
    scale: new Vector2(1, 1),
    components: [
        {
            component: SnakeInput,
            properties: {}
        },
        {
            component: SnakeMovement,
            properties: {}
        },
        {
            component: SnakeSize,
            properties: {}
        }
    ]
}