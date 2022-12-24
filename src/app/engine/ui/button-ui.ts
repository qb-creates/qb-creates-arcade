import { Subject, Subscription } from "rxjs";
import { BoxCollider } from "../box-collider";
import { Canvas } from "../canvas";
import { KeyCode, PlayerInput } from "../player-input";
import { Vector2 } from "../vector2";
import { UIBehaviour } from "./ui-behaviour";

export class ButtonUI extends UIBehaviour {
    public buttonColor: string = 'gray';
    public borderColor: string = 'white';
    public borderThickness: number = 3;
    public borderRadius: number = 5;
    public transparency: number = 1;
    public text: string = '';
    public textColor: string = 'white';
    public bold: boolean = false;
    public textSize: number = 30;
    public font: string = 'Monospace';
    public positionOffset: Vector2 = new Vector2(0, 0);
    private _lineHeight: number = 30;
    private _clickEvent: Subject<ButtonUIState> = new Subject<ButtonUIState>();
    private _buttonState: ButtonUIState = {
        clicked: false,
        released: false,
        toggled: false
    }
    get clickEvent() {
        return this._clickEvent;
    }

    update(): void {
        if (this.gameObject.isActive) {
            this.checkForButtonClick();
        }
    }

    public render(): void {
        this.renderBox();
        this.renderText();
    }

    private renderBox(): void {
        let color: string = this.buttonColor;
        let borderColor: string = this.borderColor;
        let scale: Vector2 = this.transform.scale;

        let w = Canvas.ppu * scale.x;
        let h = Canvas.ppu * scale.y;

        let x = Canvas.ppu * (this.transform.position.x - 0.5);
        let y = -Canvas.ppu * (this.transform.position.y + 0.5);

        x = x + (Canvas.ppu - w) / 2;
        y = y + (Canvas.ppu - h) / 2;
        Canvas.context.fillStyle = color;
        Canvas.context.strokeStyle = borderColor;
        Canvas.context.globalAlpha = this.transparency;
        Canvas.context.lineWidth = this.borderThickness;
        Canvas.context.beginPath();
        Canvas.context.roundRect(x, y, w, h, this.borderRadius);
        Canvas.context.stroke();
        Canvas.context.fill();
    }

    private renderText(): void {
        Canvas.context.fillStyle = this.textColor;
        Canvas.context.font = `${this.bold ? 'bold' : ''} ${this.textSize}px ${this.font}`;

        let textLines = this.text.split('\n');
        let lineHeight = this.textSize;
        let verticalCenterOffset = (textLines.length - 1) * lineHeight / 2;
        textLines.forEach((line, index) => {
            let x = (this.transform.position.x + this.positionOffset.x) * Canvas.ppu;
            let y = (-1 * (this.transform.position.y + this.positionOffset.y) * Canvas.ppu) + (index * lineHeight) - verticalCenterOffset + 4;
            Canvas.context.fillText(line, x, y);
        });
    }

    private checkForButtonClick() {
        let mousePosition = Canvas.mousePosition;

        // Get the top left corner coordinates of the box
        let lX = (this.transform.position.x) - (this.transform.scale.x / 2) - (this.borderThickness / (Canvas.ppu * 2));
        let lY = (this.transform.position.y) + (this.transform.scale.y / 2) + (this.borderThickness / (Canvas.ppu * 2));
        let l1 = new Vector2(lX, lY);

        // Get the bottom right corner coordinates of the box
        let rX = (this.transform.position.x) + (this.transform.scale.x / 2) + (this.borderThickness / (Canvas.ppu * 2));
        let rY = (this.transform.position.y) - (this.transform.scale.y / 2) - (this.borderThickness / (Canvas.ppu * 2));
        let r1 = new Vector2(rX, rY);

        if (mousePosition.y >= r1.y && mousePosition.y <= l1.y && mousePosition.x >= l1.x && mousePosition.x <= r1.x) {
            if (PlayerInput.getKeyDown(KeyCode[0])) {
                this._buttonState.clicked = true;
                this._buttonState.released = false;
                this._clickEvent.next(this._buttonState);
            } else if (PlayerInput.getKeyUp(KeyCode[0])) {
                this._buttonState.clicked = false;
                this._buttonState.released = true;
                this._buttonState.toggled = !this._buttonState.toggled;
                this._clickEvent.next(this._buttonState);
            }
        }
    }
}

export interface ButtonUIState {
    clicked: boolean,
    released: boolean,
    toggled: boolean,
}