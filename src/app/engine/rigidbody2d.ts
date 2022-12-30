import { Debug } from "./debug";
import { Physics2d } from "./physics2d";
import { Time, Component, GameObject, Vector2, } from "./qbcreates-js-engine";

export class Rigidbody2d extends Component {
    velocityY: Vector2 = new Vector2(0, 0);
    velocityX: Vector2 = new Vector2(0, 0);
    prevVelocityY = new Vector2(0, 0);
    prevVelocityX = new Vector2(0, 0);
    appliedForce = new Vector2(0, 0);
    gravityForce = new Vector2(0, -1);
    normalForceY = new Vector2(0, 0);
    totalForceY = new Vector2(0, 0);
    totalForceX = new Vector2(0, 0);
    mass = 0.025;
    test = 30;
    constructor(gameObject: GameObject) {
        super(gameObject);
    }

    public addForce(force: Vector2) {
        this.appliedForce = new Vector2(this.appliedForce.x, this.appliedForce.y + force.y);

        if (Math.sign(this.appliedForce.x) != Math.sign(force.x)) {
            this.appliedForce = new Vector2(force.x, this.appliedForce.y);
        } else {
            this.appliedForce = new Vector2(this.appliedForce.x + force.x, this.appliedForce.y);
        }
    }

    public calculatePhysics() {

        if (this.appliedForce.y > 0) {
            this.appliedForce = new Vector2(this.appliedForce.x, this.appliedForce.y - 1);
            if (this.appliedForce.y <= 0) {
                this.appliedForce = new Vector2(this.appliedForce.x, 0);
            }
        }

        if (this.appliedForce.x > 0) {
            this.appliedForce = new Vector2(this.appliedForce.x - 1, this.appliedForce.y);
        } else if (this.appliedForce.x < 0) {
            this.appliedForce = new Vector2(this.appliedForce.x + 1, this.appliedForce.y);
        }

        this.totalForceY = Vector2.add(new Vector2(0, this.appliedForce.y), this.gravityForce, this.normalForceY);
        this.velocityY = Vector2.add(Vector2.divide(Vector2.multiply(this.totalForceY, Time.deltaTime), this.mass), this.prevVelocityY);

        this.totalForceX = new Vector2(this.appliedForce.x, 0);
        this.velocityX = Vector2.add(Vector2.multiply(this.totalForceX, Time.deltaTime), this.prevVelocityX);
    }

    applyPhysics() {
        if (this.totalForceY.y == 0) {
            this.velocityY.y = -.00001;
        }

        let prevPosY = new Vector2(0, this.transform.position.y);
        let stepY = this.velocityY.magnitude * Time.deltaTime;
        let myTargY = Vector2.add(prevPosY, this.velocityY.normalize());
        let directionY = Vector2.subtract(myTargY, prevPosY).normalize();
        let newPosY = Vector2.add(prevPosY, Vector2.multiply(directionY, stepY));
        let colliders = Physics2d.BoxCast(new Vector2(this.transform.position.x, this.transform.position.y + (Math.sign(this.velocityY.normalize().y) * .55)), new Vector2(this.transform.scale.x, 0), Vector2.multiply(Vector2.up, Math.sign(this.velocityY.normalize().y)), Vector2.subtract(newPosY, prevPosY).magnitude);

        // Debug.drawRay(this.transform.position, Vector2.down, Vector2.subtract(newPosY, prevPosY).magnitude + .5, 'green')
        if (colliders.length > 0) {
            let index = colliders.length - 1;
            this.normalForceY = new Vector2(0, -this.gravityForce.y);
            let topY = colliders[index].position.y + (colliders[index].scale.y / 2);
            let BottomY = colliders[index].position.y - (colliders[index].scale.y / 2);
            
            if (Math.sign(this.velocityY.y) == -1) {
                this.transform.position = new Vector2(this.transform.position.x, topY + .5);
            } else if (Math.sign(this.velocityY.y) == 1) {
                this.appliedForce = new Vector2(this.appliedForce.x, 0);
                this.transform.position = new Vector2(this.transform.position.x, BottomY - .5);
            }
            // prevPosY = new Vector2(0, this.transform.position.y);
        } else {
            // There is not a colider in the area that the object is about to travel.
            // this.normalForceY = Vector2.zero;
            // this.transform.position = Vector2.add(this.transform.position, Vector2.multiply(directionY, stepY));
        }
        console.log(this.velocityY)
        this.prevVelocityY = this.velocityY;
        //////X Values
        let prevPosX = new Vector2(this.transform.position.x, 0);
        let stepX = this.velocityX.magnitude * Time.deltaTime;
        let myTargX = Vector2.add(prevPosX, this.totalForceX.normalize());
        let directionX = Vector2.subtract(myTargX, prevPosX).normalize();
        let newPosX = Vector2.add(prevPosX, Vector2.multiply(directionX, stepX));
        let horizontalColliders = Physics2d.BoxCast(new Vector2(this.transform.position.x + (Math.sign(this.totalForceX.x) * .55), this.transform.position.y), new Vector2(0, this.transform.scale.y), Vector2.multiply(Vector2.right, Math.sign(this.totalForceX.x)), Vector2.subtract(newPosX, prevPosX).magnitude + .01);

        Debug.drawRay(this.transform.position, Vector2.multiply(Vector2.right, Math.sign(this.totalForceX.x)), Vector2.subtract(newPosX, prevPosX).magnitude + .5, 'yellow')
        if (horizontalColliders.length > 0 && this.totalForceX.x != 0) {
            let index = horizontalColliders.length - 1;
            let leftX = horizontalColliders[index].position.x - (horizontalColliders[index].scale.x / 2);
            let rightX = horizontalColliders[index].position.x + (horizontalColliders[index].scale.x / 2);

            if (Math.sign(this.totalForceX.x) == -1) {
                this.transform.position = new Vector2(rightX + .5, this.transform.position.y);
            } else if (Math.sign(this.totalForceX.x) == 1) {
                this.transform.position = new Vector2(leftX - .5, this.transform.position.y);
            }
        } 
        if (horizontalColliders.length == 0 && colliders.length == 0) {
            this.normalForceY = Vector2.zero;
            this.transform.position = Vector2.add(this.transform.position, Vector2.multiply(directionX, stepX), Vector2.multiply(directionY, stepY));
        }
        else if (horizontalColliders.length == 0) {
            this.transform.position = Vector2.add(this.transform.position, Vector2.multiply(directionX, stepX));
        } else if (colliders.length == 0) {
            this.normalForceY = Vector2.zero;
            this.transform.position = Vector2.add(this.transform.position, Vector2.multiply(directionY, stepY));
        }
        if (this.totalForceX.x == 0) {
            this.velocityX.x = 0;
        }
        this.prevVelocityX = Vector2.divide(Vector2.subtract(new Vector2(this.transform.position.x, 0), prevPosX), Time.deltaTime);
    }
}