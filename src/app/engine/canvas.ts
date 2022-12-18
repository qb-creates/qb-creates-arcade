import { SpriteRenderer } from "./sprite-renderer";
import { BoxCollider } from "./box-collider";
import { MonoBehaviour } from "./mono-behaviour";
import { QObject } from "./q-object";
import { Vector2 } from "./vector2";
import { Subject } from "rxjs";
import { GameObject } from "./game-object";

export class Canvas {
    public static canvasUpdate = new Subject<boolean>();
    private static _canvas = null;
    private static _context = null;
    private static _ppu = 25;
    private static _previousTimestamp = 0;
    private static _gameObjectList: GameObject[] = [];
    private static _colliderList = [];
    private static _mousePosition = new Vector2(0, 0);

    static get canvasWidth() {
        return Canvas._canvas.width;
    }

    static set canvasWidth(value) {
        Canvas._canvas.width = value;
    }

    static get canvasHeight() {
        return Canvas._canvas.height;
    }

    static set canvasHeight(value) {
        Canvas._canvas.height = value;
    }

    static get ppu() {
        return Canvas._ppu;
    }

    static set ppu(value) {
        Canvas._ppu = value;
    }

    static get context() {
        return Canvas._context;
    }

    static get mousePosition() {
        return Canvas._mousePosition;
    }

    constructor() {
        if (Canvas instanceof Canvas) {
            throw new Error("A static class cannot be instantiated.");
        }
    }

    /**
     * Will set the size of the canvas and how many pixels are in one unit on the grid.
     * @param {number} canvasWidth - Width of the canvas in pixels. 
     * @param {number} canvasHeight - Height of the canvas in pixels.
     * @param {number} ppu - Pixels Per Unit.
     */
    static configureCanvas(canvasWidth, canvasHeight, ppu) {
        Canvas._ppu = ppu;
        Canvas._canvas = document.createElement('canvas');
        Canvas._canvas.style = `border: 0px solid white; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);`;
        Canvas._canvas.width = canvasWidth;
        Canvas._canvas.height = canvasHeight;
        Canvas._context = Canvas._canvas.getContext('2d');

        // Flips the Y axis. Makes it so that positive y values move north on the grid and negative values move south.
        Canvas._context.transform(1, 0, 0, -1, 0, canvasHeight);

        // Makes it so that (0, 0) is the center of our canvas
        Canvas._context.translate(canvasWidth / 2, canvasHeight / 2);

        // Will be used to track our mouse position on the canvas.
        Canvas._canvas.addEventListener("mousemove", function (evt) {
            let rect = Canvas._canvas.getBoundingClientRect();

            // Find mouse X and Y coordinates on the canvas by subtracting the mouse's global 
            // X and Y coordinates from the left and top location of the canvas.
            let x = (evt.clientX - rect.left);
            let y = (evt.clientY - rect.top);

            // Center the x coordinate in the screen by subtracting half of the canvas width from the x coordinate.
            x = (x - (Canvas.canvasWidth / 2)) / Canvas.ppu;

            // Center the y coordinate in the screen by subtracting half of the canvas height from the y coordinate.
            // Flip the y value direction by multiplying by -1.
            y = -1 * (y - (Canvas.canvasHeight / 2)) / Canvas.ppu;

            Canvas._mousePosition = new Vector2(x, y);
        }, false);

        document.body.appendChild(Canvas._canvas);
        requestAnimationFrame(Canvas.updateCanvas);
    }

    /**
     * Adds a gameobject to the list of objects that need to be rendered.
     * @param {GameObject} gameObject - The object the needs to be rendered.
     */
    static addGameObject(gameObject: GameObject) {
        console.log();
        Canvas._gameObjectList.push(gameObject);
        console.log();
    }

    /**
     * Will add the collider to the list of colliders that that are periodically compared against for collision detection.
     * @param {BoxCollider} collider - The collider that needs to be added to the collider list. 
     */
    static addCollider(collider) {
        Canvas._colliderList.push(collider);
    }

    /**
     * Removes a gameObject from the list of objects that need to be rendered
     * @param {GameObject} gameObject - The object that needs to be removed.
     */
    static removeGameObject(gameObject) {
        gameObject.getComponents(BoxCollider).forEach(collider => {
            let colliderIndex = Canvas._colliderList.indexOf(collider);

            if (colliderIndex >= 0) {
                Canvas._colliderList.splice(colliderIndex, 1);
            }
        });

        let gameObjectIndex = Canvas._gameObjectList.indexOf(gameObject);

        if (gameObjectIndex >= 0) {
            let gameObject = Canvas._gameObjectList.splice(gameObjectIndex, 1);

            gameObject[0].children.forEach(child => {
                QObject.destroy(child);
            });

            gameObject = null;
        }
    }

    private static updateCanvas = (timestamp) => {
        Canvas._context.clearRect(-Canvas._canvas.width / 2, -Canvas._canvas.height / 2, Canvas._canvas.width, Canvas._canvas.height);
        Canvas.renderSprites(Canvas._gameObjectList);
        Canvas.collisionCheck();
        Canvas.drawGrid();
        // TODO set Time.delta dime equal to timestamp - previousTimestamp
        // console.log(timestamp - Canvas._previousTimestamp);
        Canvas._previousTimestamp = timestamp;
        Canvas.canvasUpdate.next();
        requestAnimationFrame(Canvas.updateCanvas);
    }

    private static drawGrid() {
        //if (document.getElementById("grid").checked) {
        let cellCount = Canvas.canvasHeight / (Canvas.ppu * 2);

        for (let i = -cellCount; i < cellCount; i++) {
            for (let j = -cellCount; j < cellCount; j++) {
                Canvas._context.strokeStyle = '#80808011';
                Canvas._context.beginPath();
                Canvas._context.roundRect(i * Canvas.ppu, j * Canvas.ppu, Canvas.ppu, Canvas.ppu, [0]);
                Canvas._context.stroke();
            }
        }
        //}
    }

    private static renderSprites(gameObjects) {

        // Sort the items by layer value.
        gameObjects.sort((gameObjectA, gameObjectB) => {
            return gameObjectA.layer - gameObjectB.layer;
        });
        
        // Render Sprites
        gameObjects.forEach((gameObject) => {
            let renderer = gameObject.getComponent(SpriteRenderer);

            if (renderer) {
                renderer.sprite(renderer);
            }
        });
    }

    private static collisionCheck() {
        Canvas._colliderList.forEach((collider) => {
            let count = collider.collisionList.size;

            for (let i = 0; i < Canvas._colliderList.length; i++) {
                if (collider != Canvas._colliderList[i]) {
                    collider.checkForCollision(Canvas._colliderList[i]);
                }
            }

            if (count < collider.collisionList.size) {
                collider.gameObject.getComponents(MonoBehaviour).forEach(mono => {
                    mono.onTriggerEnter(collider.collisionList);
                });
            } else if (count > collider.collisionList.size) {
                collider.gameObject.getComponents(MonoBehaviour).forEach(mono => {
                    mono.onTriggerExit(collider.collisionList);
                });
            }

            // Render Colliders
            //if (document.getElementById("colliders").checked) {
            collider.render();
            //}
        });
    }
}