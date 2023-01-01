export class PlayerInput {
    private static _KeyStatus = {
        0: {
            key: false,
            keyDown: false,
            keyUp: false
        },
        2: {
            key: false,
            keyDown: false,
            keyUp: false
        },
        Space: {
            key: false,
            keyDown: false,
            keyUp: false
        },
        KeyA: {
            key: false,
            keyDown: false,
            keyUp: false
        },
        KeyB: {
            key: false,
            keyDown: false,
            keyUp: false
        },
        KeyC: {
            key: false,
            keyDown: false,
            keyUp: false
        },
        KeyD: {
            key: false,
            keyDown: false,
            keyUp: false
        },
        KeyE: {
            key: false,
            keyDown: false,
            keyUp: false
        },
        KeyQ: {
            key: false,
            keyDown: false,
            keyUp: false
        },
        KeyS: {
            key: false,
            keyDown: false,
            keyUp: false
        },
        KeyW: {
            key: false,
            keyDown: false,
            keyUp: false
        }
    }

    public static getKeyDown(keyCode) {
        return this._KeyStatus[keyCode].keyDown;
    }

    public static getKeyUp(keyCode) {
        return this._KeyStatus[keyCode].keyUp;
    }

    public static getKey(keyCode) {
        return this._KeyStatus[keyCode].key;
    }

    public static clearKeyStatus() {
        Object.entries(PlayerInput._KeyStatus).forEach(([key]) => {
            if (PlayerInput._KeyStatus[key].keyDown) {
                PlayerInput._KeyStatus[key].keyDown = false;
            }

            if (PlayerInput._KeyStatus[key].keyUp) {
                PlayerInput._KeyStatus[key].keyUp = false;
            }
        });
    }

    // Acts as a private static constructor 
    private static __ctor = (() => {
        addEventListener('keydown', (event) => {
            if (event.repeat) {
                return;
            }

            if (PlayerInput._KeyStatus.hasOwnProperty(event.code)) {
                PlayerInput._KeyStatus[event.code].keyUp = false;
                PlayerInput._KeyStatus[event.code].keyDown = true;
                PlayerInput._KeyStatus[event.code].key = true;
            }
        });

        addEventListener('keyup', (event) => {
            if (PlayerInput._KeyStatus.hasOwnProperty(event.code)) {
                PlayerInput._KeyStatus[event.code].keyDown = false;
                PlayerInput._KeyStatus[event.code].keyUp = true;
                PlayerInput._KeyStatus[event.code].key = false;
            }
        });

        addEventListener('mousedown', (event) => {
            if (PlayerInput._KeyStatus.hasOwnProperty(event.button)) {
                PlayerInput._KeyStatus[event.button].keyUp = false;
                PlayerInput._KeyStatus[event.button].keyDown = true;
                PlayerInput._KeyStatus[event.button].key = true;
            }
        });

        addEventListener('mouseup', (event) => {
            if (PlayerInput._KeyStatus.hasOwnProperty(event.button)) {
                PlayerInput._KeyStatus[event.button].keyDown = false;
                PlayerInput._KeyStatus[event.button].keyUp = true;
                PlayerInput._KeyStatus[event.button].key = false;
            }
        });
    })();
}

export const KeyCode = {
    0: '0',
    2: '2',
    Space: 'Space',
    KeyA: 'KeyA',
    KeyB: 'KeyB',
    KeyC: 'KeyC',
    KeyD: 'KeyD',
    KeyE: 'KeyE',
    KeyF: 'KeyF',
    KeyG: 'KeyG',
    KeyH: 'KeyH',
    KeyI: 'KeyI',
    KeyJ: 'KeyJ',
    KeyK: 'KeyK',
    KeyL: 'KeyL',
    KeyM: 'KeyM',
    KeyN: 'KeyN',
    KeyO: 'KeyO',
    KeyP: 'KeyP',
    KeyQ: 'KeyQ',
    KeyR: 'KeyR',
    KeyS: 'KeyS',
    KeyT: 'KeyT',
    KeyU: 'KeyU',
    KeyV: 'KeyV',
    KeyW: 'KeyW',
    KeyX: 'KeyX',
    KeyY: 'KeyY',
    KeyZ: 'KeyZ',
}