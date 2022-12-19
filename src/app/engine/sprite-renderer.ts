import { Vector2, Component, Canvas, GameObject } from "./qbcreates-js-engine";

export class SpriteRenderer extends Component {
    public sprite: Function = () => { };
    public color: string = 'blue';

    constructor(gameObject: GameObject) {
        super(gameObject);
    }
}

export function square(x: number, y: number, color: string, borderColor: string, scale: Vector2 = new Vector2(1, 1)) {
    let w = Canvas.ppu * scale.x;
    let h = Canvas.ppu * scale.y;

    x = (Canvas.ppu * x) + ((Canvas.ppu - w) / 2);
    y = (Canvas.ppu * y) + ((Canvas.ppu - h) / 2);

    Canvas.context.fillStyle = color;
    Canvas.context.strokeStyle = borderColor;
    Canvas.context.beginPath();
    Canvas.context.roundRect(x - (Canvas.ppu / 2), y - (Canvas.ppu / 2), w, h, 5);
    Canvas.context.stroke();
    Canvas.context.fill();
}