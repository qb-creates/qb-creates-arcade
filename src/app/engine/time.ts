import { Canvas } from "./qbcreates-js-engine";

export class Time extends Canvas{
    private static _fixedDeltaTime = 0.02;
    private static _previousTimeStamp = 0;
    private static _currentTimeStamp = 0;
    
    static get deltaTime() {
        return 1/60;
    }

    static get fixedDeltaTime() {
        return this._fixedDeltaTime;
    }

    static set fixedDeltaTime(time) {
        this._fixedDeltaTime = time;
    }
}