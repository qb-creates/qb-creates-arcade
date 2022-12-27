import { MonoBehaviour, Canvas, Time, PlayerInput, KeyCode, Vector2, SpriteRenderer } from "../../engine/qbcreates-js-engine";
import { GameStateManager } from "./managers/game-state-manager.js";
import { Physics2d } from "../../engine/physics2d";
import { squareSprite } from "src/app/engine/sprite-shape";
import { Debug } from "src/app/engine/debug";

export class TestFollow extends MonoBehaviour {
    target = null;
    // speed: Vector2 = new Vector2(0, 0);
    speedY: Vector2 = new Vector2(0, 0);
    speedX: Vector2 = new Vector2(0, 0);
    _play = false;

    awake() {
        GameStateManager.gameStateEvent.subscribe(isStarted => {
            this._play = true;
        });

        this.animation.push((renderer) => {
            squareSprite.drawShape(renderer)
        });
        this.animation.push((renderer) => {
            squareSprite.drawShape(renderer)
        });
        this.animation.push((renderer) => {
            squareSprite.drawShape(renderer)
        });
        this.animation.push((renderer) => {
            squareSprite.drawShape(renderer)
        });
        this.animation.push((renderer) => {
            squareSprite.drawShape(renderer)
        });
    }

    start() {
        this.addForce(0);
    }
    animation = [];
    animationcount = 0;
    test = false
    modify = new Vector2(0, 0);
    // prevVelocity = new Vector2(0, 0);
    prevVelocityY = new Vector2(0, 0);
    prevVelocityX = new Vector2(0, 0);
    // force = new Vector2(0, 0);
    forceY = new Vector2(0, 0);
    forceX = new Vector2(0, 0);
    normalForce = new Vector2(0, 0);
    normalForceX = new Vector2(0, 0);
    myForce = new Vector2(0, 0);
    gravityForce = new Vector2(0, -40);
    update() {
        if (PlayerInput.getKey(KeyCode[0])) {
            if (!this.test && Math.abs(Canvas.mousePosition.x - this.transform.position.x) <= 0.2 && Math.abs(Canvas.mousePosition.y - this.transform.position.y) <= 0.2) {
                this.test = true;
            }
            if (this.test) {
                let direction = Vector2.subtract(Canvas.mousePosition, this.transform.position);
                let colliders = Physics2d.rayCast(this.transform.position, direction, direction.magnitude);
                let hitting = false;
                if (colliders.length > 0) {
                    hitting = true;
                }
                Debug.drawRay(this.transform.position, direction, direction.magnitude, hitting ? "#00FF00" : "#FF0000")
            }
        }
        if (PlayerInput.getKeyUp(KeyCode[0])) {
            this.test = false;
        }

        // if (this.animationcount == 0) {
        //     this.gameObject.transform.scale = new Vector2(.8, .8);
        // }
        // if (this.animationcount == 5) {
        //     this.gameObject.transform.scale = new Vector2(.6, .6);
        // }
        // if (this.animationcount == 10) {
        //     this.gameObject.transform.scale = new Vector2(.4, .4);
        // }
        // if (this.animationcount == 15) {
        //     this.gameObject.transform.scale = new Vector2(.3, .3);
        // }
        // if (this.animationcount == 20) {
        //     this.gameObject.transform.scale = new Vector2(.3, .3);
        // }
        // if (this.animationcount == 30) {
        //     this.gameObject.transform.scale = new Vector2(.4, .4);
        // }
        // if (this.animationcount == 40) {
        //     this.gameObject.transform.scale = new Vector2(.6, .6);
        // }
        // if (this.animationcount == 50) {
        //     this.gameObject.transform.scale = new Vector2(.8, .8);
        //     this.animationcount = 0;
        // }

        if (true) {
            if (PlayerInput.getKeyDown(KeyCode.Space)) {
                this.myForce = new Vector2(this.myForce.x, this.myForce.y + 100);
            }
            if (PlayerInput.getKey(KeyCode.KeyD)) {
                if (this.myForce.x < 0) {
                    this.myForce = new Vector2(20, this.myForce.y);
                } else {
                    this.myForce = new Vector2(this.myForce.x + 20, this.myForce.y);
                }
            }
            if (PlayerInput.getKey(KeyCode.KeyA)) {
                if (this.myForce.x > 0) {
                    this.myForce = new Vector2(-20, this.myForce.y);
                } else {
                    this.myForce = new Vector2(this.myForce.x - 20, this.myForce.y);
                }
            }
            if (PlayerInput.getKeyUp(KeyCode.KeyA) || PlayerInput.getKeyUp(KeyCode.KeyD)) {
                this.myForce = new Vector2(0, this.myForce.y);
            }
            
            

            if (this.myForce.y > 0) {
                this.myForce = new Vector2(this.myForce.x, this.myForce.y - 3);
                if (this.myForce.y < 0) {
                    this.myForce = new Vector2(this.myForce.x, 0);
                }
            }
            if (this.myForce.x > 0) {
                this.myForce = new Vector2(this.myForce.x - 1, this.myForce.y);
            } else if (this.myForce.x < 0) {
                this.myForce = new Vector2(this.myForce.x + 1, this.myForce.y);
            }
            

            this.forceY = Vector2.add(new Vector2(0, this.myForce.y), this.gravityForce, this.normalForce);
            this.speedY  = Vector2.add(Vector2.multiply(this.forceY, Time.deltaTime), this.prevVelocityY)
            let prevPosY = new Vector2(0, this.transform.position.y);
            let stepY = this.speedY.magnitude * Time.deltaTime;
            let myTargY = Vector2.add(prevPosY, this.forceY.normalize());
            let directionY = Vector2.subtract(myTargY, prevPosY).normalize();
            let newPosY = Vector2.add(prevPosY, Vector2.multiply(directionY, stepY));
            let colliders = Physics2d.rayCast(this.transform.position, Vector2.down, Vector2.subtract(newPosY, prevPosY).magnitude + .5);
            Debug.drawRay(this.transform.position, Vector2.down, Vector2.subtract(newPosY, prevPosY).magnitude + .5, 'green')
            if (colliders.length > 0 && this.forceY.y <= 0) {
                this.normalForce = new Vector2(0, 40);
                let l1 = new Vector2((colliders[0].position.x - .5) - (colliders[0].scale.x / 2), (colliders[0].position.y - .5) + (colliders[0].scale.y / 2));
                this.transform.position = new Vector2(this.transform.position.x, l1.y + 1);
            } else {
                this.normalForce = Vector2.zero;
                this.transform.position = Vector2.add(this.transform.position, Vector2.multiply(directionY, stepY));
            }
            if (this.forceY.y == 0) {
                this.speedY.y = 0;
            }

            this.prevVelocityY = Vector2.divide(Vector2.subtract(new Vector2(0, this.transform.position.y), prevPosY), Time.deltaTime);
            
            this.forceX = Vector2.add(new Vector2(this.myForce.x, 0), this.normalForceX);
            this.speedX  = Vector2.add(Vector2.multiply(this.forceX, Time.deltaTime), this.prevVelocityX)
            
            if (Math.abs(this.speedX.x) >= 8) {
                this.speedX.x = Math.sign(this.speedX.x) * 8;
                this.myForce = new Vector2(this.myForce.x + (-Math.sign(this.myForce.x) * 1), this.myForce.y);
            }

            let prevPosX = new Vector2(this.transform.position.x, 0);
            let stepX = this.speedX.magnitude * Time.deltaTime;
            let myTargX = Vector2.add(prevPosX, this.forceX.normalize());
            let directionX = Vector2.subtract(myTargX, prevPosX).normalize();
            let newPosX = Vector2.add(prevPosX, Vector2.multiply(directionX, stepX));
            colliders = Physics2d.rayCast(this.transform.position, Vector2.multiply(Vector2.right, Math.sign(this.forceX.x)), Vector2.subtract(newPosX, prevPosX).magnitude + .5);
            Debug.drawRay(this.transform.position, Vector2.multiply(Vector2.right, Math.sign(this.forceX.x)), Vector2.subtract(newPosX, prevPosX).magnitude + .5, 'yellow')
            if (colliders.length > 0 && this.forceX.x != 0) {
                // this.normalForceX = new Vector2(-this.forceX.x, 0);
                let r2 = new Vector2((colliders[0].position.x - .5) + (colliders[0].scale.x / 2), (colliders[0].position.y - .5) - (colliders[0].scale.y / 2));
                let l1 = new Vector2((colliders[0].position.x - .5) - (colliders[0].scale.x / 2), (colliders[0].position.y - .5) + (colliders[0].scale.y / 2));
                if (Math.sign(this.forceX.x) == -1) {
                    this.transform.position = new Vector2(r2.x + 1.1, this.transform.position.y);
                } else if (Math.sign(this.forceX.x) == 1) {
                    this.transform.position = new Vector2(l1.x - .1, this.transform.position.y);
                }
            } else {
                this.normalForceX = new Vector2(0, 0);
                this.transform.position = Vector2.add(this.transform.position, Vector2.multiply(directionX, stepX));
            }
            if (this.forceX.x == 0) {
                this.speedX.x = 0;
            }
            this.prevVelocityX = Vector2.divide(Vector2.subtract(new Vector2(this.transform.position.x, 0), prevPosX), Time.deltaTime);
            // console.log(this.speedX, this.speedY, this.forceY);
        }
        this.animationcount++;
    }
    addForce(force) {
        // this.myForce = new Vector2(0, this.myForce.y + force);
        // let linearDrage = new Vector2(0, 0);
        // linearDrage = new Vector2(0, -40);
        // this.force = Vector2.add(this.myForce, linearDrage, this.normalForce);
        // console.log('asdfsf   ', this.myForce)
    }
    onTriggerEnter(colliders) {

    }

