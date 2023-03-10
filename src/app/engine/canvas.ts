import { SpriteRenderer } from "./sprite-renderer";
import { BoxCollider } from "./box-collider";
import { MonoBehaviour } from "./mono-behaviour";
import { Prefab, QObject } from "./q-object";
import { Vector2 } from "./vector2";
import { Subject } from "rxjs";
import { GameObject } from "./game-object";
import { UIBehaviour } from "./ui/ui-behaviour";
import { PlayerInput } from "./player-input";
import { SpriteShape } from "./sprite-shape";
import { Sprite } from "./sprite";
import { ButtonUI } from "./ui/button-ui";
import { ButtonInterface, LabelInterface } from "./component-interface";
import { LabelUI } from "./ui/label-ui";
import { Rigidbody2d } from "./rigidbody2d";
import { SpriteSheet } from "./sprite-sheet";

export abstract class Canvas {
    public static canvasUpdate: Subject<boolean> = new Subject<boolean>();
    private static _canvas: HTMLCanvasElement = null;
    private static _context = null;
    private static _canvasHeight: number = 0;
    private static _canvasWidth: number = 0;
    private static _ppu: number = 25;
    private static _previousTimestamp: number = 0;
    private static _gameObjectList: GameObject[] = [];
    public static _colliderList: BoxCollider[] = [];
    private static _uiList: UIBehaviour[] = [];
    private static _mousePosition = new Vector2(0, 0);
    private static _showGrid: boolean = false;
    private static _showColliders: boolean = false;
    private static _showGridButtonObject: ButtonUI = null;
    private static _showColliderButtonObject: ButtonUI = null;
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
    public static configureCanvas(canvasWidth: number, canvasHeight: number, ppu: number, showDebugTools: boolean) {
        Canvas.ppu = ppu;
        Canvas._canvasHeight = canvasHeight;
        Canvas._canvasWidth = canvasWidth;
        Canvas._canvas.width = canvasWidth;
        Canvas._canvas.height = canvasHeight;

        // Makes it so that (0, 0) is the center of our canvas.
        Canvas._context.translate(canvasWidth / 2, canvasHeight / 2);

        // Globally centers all text on the canvas.
        Canvas.context.textBaseline = 'middle';
        Canvas.context.textAlign = "center";
        if (showDebugTools) {
            Canvas.ShowDebugTools();
        }
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

    private static updateCanvas = (timestamp: number) => {
        Canvas.deltaTime = (timestamp - Canvas._previousTimestamp);
        Canvas._context.clearRect(-Canvas._canvas.width / 2, -Canvas._canvas.height / 2, Canvas._canvas.width, Canvas._canvas.height);
        Canvas.renderSprites();
        Canvas.renderUI();
        Canvas.drawGrid();
        Canvas.renderFPS();
        Canvas.MoveRigidBodies();
        Canvas.collisionCheck();
        Canvas._previousTimestamp = timestamp;
        Canvas.canvasUpdate.next();
        PlayerInput.clearKeyStatus();
        requestAnimationFrame(Canvas.updateCanvas);
    }

    private static drawGrid() {
        if (this._showGrid) {
            let cellCountHeight = Math.round(Canvas.canvasHeight / (Canvas.ppu * 2));
            let cellCountWidth = Math.round(Canvas.canvasWidth / (Canvas.ppu * 2));
            for (let i = -cellCountWidth; i < cellCountWidth; i++) {
                for (let j = -cellCountHeight; j < cellCountHeight; j++) {
                    Canvas._context.strokeStyle = '#80808011';
                    Canvas.context.globalAlpha = 1;
                    Canvas.context.lineWidth = 1;
                    Canvas._context.beginPath();
                    Canvas._context.roundRect((i * Canvas.ppu), (j * Canvas.ppu), Canvas.ppu, Canvas.ppu, [0]);
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
            let renderer: SpriteRenderer = gameObject.getComponent(SpriteRenderer);

            if (renderer) {
                if (renderer.sprite instanceof SpriteSheet) {
                    let sW = renderer.sprite.sW;
                    let sH = renderer.sprite.sH;
                    let sX = renderer.sprite.sX * sW + 1;
                    let sY = renderer.sprite.sY * sH + 1;

                    let w = Canvas.ppu * gameObject.transform.scale.x * 3;
                    let h = Canvas.ppu * gameObject.transform.scale.y * 3;

                    let x = Canvas.ppu * (gameObject.transform.position.x - 0.5);
                    let y = -Canvas.ppu * (gameObject.transform.position.y + 0.5);

                    x = x + (Canvas.ppu - w) / 2;
                    y = y + (Canvas.ppu - h) / 2;
                    Canvas.context.globalAlpha = renderer.transparency;
                    Canvas._context.drawImage(renderer.sprite.image, sX, sY, sW, sH, x, y, w, h)
                }
                else if (renderer.sprite instanceof Sprite) {
                    let w = Canvas.ppu * gameObject.transform.scale.x * 3;
                    let h = Canvas.ppu * gameObject.transform.scale.y * 3;

                    let x = Canvas.ppu * (gameObject.transform.position.x - 0.5);
                    let y = -Canvas.ppu * (gameObject.transform.position.y + 0.5);

                    x = x + (Canvas.ppu - w) / 2;
                    y = y + (Canvas.ppu - h) / 2;
                    Canvas.context.globalAlpha = renderer.transparency;
                    Canvas._context.drawImage(renderer.sprite.image, x, y, w, h)
                } else {
                    (renderer.sprite as SpriteShape).drawShape(renderer);
                }
            }
            // Render Colliders
            if (this._showColliders) {
                let colliders = gameObject.getComponents(BoxCollider);

                colliders.forEach(collider => {
                    collider.render();
                });
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
        });
    }

    private static renderUI() {
        Canvas._gameObjectList.forEach(gameObject => {
            let uiList: UIBehaviour[] = gameObject.getComponents(UIBehaviour);
            uiList.forEach(ui => {
                if (gameObject.isActive) {
                    ui.render();
                }
            });
        })
    }

    private static renderFPS() {
        Canvas.context.fillStyle = 'green';
        Canvas.context.font = 'bold 20px Arial';

        let x = (20 * Canvas.ppu);
        let y = (-1 * 13 * Canvas.ppu);
        Canvas.context.fillText(`${Math.round(1000 / Canvas.deltaTime)} fps`, x, y);
    }

    private static MoveRigidBodies() {
        Canvas._gameObjectList.forEach((gameObject) => {
            let rigidbody = gameObject.getComponent(Rigidbody2d);
            if (rigidbody != null) {
                rigidbody.applyPhysics();
            }
        });
    }

    private static ShowDebugTools() {
        if (!Canvas._showColliderButtonObject && !Canvas._showGridButtonObject) {
            let showColliderPrefab: Prefab = {
                children: [],
                layer: 0,
                objectName: 'Show Colliders button',
                position: new Vector2(-Canvas.canvasWidth / (2.1 * Canvas.ppu), Canvas.canvasHeight / (2.15 * Canvas.ppu)),
                scale: new Vector2(.6, .6),
                components: [
                    {
                        component: ButtonUI,
                        properties: <ButtonInterface>{
                            text: '',
                            font: 'Monospace',
                            textSize: 20,
                            textColor: 'white',
                            buttonColor: 'white',
                            bold: false
                        }
                    }
                ]
            }

            let showColliderLabelPrefab: Prefab = {
                children: [],
                layer: 0,
                objectName: 'Show Colliders label',
                position: new Vector2(-Canvas.canvasWidth / (2.5 * Canvas.ppu), Canvas.canvasHeight / (2.165 * Canvas.ppu)),
                scale: new Vector2(1, 1),
                components: [
                    {
                        component: LabelUI,
                        properties: <LabelInterface>{
                            text: 'Show Colliders',
                            font: 'Monospace',
                            textSize: 20,
                            textColor: 'white',
                            bold: true
                        }
                    }
                ]
            }

            Canvas._showColliderButtonObject = QObject.instantiate(showColliderPrefab).getComponent(ButtonUI);
            Canvas._showColliderButtonObject.borderThickness = 5;
            Canvas._showColliderButtonObject.borderRadius = 0;
            Canvas._showColliderButtonObject.clickEvent.subscribe(buttonState => {
                Canvas._showColliders = buttonState.toggled;
                if (buttonState.toggled) {
                    Canvas._showColliderButtonObject.buttonColor = 'blue'
                } else {
                    Canvas._showColliderButtonObject.buttonColor = 'white'
                }
            });
            QObject.instantiate(showColliderLabelPrefab);

            let showGridPrefab: Prefab = {
                children: [],
                layer: 0,
                objectName: 'Show Grid button',
                position: new Vector2(-Canvas.canvasWidth / (2.1 * Canvas.ppu), Canvas.canvasHeight / (2.35 * Canvas.ppu)),
                scale: new Vector2(.6, .6),
                components: [
                    {
                        component: ButtonUI,
                        properties: <ButtonInterface>{
                            text: '',
                            font: 'Monospace',
                            textSize: 20,
                            textColor: 'white',
                            buttonColor: 'white',
                            bold: false
                        }
                    }
                ]
            }

            let showGridLabelPrefab: Prefab = {
                children: [],
                layer: 0,
                objectName: 'Show Grid label',
                position: new Vector2(-Canvas.canvasWidth / (2.37 * Canvas.ppu), Canvas.canvasHeight / (2.365 * Canvas.ppu)),
                scale: new Vector2(1, 1),
                components: [
                    {
                        component: LabelUI,
                        properties: <LabelInterface>{
                            text: 'Show Grid',
                            font: 'Monospace',
                            textSize: 20,
                            textColor: 'white',
                            bold: true
                        }
                    }
                ]
            }

            Canvas._showGridButtonObject = QObject.instantiate(showGridPrefab).getComponent(ButtonUI);
            Canvas._showGridButtonObject.borderThickness = 5;
            Canvas._showGridButtonObject.borderRadius = 0;
            Canvas._showGridButtonObject.clickEvent.subscribe(buttonState => {
                Canvas._showGrid = buttonState.toggled;
                if (buttonState.toggled) {
                    Canvas._showGridButtonObject.buttonColor = 'blue'
                } else {
                    Canvas._showGridButtonObject.buttonColor = 'white'
                }
            });
            QObject.instantiate(showGridLabelPrefab);
        }
    }

    // Acts as a private static constructor 
    protected static __ctor = (() => {
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
