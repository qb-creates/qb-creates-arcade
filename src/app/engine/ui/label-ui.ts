import { Canvas } from "../canvas";
import { GameObject } from "../game-object";
import { Vector2 } from "../vector2";
import { UIBehaviour } from "./ui-behaviour";

export class LabelUI extends UIBehaviour {
    text: string = 'test';
    color: string = 'white';
    fontStyle: string = 'bold 40px Times New Roman';
    lineHeight: number = 50;

    /**
     * Will instantiate a new label.
     * @param text - Text that will be displayed.
     * @param position - Position of the text on the canvas.
     */
    constructor(text: string, gameObject: GameObject) {
        super(gameObject);
        this.text = text;
        Canvas.addUIElement(this);
    }

    update(): void {
        console.log(this.gameObject.objectName);
    }
    public onRender() {
        Canvas.context.fillStyle = this.color;
        Canvas.context.font = this.fontStyle;

        let textLines = this.text.split('\n');
        textLines.forEach((line, index) => {
            let textInfo = Canvas.context.measureText(line);
            let textHeight = (textInfo.actualBoundingBoxAscent + textInfo.actualBoundingBoxDescent)
            let x = this.transform.position.x - (textInfo.width / 2);
            let y = this.transform.position.y + (index * this.lineHeight) + (textHeight / 2);

            Canvas.context.fillText(line, x, y);
        });
    }
}