    onTriggerExit(colliders) {
    }
}

// if (true) {
//     // if (PlayerInput.getKey(KeyCode.a)) {
//     //     this.modify = new Vector2(0,200);
//     // }
//     // let gravity = new Vector2(0, -9.8);
//     // let step = this.speed * Time.deltaTime;
//     // let myTarg = Vector2.add(gravity, this.transform.position, this.modify);
//     // let placeholder = Vector2.subtract(myTarg, this.transform.position).normalize();
//     // let xDistance = Math.abs(this.transform.position.x - myTarg.x);
//     // let yDistance = Math.abs(this.transform.position.y - myTarg.y);

//     // if (xDistance <= 0.02 && yDistance <= 0.02) {
//     //     // this.transform.position = new Vector2(myTarg.transform.position.x, this.transform.position.y);
//     // } else {
//     //     this.transform.position = Vector2.add(this.transform.position, Vector2.multiply(placeholder, step));
//     // }
//     // this.modify = new Vector2(this.modify.x, this.modify.y - 1);
//     // if (PlayerInput.getKey(KeyCode.d)) {
//     //     this.myForce = new Vector2(0, 1);
//     // }
//     if (PlayerInput.getKeyDown(KeyCode.Space)) {
//         this.myForce = new Vector2(this.myForce.x, this.myForce.y + 100);
//     }
//     if (PlayerInput.getKey(KeyCode.KeyD)) {
//         if (this.myForce.x < 0) {
//             this.myForce = new Vector2(20, this.myForce.y);
//         } else {
//             this.myForce = new Vector2(this.myForce.x + 20, this.myForce.y);
//         }
//     }
//     if (PlayerInput.getKey(KeyCode.KeyA)) {
//         if (this.myForce.x > 0) {
//             this.myForce = new Vector2(-20, this.myForce.y);
//         } else {
//             this.myForce = new Vector2(this.myForce.x - 20, this.myForce.y);
//         }
//     }
//     if (PlayerInput.getKeyUp(KeyCode.KeyA) || PlayerInput.getKeyUp(KeyCode.KeyD)) {
//         this.myForce = new Vector2(0, this.myForce.y);
//     }
    
    

