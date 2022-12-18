import { Canvas, Component, Transform, SpriteRenderer, Vector2, BoxCollider, QObject } from "./qbcreates-js-engine";

export class GameObject extends QObject {
    public parent = null;
    private _objectName = '';
    private _scriptList = [];
    private _children = [];
    private _isDestroyed = false;
    private _transform = null;
    private _layer = 0;
    private _isActive = true;
    
    get objectName() {
        return this._objectName;
    }

    set objectName(value) {
        this._objectName = value;
    }

    get layer() {
        return this._layer;
    }

    set layer(value) {
        this._layer = value;
    }

    get isActive() {
        return this._isActive;
    }

    set isActive(value) {
        this._isActive = value;
    }

    get isDestroyed() {
        return this._isDestroyed;
    }

    set isDestroyed(value) {
        this._isDestroyed = value;
    }

    get children() {
        return this._children;
    }
    set children(value) {
        this._children = value;
    }
    get transform() {
        return this._transform;
    }

    constructor(objectName) {
        super();
        this._objectName = objectName;
        this._transform = new Transform(this)
        this._scriptList.push(this._transform);
    }

    /**
     * Marks the gameObject and all of its references as Destroyed.
     */
    destroy() {
        this._isDestroyed = true;
    }

    /**
     * Adds the input gameObect to this gameObjects list of children.
     * @param {GameObject} gameObject 
     */
    addGameObject(gameObject) {
        gameObject.parent = this;
        gameObject.transform.position = Vector2.add(gameObject.transform.position, this.transform.position);
        this._children.unshift(gameObject);
    }

    getComponentInChildren() {

    }

    /**
     * Get a specific component from the gameObject. The first one listed will be returned.
     * @param {*} componentClass 
     * @returns The first one listed will be returned. Returns null if the script Type isn't found.
     */
    getComponent(componentClass) {
        if (this._scriptList) {
            return this._scriptList.find(component => component instanceof componentClass);
        }
        return null;
    }

    /**
     * Get a specific component from the gameObject. A list of all instances will be returned.
     * @param {*} componentClass - The class name of the component we want to get 
     * @returns A list of all instances will be returned. Returns null if the script Type isn't found.
     */
    getComponents(componentClass) {
        if (this._scriptList) {
            return this._scriptList.filter(component => component instanceof componentClass);
        }
        return null;
    }

    /**
     * This method will create a new instance of a component and attach it to this gameObject.
     * @param {Component} T - Class type of the component you want to created and add to this gameObject.
     * @returns {Component} Returns the newly created component.
     */
    addComponent(T) {
        if (T === Transform) {
            throw new Error(`Can not add another transform to ${this._objectName}.`);
        }

        if (T === SpriteRenderer && this._scriptList.find(component => component instanceof SpriteRenderer)) {
            throw new Error(`Can not add another SpriteRenderer to ${this._objectName}.`);
        }

        let component = new T(this);
        this._scriptList.push(component);

        if (component instanceof BoxCollider) {
            Canvas.addCollider(component);
        }
        return component
    }
} 