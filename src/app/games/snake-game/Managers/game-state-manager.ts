import { Subject } from "rxjs";

export class GameStateManager {
    private static _gameStateEvent = new Subject<boolean>();
    private static _isStarted:boolean = false;

    static get gameStateEvent() {
        return this._gameStateEvent;
    }

    static onGameStart() {
        this._isStarted = !this._isStarted;
        this._gameStateEvent.next(this._isStarted);
    }

    static onGameOver() {
        this._isStarted = false;
        this._gameStateEvent.next(this._isStarted);
    }
}