import { Guid } from "guid-typescript";
import { Subscription } from "rxjs";
import { Physics2d } from "./physics2d";
import { ComponentObject } from "./q-object";
import { Time, Component, Canvas, GameObject, BoxCollider, Rigidbody2d } from "./qbcreates-js-engine";

export class MonoBehaviour extends Component {
    private _fixedUpdateInterval: ReturnType<typeof setTimeout> = null;
    private _canvasUpdateSubscription: Subscription = null;
    private _physicsUpdateSubscription: Subscription = null;

    constructor(gameObject: GameObject) {
        super(gameObject);

        setTimeout(() => {
            this.awake();
            this.start();

            this._physicsUpdateSubscription = Physics2d.physicsUpdate.subscribe(update => {
                if (this.gameObject.isActive) {
                    this.fixedUpdate();
                }
            });

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
        this._physicsUpdateSubscription.unsubscribe();
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

    onTriggerEnter(colliders: Map<Guid, BoxCollider>) {
    }

    onTriggerExit(colliders: Map<Guid, BoxCollider>) {
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
export class MonoBehaviourObject {
    private _scriptType: typeof Component = null;

    constructor(scriptType: typeof Component) {
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