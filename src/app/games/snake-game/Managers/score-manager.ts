export class ScoreManager {
    private static _score: number = 0;

    static addPoint() {
        this._score++;
        let scoreLabel = document.getElementById('score');
        scoreLabel.innerHTML = this._score.toString();
    }
}