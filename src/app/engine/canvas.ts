import { SpriteRenderer } from "./sprite-renderer";
import { BoxCollider } from "./box-collider";
import { MonoBehaviour } from "./mono-behaviour";
import { QObject } from "./q-object";
import { Vector2 } from "./vector2";
import { Subject } from "rxjs";
import { GameObject } from "./game-object";
import { UIBehaviour } from "./ui/ui-behaviour";
import { PlayerInput } from "./player-input";

export abstract class Canvas {
    public static canvasUpdate: Subject<boolean> = new Subject<boolean>();
    private static _canvas: HTMLCanvasElement = null;
    private static _context = null;
    private static _canvasHeight: number = 0;
    private static _canvasWidth: number = 0;
    private static _ppu: number = 25;
    private static _previousTimestamp: number = 0;
    private static _gameObjectList: GameObject[] = [];
    private static _colliderList: BoxCollider[] = [];
    private static _uiList: UIBehaviour[] = [];
    private static _mousePosition = new Vector2(0, 0);
    private static _showGrid: boolean = false;
    private static _showColliders: boolean = false;
    protected static deltaTime: number = 0;

    static get canvasWidth() {
        return Canvas._canvasWidth;
    }

    static set canvasWidth(value: number) {
        Canvas._canvasWidth = value;
    }

    static get canvasHeight() {
        return Canvas._canvasHeight
    }

    static set canvasHeight(value: number) {
        Canvas._canvasHeight = value;
    }

    static get ppu() {
        return Canvas._ppu;
    }

    static set ppu(value: number) {
        Canvas._ppu = value;
    }

    static get showGrid() {
        return this._showGrid;
    }

    static set showGrid(value: boolean) {
        this._showGrid = value;
    }

    static get showColliders() {
        return this._showColliders;
    }

    static set showColliders(value: boolean) {
        this._showColliders = value;
    }

    static get context() {
        return Canvas._context;
    }

    static get mousePosition() {
        return Canvas._mousePosition;
    }

    /**
     * Will set the size of the canvas and how many pixels are in one unit on the grid.
     * @param {number} canvasWidth - Width of the canvas in pixels. 
     * @param {number} canvasHeight - Height of the canvas in pixels.
     * @param {number} ppu - Pixels Per Unit.
     */
    public static configureCanvas(canvasWidth: number, canvasHeight: number, ppu: number) {
        Canvas.ppu = ppu;
        Canvas._canvasHeight = canvasHeight;
        Canvas._canvasWidth = canvasWidth;
        Canvas._canvas.width = canvasWidth;
        Canvas._canvas.height = canvasHeight;

        // Makes it so that (0, 0) is the center of our canvas
        Canvas._context.translate(canvasWidth / 2, canvasHeight / 2);
    }

    /**
     * Adds a gameobject to the list of objects that need to be rendered.
     * @param {GameObject} gameObject - The object the needs to be rendered.
     */
    public static addGameObject(gameObject: GameObject) {
        Canvas._gameObjectList.push(gameObject);
    }

    /**
     * Will add the collider to the list of colliders that that are periodically compared against for collision detection.
     * @param {BoxCollider} collider - The collider that needs to be added to the collider list. 
     */
    public static addCollider(collider: BoxCollider) {
        Canvas._colliderList.push(collider);
    }

    /**
     * Will add the ui element to the list of ui that will be rendered.
     * @param {UIBehaviour} ui - The ui element that needs to be rendered.
     */
    public static addUIElement(ui: UIBehaviour) {
        Canvas._uiList.push(ui);
    }

    /**
     * Removes a gameObject from the list of objects that need to be rendered
     * @param {GameObject} gameObject - The object that needs to be removed.
     */
    public static removeGameObject(gameObject: GameObject) {
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
        Canvas.renderSprites();
        Canvas.collisionCheck();
        Canvas.drawGrid();
        Canvas.renderUI();
        Canvas.renderFPS();
        Canvas.deltaTime = (timestamp - Canvas._previousTimestamp);
        Canvas._previousTimestamp = timestamp;
        Canvas.canvasUpdate.next();
        PlayerInput.clearKeyStatus();
        let a = new Image();
        a.src = './assets/Square.png';
        Canvas._context.drawImage(a, 0, 0, 25, 25)
        var myImg = Canvas._context.getImageData(0, 0, Canvas.canvasWidth, Canvas.canvasHeight);
        let pix = myImg.data;
        let n    = pix.length;

         for (let i = 0; i < n; i += 4) { 
             if (pix[i + 3] > 0) { 
                 pix[i    ] = 255;       // red   - values 0 to 255
                 pix[i + 1] = 255;       // green - values between 0 and 255
                 pix[i + 2] = 0;       // blue  - values between 0 and 255
                 pix[i + 3] = 1 * 255; // alpha in canvas from 0 to 255, instead between 0 and 1. 
             } 
         } 
         Canvas._context.putImageData(myImg, 0, 0); 
        requestAnimationFrame(Canvas.updateCanvas);
    }

    private static drawGrid() {
        if (this._showGrid) {
            let cellCountHeight = Math.round(Canvas.canvasHeight / (Canvas.ppu * 2));
            let cellCountWidth = Math.round(Canvas.canvasWidth / (Canvas.ppu * 2));
            for (let i = -cellCountWidth; i < cellCountWidth; i++) {
                for (let j = -cellCountHeight; j < cellCountHeight; j++) {
                    Canvas._context.strokeStyle = '#80808011';
                    Canvas._context.beginPath();
                    Canvas._context.roundRect((i - .5) * Canvas.ppu, (j - .5) * Canvas.ppu, Canvas.ppu, Canvas.ppu, [0]);
                    Canvas._context.stroke();
                }
            }
        }
    }

    private static renderSprites() {

        // Sort the items by layer value.
        Canvas._gameObjectList.sort((gameObjectA, gameObjectB) => {
            return gameObjectA.layer - gameObjectB.layer;
        });

        // Render Sprites
        Canvas._gameObjectList.forEach((gameObject) => {
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
            if (this._showColliders) {
                collider.render();
            }
        });
    }

    private static renderUI() {
        Canvas._gameObjectList.forEach(gameObject => {
            let uiList: UIBehaviour[] = gameObject.getComponents(UIBehaviour);
            uiList.forEach(ui => {
                ui.render();
            });
        })
    }

    private static renderFPS() {
        Canvas.context.fillStyle = 'green';
        Canvas.context.font = '30px Arial';

        let x = (20 * Canvas.ppu);
        let y = (-1 * 13 * Canvas.ppu);
        Canvas.context.fillText(`${Math.round(1000 / Canvas.deltaTime)} fps`, x, y);
    }

    // Acts as a private static constructor 
    private static __ctor = (() => {
        Canvas._canvas = <HTMLCanvasElement>document.getElementById('canvas');
        Canvas._context = Canvas._canvas.getContext('2d') as CanvasRenderingContext2D;

        // Will be used to track our mouse position on the canvas.
        addEventListener("mousemove", function (evt) {
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

        // Disables the right click menu from appearing.
        addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });

        requestAnimationFrame(Canvas.updateCanvas);
    })();
}
