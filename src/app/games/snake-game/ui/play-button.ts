import { Subscription } from "rxjs";
import { MonoBehaviour } from "src/app/engine/mono-behaviour";
import { ButtonUI } from "src/app/engine/ui/button-ui";
import { GameStateManager } from "../managers/game-state-manager";

export class PlayButton extends MonoBehaviour {
    private _playButton: ButtonUI = null;
    private _playButtonSubscription: Subscription = null;
    
    awake(): void {
        GameStateManager.gameStateEvent.subscribe(isStarted => {
            if (!isStarted) {
                this.gameObject.isActive = true;
            }
        });

        this._playButton = this.gameObject.getComponent(ButtonUI);
        this._playButtonSubscription = this._playButton.clickEvent.subscribe(onClick => {
            if (!onClick) {
                this.gameObject.isActive = false;
                GameStateManager.onGameStart();
            }
        });
    }
}