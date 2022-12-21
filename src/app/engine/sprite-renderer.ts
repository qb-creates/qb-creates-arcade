import { ComponentObject, ObjectBase } from "./q-object";
import { Vector2, Component, Canvas, GameObject } from "./qbcreates-js-engine";

export class SpriteRenderer extends Component {
    public sprite: Function = () => { };
    public color: string = 'blue';

    public set sprites(value) {

    }
    constructor(gameObject: GameObject) {
        super(gameObject);
    }
}

export let square = (renderer: SpriteRenderer) => {
    let x: number = renderer.transform.position.x;
    let y: number = renderer.transform.position.y;
    let color: string = renderer.color;
    let borderColor: string = renderer.color
    let scale: Vector2 = renderer.transform.scale;

    let w = Canvas.ppu * scale.x;
    let h = Canvas.ppu * scale.y;
    
    x = (Canvas.ppu * x) + ((Canvas.ppu - w) / 2);
    y = -1 * (Canvas.ppu * y) + ((Canvas.ppu - h) / 2);

    Canvas.context.fillStyle = color;
    Canvas.context.strokeStyle = borderColor;
    Canvas.context.beginPath();
    Canvas.context.roundRect(x - (Canvas.ppu / 2), y - (Canvas.ppu / 2), w, h, 5);
    Canvas.context.stroke();
    Canvas.context.fill();
}

export class SpriteRendererObject extends ObjectBase{
    private _color: string = '';
    private _sprite = null;

    constructor(color: string, sprite) {
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