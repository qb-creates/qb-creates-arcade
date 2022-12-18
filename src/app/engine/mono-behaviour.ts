import { Time, Component, Canvas, GameObject } from "./qbcreates-js-engine";

export class MonoBehaviour extends Component {
    private _fixedUpdateInterval = null;
    private _canvasUpdateSubscription = null;

    constructor(gameObject) {
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

    destroy() {
        this._canvasUpdateSubscription.unsubscribe();
        clearInterval(this._fixedUpdateInterval);
    }

    awake() {
    }

    start() {
    }

    update() {
    }

    fixedUpdate() {
    }

    onTriggerEnter(colliders) {
    }

    onTriggerExit(colliders) {
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