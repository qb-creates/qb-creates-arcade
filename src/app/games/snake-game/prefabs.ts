import { Vector2 } from "../../engine/qbcreates-js-engine";
import { TestFollow } from "./test-follow";
import { SpriteRendererObject } from "../../engine/sprite-renderer";
import { AppleBehaviour } from "./apple/apple-behaviour";
import { snakeBodyColor, SnakeCollision, snakeHeadColor, SnakeInput, SnakeMovement, SnakeSize } from "./snake/snake-exports";
import { Prefab } from "src/app/engine/q-object";
import { LabelObject } from "src/app/engine/ui/label-ui";
import { MonoBehaviourObject } from "src/app/engine/mono-behaviour";
import { BoxColliderObject } from "src/app/engine/box-collider";
import { squareSprite } from "src/app/engine/sprite-shape";
import { ButtonObject } from "src/app/engine/ui/button-ui";
import { GameStateManager } from "./managers/game-state-manager";
import { PlayButton } from "./ui/play-button";
import { Sprite } from "src/app/engine/sprite";

export let snake: Prefab = {
    children: [
        {
            children: [],
            layer: 1,
            objectName: "snakeBody",
            position: new Vector2(-1, 0),
            scale: new Vector2(.6, .6),
            components: [
                new BoxColliderObject(new Vector2(-1, 0), new Vector2(.6, .6)),
                new SpriteRendererObject(snakeBodyColor, squareSprite),
                new MonoBehaviourObject(SnakeCollision)
            ]
        },
        {
            children: [],
            layer: 1,
            objectName: "snakeBody",
            position: new Vector2(0, 0),
            scale: new Vector2(.8, .8),
            components: [
                new BoxColliderObject(new Vector2(0, 0), new Vector2(.8, .8)),
                new SpriteRendererObject(snakeBodyColor, squareSprite),
                new MonoBehaviourObject(SnakeCollision)
            ]
        },
        {
            children: [],
            layer: 1,
            objectName: "snakeBody",
            position: new Vector2(1, 0),
            scale: new Vector2(1, 1),
            components: [
                new BoxColliderObject(new Vector2(1, 0), new Vector2(1, 1)),
                new SpriteRendererObject(snakeHeadColor, squareSprite),
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
        new SpriteRendererObject('red', squareSprite),
        new BoxColliderObject(new Vector2(5, 5), new Vector2(.4, .4)),
        new MonoBehaviourObject(AppleBehaviour),
    ]
}

export let playButton: Prefab = {
    children: [],
    layer: 0,
    objectName: "playButton",
    position: new Vector2(0, 8),
    scale: new Vector2(3.8, 2),
    components: [
        new ButtonObject('red'),
        new LabelObject('Play', 'white', 'Bold 40px Monospace', 35),
        new MonoBehaviourObject(PlayButton)
    ]
}

export let scoreLabel: Prefab = {
    children: [],
    layer: 0,
    objectName: 'Score Label',
    position: new Vector2(0, 13),
    scale: new Vector2(1, 1),
    components: [
        new LabelObject('Score\n0', 'white', 'Bold 40px Monospace', 35)
    ]
}

export let enemy: Prefab = {
    children: [],
    layer: 2,
    objectName: "enemy",
    position: new Vector2(-5, 5),
    scale: new Vector2(1, 1),
    components: [
        new SpriteRendererObject('red', squareSprite),
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
        new SpriteRendererObject('#1E1E1E', squareSprite)
    ]
}

export let verticalBorder: Prefab = {
    children: [],
    layer: 0,
    objectName: "border",
    position: new Vector2(0, 0),
    scale: new Vector2(.5, 20),
    components: [
        new SpriteRendererObject('white', squareSprite),
        new BoxColliderObject(new Vector2(0, 0), new Vector2(.3, 19))
    ]
}

export let horizontalBorder: Prefab = {
    children: [],
    layer: 0,
    objectName: "border",
    position: new Vector2(0, 0),
    scale: new Vector2(20.5, .5),
    components: [
        new SpriteRendererObject('white', squareSprite),
        new BoxColliderObject(new Vector2(0, 0), new Vector2(19, .3))
    ]
}