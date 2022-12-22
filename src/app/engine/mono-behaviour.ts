import { Subscription } from "rxjs";
import { ComponentObject, ObjectBase } from "./q-object";
import { Time, Component, Canvas, GameObject, BoxCollider } from "./qbcreates-js-engine";

export class MonoBehaviour extends Component {
    private _fixedUpdateInterval: ReturnType<typeof setTimeout> = null;
    private _canvasUpdateSubscription: Subscription = null;

    constructor(gameObject: GameObject) {
        super(gameObject);

        setTimeout(() => {
            this.awake();
            this.start();

            this._fixedUpdateInterval = setInterval(() => {
                if (this.gameObject.isActive) {

                    this.fixedUpdate();
                }
            }, Time.fixedDeltaTime * 1000);


            this._canvasUpdateSubscription = Canvas.canvasUpdate.subscribe(isStarted => {
                if (!this.gameObject.isDestroyed) {

                    this.CheckForDestroyedReferences();
                    this.update();
                }
            });
        });
    }

    destroy(): void {
        this._canvasUpdateSubscription.unsubscribe();
        clearInterval(this._fixedUpdateInterval);
    }

    awake(): void {
    }

    start(): void {
    }

    update(): void {
    }

    fixedUpdate() {
    }

    onTriggerEnter(colliders: BoxCollider[]) {
    }

    onTriggerExit(colliders: BoxCollider[]) {
    }

    private CheckForDestroyedReferences() {
        let propertyDescriptors = Object.getOwnPropertyDescriptors(this);

        Object.entries(propertyDescriptors).forEach(descriptor => {
            let key = descriptor[0];
            let value = descriptor[1].value;

            if (value instanceof GameObject && value.isDestroyed) {
                if (!key.includes('_'))
                    Reflect.set(this, key, null)
            }
        })
    }
}

/**
 * 
 */
export class MonoBehaviourObject extends ObjectBase {
    private _scriptType: typeof Component = null;

    constructor(scriptType: typeof Component) {
        super();
        this._scriptType = scriptType;
    }

    public returnInterface(): ComponentObject {
        let spriteRenderer: ComponentObject = {
            component: this._scriptType,
            properties: {}
        }

        return spriteRenderer;
    }
}