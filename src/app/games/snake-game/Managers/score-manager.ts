import { LabelUI } from "src/app/engine/ui/label-ui";

export class ScoreManager {
    public static scoreText: LabelUI = null;
    private static _score: number = 0;

    static addPoint() {
        this._score++;
        this.scoreText.text = `Score\n${this._score}`;
    }
}