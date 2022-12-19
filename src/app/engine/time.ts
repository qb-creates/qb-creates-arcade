import { Canvas } from "./qbcreates-js-engine";

export class Time extends Canvas{
    private static _fixedDeltaTime = 0.02;
    
    static get deltaTime() {
        return Canvas.deltaTime / 1000;
    }

    static get fixedDeltaTime() {
        return this._fixedDeltaTime;
    }

    static set fixedDeltaTime(time) {
        this._fixedDeltaTime = time;
    }
}