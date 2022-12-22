import { Subject, Subscription } from "rxjs";
import { BoxCollider } from "../box-collider";
import { Canvas } from "../canvas";
import { KeyCode, PlayerInput } from "../player-input";
import { ComponentObject, ObjectBase } from "../q-object";
import { Vector2 } from "../vector2";
import { UIBehaviour } from "./ui-behaviour";

export class ButtonUI extends UIBehaviour {
    public text: string = '';
    public color: string = '';
    public fontStyle: string = '';
    public lineHeight: number = 0;
    private _clickEvent: Subject<boolean> = new Subject<boolean>();

    get clickEvent() {
        return this._clickEvent;
    }

    update(): void {
        this.checkForButtonClick();
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
        // Canvas.context.fillRect()
    }

    private checkForButtonClick() {
        let mousePosition = Canvas.mousePosition;

        // Get the top left corner coordinates of the box
        let lX = (this.transform.position.x) - (this.transform.scale.x / 2);
        let lY = (this.transform.position.y) + (this.transform.scale.y / 2);
        let l1 = new Vector2(lX, lY);

        // Get the bottom right corner coordinates of the box
        let rX = (this.transform.position.x) + (this.transform.scale.x / 2);
        let rY = (this.transform.position.y) - (this.transform.scale.y / 2);
        let r1 = new Vector2(rX, rY);

        if (mousePosition.y >= r1.y && mousePosition.y <= l1.y && mousePosition.x >= l1.x && mousePosition.x <= r1.x) {
            if (PlayerInput.getKeyDown(KeyCode[0])) {
                this._clickEvent.next(true);
                console.log('yes')
            } else if (PlayerInput.getKeyUp(KeyCode[0])) {
                this._clickEvent.next(false);
            }
        }
    }
}

export class ButtonObject extends ObjectBase {
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
        let buttonUI: ComponentObject = {
            component: ButtonUI,
            properties: {
                text: this._text,
                color: this._color,
                fontStyle: this._fontStyle,
                lineHeight: this._lineHeight
            }
        }

        return buttonUI;
    }
}