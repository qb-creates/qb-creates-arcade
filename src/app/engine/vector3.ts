
export class Vector3 {
    private _x: number = 0;
    private _y: number = 0;
    private _z: number = 0;

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    get z() {
        return this._z;
    }

    get magnitude() {
        return Math.sqrt((this._x ** 2) + (this._y ** 2) + (this._z ** 2));
    }

    constructor(x, y, z) {
        this._x = x;
        this._y = y;
        this._z = z;
    }

    /**
     * 
     * @returns Return the vector normalized where its magnitude is equal to 1 unit.
     */
    normalize() {
        let xN = this._x / this.magnitude;
        let yN = this._y / this.magnitude;
        let zN = this._z / this.magnitude;

        return new Vector3(xN, yN, zN);
    }

    static add(vectorA, vectorB) {
        let x = vectorA.x + vectorB.x;
        let y = vectorA.y + vectorB.y;
        let z = vectorA.z + vectorB.z;

        return new Vector3(x, y, z);
    }

    static subtract(vectorA, vectorB) {
        let x = vectorA.x - vectorB.x;
        let y = vectorA.y - vectorB.y;
        let z = vectorA.z - vectorB.z;

        return new Vector3(x, y, z);
    }

    static multiply(vectorA, num) {
        return new Vector3(vectorA.x * num, vectorA.y * num, vectorA.z * num);
    }
}