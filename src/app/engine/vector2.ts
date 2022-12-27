export class Vector2 {
    private _x: number = 0;
    private _y: number = 0;

    get x() {
        return this._x;
    }

    set x(value: number) {
        this._x = value;
    }

    get y() {
        return this._y;
    }

    set y(value: number) {
        this._y = value;
    }

    get magnitude() {
        return Math.sqrt((this._x ** 2) + (this._y ** 2));
    }

    static get up() {
        return new Vector2(0, 1);
    }

    static get down() {
        return new Vector2(0, -1);
    }

    static get left() {
        return new Vector2(-1, 0);
    }

    static get right() {
        return new Vector2(1, 0);
    }

    static get zero() {
        return new Vector2(0, 0);
    }

    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    /**
     * Nomalizes the vector to where its magnitude is equal to 1 unit.
     * @returns {Vector2} - Return the normalized Vector
     */
    normalize() {
        if (this.magnitude == 0) {
            return new Vector2(0, 0);
        }
        let xN = this._x / this.magnitude;
        let yN = this._y / this.magnitude;

        return new Vector2(xN, yN);
    }

    /**
     * Adds two Vector2 objects together and returns the result as a Vector2.
     * @param {Vector2} vectorA 
     * @param {Vector2} vectorB 
     * @returns {Vector2} - Returns the sum of the two Vectors.
     */
    static add(...vectors: Vector2[]): Vector2 {
        let x = 0;
        let y = 0;
        vectors.forEach(vector => {
            x = x + vector.x;
            y = y + vector.y;
        });

        return new Vector2(x, y);
    }

    /**
     * Subtracts two Vector2 objects and returns the result as a Vector2.
     * @param {Vector2} vectorA 
     * @param {Vector2} vectorB 
     * @returns {Vector2} - Returns the difference of the two Vectors.
     */
    static subtract(vectorA: Vector2, vectorB: Vector2): Vector2 {
        let x = vectorA.x - vectorB.x;
        let y = vectorA.y - vectorB.y;

        return new Vector2(x, y);
    }

    /**
     * Multiplies the Vector2 by a number. Returns the result as a Vector.
     * @param {Vector2} vectorA 
     * @param {number} num 
     * @returns Returns the product as a Vector2.
     */
    static multiply(vectorA: Vector2, num: number): Vector2 {
        return new Vector2(vectorA.x * num, vectorA.y * num);
    }

    static divide(vectorA: Vector2, num: number) {
        return new Vector2(vectorA.x / num, vectorA.y / num);
    }
}