import { Subscription } from "rxjs";
import { MonoBehaviour } from "src/app/engine/mono-behaviour";
import { ButtonUI } from "src/app/engine/ui/button-ui";
import { LabelUI } from "src/app/engine/ui/label-ui";
import { Vector2 } from "src/app/engine/vector2";
import { GameStateManager } from "../managers/game-state-manager";

export class PlayButton extends MonoBehaviour {
    private _playButton: ButtonUI = null;

    awake(): void {
        GameStateManager.gameStateEvent.subscribe(isStarted => {
            if (!isStarted) {
                this.gameObject.isActive = true;
            }
        });

        this._playButton = this.gameObject.getComponent(ButtonUI);
        this._playButton.clickEvent.subscribe(onClick => {
            if (!onClick) {
                this.gameObject.isActive = false;
                GameStateManager.onGameStart();
            }
        });

        let label = this.gameObject.getComponent(LabelUI);
        label.positionOffset = new Vector2(0, .15);
    }
}