import { Canvas } from "../canvas";
import { GameObject } from "../game-object";
import { ComponentObject, ObjectBase } from "../q-object";
import { UIBehaviour } from "./ui-behaviour";

export class LabelUI extends UIBehaviour {
    public text: string = '';
    public color: string = '';
    public fontStyle: string = '';
    public lineHeight: number = 0;

    constructor(gameObject: GameObject) {
        super(gameObject);
    }

    public render(): void {
        Canvas.context.fillStyle = this.color;
        Canvas.context.font = this.fontStyle;

        let textLines = this.text.split('\n');
        textLines.forEach((line, index) => {
            let textInfo = Canvas.context.measureText(line);
            let textHeight = (textInfo.actualBoundingBoxAscent + textInfo.actualBoundingBoxDescent)
            let x = this.transform.position.x - (textInfo.width / 2) ;
            let y = (-1 * this.transform.position.y * Canvas.ppu) + (index * this.lineHeight) + (textHeight / 2);

            Canvas.context.fillText(line, x, y);
        });
    }
}

export class LabelObject extends ObjectBase{
    private _text: string = '';
    private _color: string = '';
    private _fontStyle: string = '';
    private _lineHeight: number = 0;
    
    constructor(text: string, color: string, fontStyle: string, lineHeight) {
        super();
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