import { GameObject, QObject, Transform } from "./qbcreates-js-engine";

export class Component extends QObject {
    private _transform: Transform = null;
    private _enabled: boolean = true;
    private _gameObject: GameObject = null;

    get gameObject() {
        return this._gameObject;
    }

    get enabled() {
        return this._enabled;
    }

    set enabled(value) {
        this._enabled = value;
    }

    get transform() {
        return this._transform;
    }

    set transform(value) {
        this._transform = value;
    }

    constructor(gameObject: GameObject) {
        super();
        this._gameObject = gameObject;
        this._transform = gameObject.transform;
    }
}