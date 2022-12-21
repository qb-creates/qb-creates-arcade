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
        a: {
            key: false,
            keyDown: false,
            keyUp: false
        },
        b: {
            key: false,
            keyDown: false,
            keyUp: false
        },
        c: {
            key: false,
            keyDown: false,
            keyUp: false
        },
        d: {
            key: false,
            keyDown: false,
            keyUp: false
        },
        q: {
            key: false,
            keyDown: false,
            keyUp: false
        },
        s: {
            key: false,
            keyDown: false,
            keyUp: false
        },
        w: {
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

            if (PlayerInput._KeyStatus.hasOwnProperty(event.key)) {
                PlayerInput._KeyStatus[event.key].keyUp = false;
                PlayerInput._KeyStatus[event.key].keyDown = true;
                PlayerInput._KeyStatus[event.key].key = true;
            }
        });

        addEventListener('keyup', (event) => {
            if (PlayerInput._KeyStatus.hasOwnProperty(event.key)) {
                PlayerInput._KeyStatus[event.key].keyDown = false;
                PlayerInput._KeyStatus[event.key].keyUp = true;
                PlayerInput._KeyStatus[event.key].key = false;
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
    a: 'a',
    b: 'b',
    c: 'c',
    d: 'd',
    e: 'e',
    f: 'f',
    g: 'g',
    h: 'h',
    i: 'i',
    j: 'j',
    k: 'k',
    l: 'l',
    m: 'm',
    n: 'n',
    o: 'o',
    p: 'p',
    q: 'q',
    r: 'r',
    s: 's',
    t: 't',
    u: 'u',
    v: 'v',
    w: 'w',
    x: 'x',
    y: 'y',
    z: 'z',
    A: 'A',
    B: 'B',
    C: 'C'
}