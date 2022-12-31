import { MonoBehaviour, Canvas, Time, PlayerInput, KeyCode, Vector2, SpriteRenderer, Rigidbody2d, BoxCollider } from "../../engine/qbcreates-js-engine";
import { GameStateManager } from "./managers/game-state-manager.js";
import { Physics2d } from "../../engine/physics2d";
import { squareSprite } from "src/app/engine/sprite-shape";
import { Debug } from "src/app/engine/debug";
import { SpriteSheet } from "src/app/engine/sprite-sheet";

export class TestFollow extends MonoBehaviour {
    target = null;
    _play = false;
    animationcount = 0;
    jump:boolean = false;
    direction: number = 0;
    isGrounded: boolean = true;
    jumpTimer = 0;
    isFlipped = false;
    rigidbody2d: Rigidbody2d = null;
    spriteSheet: SpriteSheet = null;
    animation = null;
    frameCount: number = 0;
    spriteIndex = 0;
    previousVelocityY = 0;
    idleAnimation = [
        {
            x: 0,
            y: 0,
            frame: 0
        },
        {
            x: 1,
            y: 0,
            frame: 6
        },
        {
            x: 2,
            y: 0,
            frame: 12
        },
        {
            x: 3,
            y: 0,
            frame: 18
        },
        {
            x: 4,
            y: 0,
            frame: 24
        },
        {
            x: 5,
            y: 0,
            frame: 30
        },
        {
            x: 5,
            y: 0,
            frame: 35
        }
    ]

    runAnimation = [
        {
            x: 0,
            y: 1,
            frame: 0
        },
        {
            x: 1,
            y: 1,
            frame: 6
        },
        {
            x: 2,
            y: 1,
            frame: 12
        },
        {
            x: 3,
            y: 1,
            frame: 18
        },
        {
            x: 4,
            y: 1,
            frame: 24
        },
        {
            x: 5,
            y: 1,
            frame: 30
        },
        {
            x: 5,
            y: 1,
            frame: 35
        }
    ]

    jumpAccendAnimation = [
        {
            x: 0,
            y: 2,
            frame: 0
        },
        {
            x: 1,
            y: 2,
            frame: 6
        },
        {
            x: 2,
            y: 2,
            frame: 12
        },
        {
            x: 3,
            y: 2,
            frame: 18
        },
        {
            x: 3,
            y: 2,
            frame: 24
        }
    ]

    jumpPeakAnimation = [
        {
            x: 0,
            y: 10,
            frame: 0
        }
    ]
    
    jumpDecendAnimation = [
        {
            x: 0,
            y: 3,
            frame: 0
        },
        {
            x: 1,
            y: 3,
            frame: 6
        },
        {
            x: 2,
            y: 3,
            frame: 12
        },
        {
            x: 3,
            y: 3,
            frame: 18
        },
        {
            x: 3,
            y: 3,
            frame: 24
        }
    ]
    
    awake() {
        GameStateManager.gameStateEvent.subscribe(isStarted => {
            this._play = true;
        });
        this.spriteSheet = this.gameObject.getComponent(SpriteRenderer).sprite;
        this.rigidbody2d = this.gameObject.getComponent(Rigidbody2d);
        this.animation = this.idleAnimation;
    }

    start() {
        setInterval(() => {
            let lastFrameIndex = this.animation.length - 1;
            let spriteModifierX = this.isFlipped ? this.animation[lastFrameIndex].x : 0;
            let spriteModifierY = this.isFlipped ? 11 : 0;

            if (this.animation != null) {
                
                if (this.animation[this.spriteIndex].frame == this.frameCount) {
                    this.spriteSheet.sY = this.animation[this.spriteIndex].y + spriteModifierY;
                    this.spriteSheet.sX = Math.abs(spriteModifierX - this.animation[this.spriteIndex].x);
                    this.spriteIndex++;
                }
    
                this.frameCount++;
                
                if (this.frameCount >= this.animation[lastFrameIndex].frame + 1) {
                    this.spriteIndex = 0;
                    this.frameCount = 0;
                }
            }
        }, 16.6666667);
    }
    
    update() {
        let attachedCollider = this.gameObject.getComponent(BoxCollider);
        let collide = Physics2d.rayCast(this.transform.position, Vector2.down, (attachedCollider.scale.y / 2) + .1 - attachedCollider.offset.y);
        
        if (this.rigidbody2d.velocityX.x < 0) {
            this.isFlipped = true;
        } else if (this.rigidbody2d.velocityX.x > 0) {
            this.isFlipped = false;
        }

        if (collide.length == 0) {
            this.isGrounded = false;
        } else {
            this.isGrounded = true;
        }

        if (this.direction == 0 && this.isGrounded){
            this.setAnimation(this.idleAnimation);
        } else if (this.direction != 0 && this.isGrounded){
            this.setAnimation(this.runAnimation);
        }

        if (!this.isGrounded) {
            if (this.rigidbody2d.velocityY.y > 0) {
                this.setAnimation(this.jumpAccendAnimation);
            } else if (this.rigidbody2d.velocityY.y < -14) {
                this.setAnimation(this.jumpDecendAnimation);         
            } else if (this.rigidbody2d.velocityY.y < -2) {
                this.setAnimation(this.jumpPeakAnimation);         
            } 
        }
     
        if (PlayerInput.getKeyDown(KeyCode.Space)) {
            this.jump = true;
            this.jumpTimer = Time.time + .1;
        }
        if (PlayerInput.getKey(KeyCode.KeyD)) {
            this.direction = 1;
        }
                
        if (PlayerInput.getKey(KeyCode.KeyA)) {
            this.direction = -1;
        }
        if (!PlayerInput.getKey(KeyCode.KeyA) && !PlayerInput.getKey(KeyCode.KeyD)) {
            this.direction = 0;
        }

        this.previousVelocityY = this.rigidbody2d.velocityY.y;
    }

    fixedUpdate(): void {
        
        this.rigidbody2d.addForce(new Vector2(50 * this.direction, 0));
        
        if (this.jumpTimer > Time.time && this.isGrounded) {
            this.jumpTimer = 0;
            this.rigidbody2d.addForce(new Vector2(0, 10.5));
           
        }
        
        if (Math.abs(this.rigidbody2d.velocityX.x) > 15) {
            this.rigidbody2d.velocityX.x = Math.sign(this.rigidbody2d.velocityX.x) * 15;
        }
        
        if (this.direction == 0) {
            this.rigidbody2d.velocityX.x = Math.sign(this.rigidbody2d.velocityX.x) * 0;
        }
    }

    setAnimation(animation) {
        if (this.animation != animation) {
            this.spriteIndex = 0;
            this.frameCount = 0;
            this.animation = animation;
        }
    }

    onTriggerEnter(colliders) {

    }

    onTriggerExit(colliders) {
    }
}
class Animator { 
    constructor() {

    }
}

        // if (PlayerInput.getKey(KeyCode[0])) {
        //     if (!this.test && Math.abs(Canvas.mousePosition.x - this.transform.position.x) <= 0.2 && Math.abs(Canvas.mousePosition.y - this.transform.position.y) <= 0.2) {
        //         this.test = true;
        //     }
        //     if (this.test) {
        //         let direction = Vector2.subtract(Canvas.mousePosition, this.transform.position);
        //         let colliders = Physics2d.rayCast(this.transform.position, direction, direction.magnitude);
        //         let hitting = false;
        //         if (colliders.length > 0) {
        //             hitting = true;
        //         }
        //         // Debug.drawRay(this.transform.position, direction, direction.magnitude, hitting ? "#00FF00" : "#FF0000")
        //     }
        // }


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