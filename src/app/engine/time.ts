import { Canvas } from "./qbcreates-js-engine";

export class Time extends Canvas{
    private static _fixedDeltaTime = 0.02;
    private static _startTime = 0;
    static get deltaTime() {
        return Canvas.deltaTime / 1000;
    }

    static get fixedDeltaTime() {
        return this._fixedDeltaTime;
    }

    static set fixedDeltaTime(time) {
        this._fixedDeltaTime = time;
    }

    static get time() {
        return (new Date().getTime() - Time._startTime) / 1000;
    }

    // Acts as a private static constructor 
    protected static __ctor = (() => {      
        Time._startTime = new Date().getTime();
    })();
}