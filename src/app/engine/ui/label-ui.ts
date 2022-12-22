import { Canvas } from "../canvas";
import { GameObject } from "../game-object";
import { ComponentObject } from "../q-object";
import { Vector2 } from "../vector2";
import { UIBehaviour } from "./ui-behaviour";

export class LabelUI extends UIBehaviour {
    public text: string = '';
    public color: string = '';
    public transparency: number = 1;
    public fontStyle: string = '';
    public lineHeight: number = 0;
    public positionOffset: Vector2 = new Vector2(0, 0);

    constructor(gameObject: GameObject) {
        super(gameObject);
    }
    
    public render(): void {
        Canvas.context.fillStyle = this.color;
        Canvas.context.font = this.fontStyle;

        let textLines = this.text.split('\n');
        textLines.forEach((line, index) => {
            let textInfo = Canvas.context.measureText(line);
            let textHeight = (textInfo.actualBoundingBoxAscent + textInfo.actualBoundingBoxDescent);
            let x = ((this.transform.position.x + this.positionOffset.x) * Canvas.ppu);
            let y = (-1 * (this.transform.position.y + this.positionOffset.y) * Canvas.ppu) + (index * this.lineHeight);

            Canvas.context.fillText(line, x, y);
        });
    }
}

export class LabelObject {
    private _text: string = '';
    private _color: string = '';
    private _fontStyle: string = '';
    private _lineHeight: number = 0;
    
    constructor(text: string, color: string, fontStyle: string, lineHeight) {
        this._text = text;
        this._color = color;
        this._fontStyle = fontStyle;
        this._lineHeight = lineHeight;
    }

    public returnInterface(): ComponentObject {
        let labelUI: ComponentObject = {
            component: LabelUI,
            properties: {
                text: this._text,
                color: this._color,
                fontStyle: this._fontStyle,
                lineHeight: this._lineHeight
            }
        }

        return labelUI;
    }
}