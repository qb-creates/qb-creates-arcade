import { ComponentObject, ObjectBase } from "./q-object";
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

export class SpriteRendererObject extends ObjectBase {
    private _color: string = '';
    private _sprite: SpriteShape | Sprite = null;

    /**
     * Creates a SpriteRenderer Componet with an attached Sprite
     * @param color - Color of the Sprite
     * @param sprite - The sprite.
     */
    constructor(color: string, sprite: SpriteShape | Sprite) {
        super();
        this._color = color;
        this._sprite = sprite;
    }

    public returnInterface(): ComponentObject {
        let spriteRenderer: ComponentObject = {
            component: SpriteRenderer,
            properties: {
                color: this._color,
                sprite: this._sprite
            }
        }
        return spriteRenderer;
    }
}