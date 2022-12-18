export class Input {
    static _KeyDown = {
        a: {
            key: false, 
            keyDown: false, 
            keyUp: false
        },
        b:  {
            key: false, 
            keyDown: false, 
            keyUp: false
        },
        c:  {
            key: false, 
            keyDown: false, 
            keyUp: false
        },
        d:  {
            key: false, 
            keyDown: false, 
            keyUp: false
        },
        q:  {
            key: false, 
            keyDown: false, 
            keyUp: false
        },
        s:  {
            key: false, 
            keyDown: false, 
            keyUp: false
        },
        w:  {
            key: false, 
            keyDown: false, 
            keyUp: false
        }
    }

    static initialize() {
        addEventListener('keydown', (event) => {
            if (event.repeat) {
                return;
            }
            
            if (this._KeyDown.hasOwnProperty(event.key)) {
                this._KeyDown[event.key].keyUp = false;
                this._KeyDown[event.key].keyDown = true;
                this._KeyDown[event.key].key = true;
            }
        });

        addEventListener('keyup', (event) => {
            if (this._KeyDown.hasOwnProperty(event.key)) {
                this._KeyDown[event.key].keyDown = false;
                this._KeyDown[event.key].keyUp = true;
                this._KeyDown[event.key].key = false;
            }
        });
    }

    static getKeyDown(keyCode) {
        if (this._KeyDown[keyCode].keyDown) {
            this._KeyDown[keyCode].keyDown = false;
            return true;
        } 
        return false;
    }

    static getKeyUp(keyCode) {
        if (this._KeyDown[keyCode].keyUp) {
            this._KeyDown[keyCode].keyUp = false;
            return true;
        } 
        return false;
    }

    static getKey(keyCode) {
        return this._KeyDown[keyCode].key;
    }
}

export const KeyCode = {
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