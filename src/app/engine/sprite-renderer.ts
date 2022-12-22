import { ComponentObject } from "./q-object";
import { Component, GameObject } from "./qbcreates-js-engine";
import { Sprite } from "./sprite";
import { SpriteShape } from "./sprite-shape";

export class SpriteRenderer extends Component {
    public sprite: SpriteShape | Sprite = null;
    public color: string = 'blue';
    public transparency: number = 1;

    constructor(gameObject: GameObject) {
        super(gameObject);
    }
}