//     if (this.myForce.y > 0) {
//         this.myForce = new Vector2(this.myForce.x, this.myForce.y - 2);
//     }
//     if (this.myForce.x > 0) {
//         this.myForce = new Vector2(this.myForce.x - 1, this.myForce.y);
//     } else if (this.myForce.x < 0) {
//         this.myForce = new Vector2(this.myForce.x + 1, this.myForce.y);
//     }

//     this.force = Vector2.add(this.myForce, this.gravityForce, this.normalForce);

//     this.speed = Vector2.add(Vector2.multiply(this.force, Time.deltaTime), this.prevVelocity)
//     if (Math.abs(this.speed.x) >= 8) {
//         this.speed.x = Math.sign(this.speed.x) * 8;
//         this.myForce = new Vector2(this.myForce.x + (-Math.sign(this.myForce.x) * 1), this.myForce.y);
//     }
//     let step = this.speed.magnitude * Time.deltaTime;
//     let myTarg = Vector2.add(this.transform.position, this.force.normalize());
//     let direction = Vector2.subtract(myTarg, this.transform.position).normalize();
//     let prevPos = this.transform.position;
//     let newPos = Vector2.add(this.transform.position, Vector2.multiply(direction, step));
//     let colliders = Physics2d.rayCast(prevPos, Vector2.down, Vector2.subtract(newPos, prevPos).magnitude + .5);
//     Debug.drawRay(this.transform.position, Vector2.down, Vector2.subtract(newPos, prevPos).magnitude + .5, 'green')
//     this.transform.position = Vector2.add(this.transform.position, Vector2.multiply(direction, step));
//     if (colliders.length > 0 && this.force.y <= 0) {
//         this.normalForce = new Vector2(0, 40);
//         let l1 = new Vector2((colliders[0].position.x - .5) - (colliders[0].scale.x / 2), (colliders[0].position.y - .5) + (colliders[0].scale.y / 2));
//         this.transform.position = new Vector2(this.transform.position.x, l1.y + 1);
//     } else {
//         this.normalForce = Vector2.zero;
//     }
//     if (this.force.y == 0) {
//         this.speed.y = 0;
//     }
//     if (this.force.x == 0) {
//         this.speed.x = 0;
//     }
//     this.prevVelocity = Vector2.divide(Vector2.subtract(this.transform.position, prevPos), Time.deltaTime);
//     if (this.speed.y != 0 || this.speed.x != 0) {
//         console.log(this.speed);
//     }
// }



