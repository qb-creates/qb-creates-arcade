import { Vector2 } from "../../engine/qbcreates-js-engine";
import { TestFollow } from "./test-follow";
import { SpriteRendererObject, square } from "../../engine/sprite-renderer";
import { AppleBehaviour } from "./apple/apple-behaviour";
import { snakeBodyColor, SnakeCollision, snakeHeadColor, SnakeInput, SnakeMovement, SnakeSize } from "./snake/snake-exports";
import { Prefab } from "src/app/engine/q-object";
import { LabelObject } from "src/app/engine/ui/label-ui";
import { MonoBehaviourObject } from "src/app/engine/mono-behaviour";
import { BoxColliderObject } from "src/app/engine/box-collider";

export let snake: Prefab = {
    children: [
        {
            children: [],
            layer: 1,
            objectName: "snakeBody",
            position: new Vector2(0, 0),
            scale: new Vector2(.6, .6),
            components: [
                new BoxColliderObject(new Vector2(0, 0), new Vector2(.6, .6)),
                new SpriteRendererObject(snakeBodyColor, square),
                new MonoBehaviourObject(SnakeCollision)
            ]
        },
        {
            children: [],
            layer: 1,
            objectName: "snakeBody",
            position: new Vector2(1, 0),
            scale: new Vector2(.8, .8),
            components: [
                new BoxColliderObject(new Vector2(1, 0), new Vector2(.8, .8)),
                new SpriteRendererObject(snakeBodyColor, square),
                new MonoBehaviourObject(SnakeCollision)
            ]
        },
        {
            children: [],
            layer: 1,
            objectName: "snakeBody",
            position: new Vector2(2, 0),
            scale: new Vector2(1, 1),
            components: [
                new BoxColliderObject(new Vector2(2, 0), new Vector2(1, 1)),
                new SpriteRendererObject(snakeHeadColor, square),
                new MonoBehaviourObject(SnakeCollision)
            ]
        }
    ],
    layer: 1,
    objectName: "snake",
    position: new Vector2(0, 0),
    scale: new Vector2(1, 1),
    components: [
        new MonoBehaviourObject(SnakeMovement),
        new MonoBehaviourObject(SnakeInput),
        new MonoBehaviourObject(SnakeSize)
    ]
}

export let apple: Prefab = {
    children: [],
    layer: 1,
    objectName: "apple",
    position: new Vector2(5, 5),
    scale: new Vector2(.4, .4),
    components: [
        new SpriteRendererObject('red', square),
        new BoxColliderObject(new Vector2(5, 5), new Vector2(.4, .4)),
        new MonoBehaviourObject(AppleBehaviour),
    ]
}

export let scoreLabel: Prefab = {
    children: [],
    layer: 0,
    objectName: 'Score Label',
    position: new Vector2(0, 13),
    scale: new Vector2(1, 1),
    components: [
        new LabelObject('Score\n0', 'white', 'Bold 40px Times New Roman', 35)
    ]
}

export let enemy: Prefab = {
    children: [],
    layer: 2,
    objectName: "enemy",
    position: new Vector2(-5, 5),
    scale: new Vector2(1, 1),
    components: [
        new SpriteRendererObject('red', square),
        new BoxColliderObject(new Vector2(-5, 5), new Vector2(3, 3)),
        new MonoBehaviourObject(TestFollow)
    ]
}

export let background: Prefab = {
    children: [],
    layer: 0,
    objectName: "background",
    position: new Vector2(0, 0),
    scale: new Vector2(19.5, 19.5),
    components: [
        new SpriteRendererObject('#1E1E1E', square)
    ]
}

export let verticalBorder: Prefab = {
    children: [],
    layer: 0,
    objectName: "border",
    position: new Vector2(0, 0),
    scale: new Vector2(.5, 20),
    components: [
        new SpriteRendererObject('white', square),
        new BoxColliderObject(new Vector2(0, 0), new Vector2(.3, .19))
    ]
}

export let horizontalBorder: Prefab = {
    children: [],
    layer: 0,
    objectName: "border",
    position: new Vector2(0, 0),
    scale: new Vector2(20.5, .5),
    components: [
        new SpriteRendererObject('white', square),
        new BoxColliderObject(new Vector2(0, 0), new Vector2(19, .3))
    ]
}