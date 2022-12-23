import { Canvas } from "../canvas";
import { GameObject } from "../game-object";
import { ComponentObject } from "../q-object";
import { Vector2 } from "../vector2";
import { UIBehaviour } from "./ui-behaviour";

export class LabelUI extends UIBehaviour {
    public transparency: number = 1;
    public text: string = '';
    public textColor: string = 'white';
    public bold: boolean = false;
    public textSize: number = 30;
    public font: string = 'Monospace';
    public positionOffset: Vector2 = new Vector2(0, 0);
    private _lineHeight: number = 30;

    constructor(gameObject: GameObject) {
        super(gameObject);
    }
    
    public render(): void {
        Canvas.context.fillStyle = this.textColor;
        Canvas.context.font = `${this.bold ? 'bold': ''} ${this.textSize}px ${this.font}`;

        let textLines = this.text.split('\n');
        let lineHeight = this.textSize;
        let verticalCenterOffset = (textLines.length  - 1) * lineHeight / 2; 
        textLines.forEach((line, index) => {
            let x = (this.transform.position.x + this.positionOffset.x) * Canvas.ppu;
            let y = (-1 * (this.transform.position.y + this.positionOffset.y) * Canvas.ppu) + (index * lineHeight) - verticalCenterOffset;
            Canvas.context.fillText(line, x, y);
        });
    }
}