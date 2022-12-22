import { Subject, Subscription } from "rxjs";
import { BoxCollider } from "../box-collider";
import { Canvas } from "../canvas";
import { KeyCode, PlayerInput } from "../player-input";
import { ComponentObject, ObjectBase } from "../q-object";
import { Vector2 } from "../vector2";
import { UIBehaviour } from "./ui-behaviour";

export class ButtonUI extends UIBehaviour {
    public color: string = '';
    private _clickEvent: Subject<boolean> = new Subject<boolean>();

    get clickEvent() {
        return this._clickEvent;
    }

    update(): void {
        if (this.gameObject.isActive) {
            this.checkForButtonClick();
        }
    }

    public render(): void {
        let color: string = this.color;
        let borderColor: string = this.color;
        let scale: Vector2 = this.transform.scale;

        let w = Canvas.ppu * scale.x;
        let h = Canvas.ppu * scale.y;

        let x = Canvas.ppu * (this.transform.position.x - 0.5);
        let y = -Canvas.ppu * (this.transform.position.y + 0.5);

        x = x + (Canvas.ppu - w) / 2;
        y = y + (Canvas.ppu - h) / 2;
        
        Canvas.context.fillStyle = color;
        Canvas.context.strokeStyle = borderColor;
        Canvas.context.beginPath();
        Canvas.context.roundRect(x, y, w, h, 5);
        Canvas.context.stroke();
        Canvas.context.fill();
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
            } else if (PlayerInput.getKeyUp(KeyCode[0])) {
                this._clickEvent.next(false);
            }
        }
    }
}

export class ButtonObject extends ObjectBase {
    private _color: string = '';

    constructor(color: string) {
        super();
        this._color = color;
    }

    public returnInterface(): ComponentObject {
        let buttonUI: ComponentObject = {
            component: ButtonUI,
            properties: {
                color: this._color
            }
        }

        return buttonUI;
    }
}