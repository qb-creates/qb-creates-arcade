import { MonoBehaviour, Canvas, Time, PlayerInput, KeyCode, Vector2, SpriteRenderer, Rigidbody2d, BoxCollider } from "../../../engine/qbcreates-js-engine";
import { Physics2d } from "../../../engine/physics2d";
import { Debug } from "src/app/engine/debug";
import { SpriteSheet } from "src/app/engine/sprite-sheet";

export class FishmanInput extends MonoBehaviour {
    _play = false;
    animationcount = 0;
    jump: boolean = false;
    isKicking: boolean = false;
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

    kickAnimation = [
        {
            x: 0,
            y: 8,
            frame: 0
        },
        {
            x: 1,
            y: 8,
            frame: 7
        },
        {
            x: 2,
            y: 8,
            frame: 13
        },
        {
            x: 3,
            y: 8,
            frame: 19
        },
        {
            x: 4,
            y: 8,
            frame: 25
        },
        {
            x: 5,
            y: 8,
            frame: 30
        }
    ]
    test = false;
    awake() {
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
                    this.animationComplete();
                }
            }
        }, 16.6666667);
    }

    update() {
        if (PlayerInput.getKeyDown(KeyCode.KeyE)) {
            this.isKicking = true;
        }
        if (PlayerInput.getKeyDown(KeyCode.Space)) {
            this.jump = true;
            this.jumpTimer = Time.time + .3;
        }

        if (PlayerInput.getKeyUp(KeyCode.Space)) {
            this.test = true;
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
        let attachedCollider = this.gameObject.getComponent(BoxCollider);
        let collide = Physics2d.BoxCast(new Vector2(this.transform.position.x + attachedCollider.offset.x, this.transform.position.y - ((attachedCollider.scale.y / 2) + .05 - attachedCollider.offset.y)), new Vector2(attachedCollider.scale.x, 0), Vector2.down, .1);

        if (this.rigidbody2d.velocityX.x < 0) {
            this.isFlipped = true;
        } else if (this.rigidbody2d.velocityX.x > 0) {
            this.isFlipped = false;
        }

        if (collide.length == 0) {
            this.isGrounded = false;
        } else {
            this.isGrounded = true;
            this.isKicking = false;
        }

        if (this.direction == 0 && this.isGrounded) {
            this.setAnimation(this.idleAnimation);
        } else if (this.direction != 0 && this.isGrounded) {
            this.setAnimation(this.runAnimation);
        }

        if (!this.isGrounded) {
            if (this.isKicking) {
                this.setAnimation(this.kickAnimation);
            } else if (this.rigidbody2d.velocityY.y > 0) {
                this.setAnimation(this.jumpAccendAnimation);
            } else if (this.rigidbody2d.velocityY.y < -14) {
                this.setAnimation(this.jumpDecendAnimation);
            } else if (this.rigidbody2d.velocityY.y < -2) {
                this.setAnimation(this.jumpPeakAnimation);
            }
        }
        this.previousVelocityY = this.rigidbody2d.velocityY.y;
    }

    fixedUpdate(): void {
        this.rigidbody2d.addForce(new Vector2(50 * this.direction, 0));

        if (this.jumpTimer > Time.time && this.isGrounded) {
            this.jumpTimer = 0;
            this.rigidbody2d.addForce(new Vector2(0, 10.5));

        }
        if (this.rigidbody2d.velocityY.y >= 0 && this.rigidbody2d.velocityY.y <= 5 && this.test) {
            this.rigidbody2d.velocityY.y = 0;
            this.test = false;
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

    animationComplete() {
        if (this.isKicking) {
            this.isKicking = false;
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