export class PlayerInput {
    public static _KeyDown = {
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

    static getKeyDown(keyCode) {
        return this._KeyDown[keyCode].keyDown;
    }

    static getKeyUp(keyCode) {
        return this._KeyDown[keyCode].keyUp;
    }

    static getKey(keyCode) {
        return this._KeyDown[keyCode].key;
    }

    // Acts as a private static constructor 
    private static __ctor = (() => {
        addEventListener('keydown', (event) => {
            if (event.repeat) {
                return;
            }

            if (PlayerInput._KeyDown.hasOwnProperty(event.key)) {
                PlayerInput._KeyDown[event.key].keyUp = false;
                PlayerInput._KeyDown[event.key].keyDown = true;
                PlayerInput._KeyDown[event.key].key = true;
            }
        });

        addEventListener('keyup', (event) => {
            if (PlayerInput._KeyDown.hasOwnProperty(event.key)) {
                PlayerInput._KeyDown[event.key].keyDown = false;
                PlayerInput._KeyDown[event.key].keyUp = true;
                PlayerInput._KeyDown[event.key].key = false;
            }
        });

        addEventListener('mousedown', (event) => {
            if (PlayerInput._KeyDown.hasOwnProperty(event.button)) {
                PlayerInput._KeyDown[event.button].keyUp = false;
                PlayerInput._KeyDown[event.button].keyDown = true;
                PlayerInput._KeyDown[event.button].key = true;
            }
        });

        addEventListener('mouseup', (event) => {
            if (PlayerInput._KeyDown.hasOwnProperty(event.button)) {
                PlayerInput._KeyDown[event.button].keyDown = false;
                PlayerInput._KeyDown[event.button].keyUp = true;
                PlayerInput._KeyDown[event.button].key = false;
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