// export class TestFollow extends MonoBehaviour {
//     target = null;
//     speed = 1;
//     _play = false;

//     awake() {
//         GameStateManager.gameStateEvent.subscribe(isStarted => {
//             this._play = true;
//         });

//         this.animation.push((renderer) => {
//             squareSprite.drawShape(renderer)
//         });
//         this.animation.push((renderer) => {
//             squareSprite.drawShape(renderer)
//         });
//         this.animation.push((renderer) => {
//             squareSprite.drawShape(renderer)
//         });
//         this.animation.push((renderer) => {
//             squareSprite.drawShape(renderer)
//         });
//         this.animation.push((renderer) => {
//             squareSprite.drawShape(renderer)
//         });
//     }

//     start() {
//     }
//     animation = [];
//     animationcount = 0;
//     test = false
//     update() {
//         if (PlayerInput.getKey(KeyCode[0])) {
//             if (!this.test && Math.abs(Canvas.mousePosition.x - this.transform.position.x) <= 0.2 && Math.abs(Canvas.mousePosition.y - this.transform.position.y) <= 0.2) {
//                 this.test = true;
//             }
//             if (this.test) {
//                 let direction = Vector2.subtract(Canvas.mousePosition, this.transform.position);
//                 let colliders = Physics2d.rayCast(this.transform.position, direction, direction.magnitude);
//                 let hitting = false;
//                 if (colliders.filter(collider => collider.gameObject.objectName.includes('snake')).length > 0) {
//                     hitting = true;
//                 }
//                 Debug.drawRay(this.transform.position, direction, direction.magnitude, hitting ? "#00FF00" : "#FF0000")
//             }
//         }
//         if (PlayerInput.getKeyUp(KeyCode[0])) {
//             this.test = false;
//         }

//         if (this.animationcount == 0) {
//             this.gameObject.transform.scale = new Vector2(.8, .8);
//         }
//         if (this.animationcount == 5) {
//             this.gameObject.transform.scale = new Vector2(.6, .6);
//         }
//         if (this.animationcount == 10) {
//             this.gameObject.transform.scale = new Vector2(.4, .4);
//         }
//         if (this.animationcount == 15) {
//             this.gameObject.transform.scale = new Vector2(.3, .3);
//         }
//         if (this.animationcount == 20) {
//             this.gameObject.transform.scale = new Vector2(.3, .3);
//         }
//         if (this.animationcount == 30) {
//             this.gameObject.transform.scale = new Vector2(.4, .4);
//         }
//         if (this.animationcount == 40) {
//             this.gameObject.transform.scale = new Vector2(.6, .6);
//         }
//         if (this.animationcount == 50) {
//             this.gameObject.transform.scale = new Vector2(.8, .8);
//             this.animationcount = 0;
//         }

//         if (false) {
//             let step = this.speed * Time.deltaTime;
//             let myTarg = this.target.children[this.target.children.length - 1];
//             let placeholder = Vector2.subtract(myTarg.transform.position, this.transform.position).normalize();
//             let xDistance = Math.abs(this.transform.position.x - myTarg.transform.position.x);
//             let yDistance = Math.abs(this.transform.position.y - myTarg.transform.position.y);

//             if (xDistance <= 0.02 && yDistance <= 0.02) {
//                 this.transform.position = new Vector2(myTarg.transform.position.x, this.transform.position.y);
//             } else {
//                 this.transform.position = Vector2.add(this.transform.position, Vector2.multiply(placeholder, step));
//             }
//         }
//         this.animationcount++;
//     }

//     onTriggerEnter(colliders) {

//     }

//     onTriggerExit(colliders) {
//     }
// }