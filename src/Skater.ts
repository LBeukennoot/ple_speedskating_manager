export default class Skater extends Phaser.Physics.Arcade.Sprite {
    pathTweenCounter: { t: number; vec: Phaser.Math.Vector2; }
    pathTween: any
    path: any
    tangent: Phaser.Math.Vector2
    pathVector: Phaser.Math.Vector2
    pathOffset: any
    t: number
    maxSpeed: number
    speed: number
    startSpeed: number
    acceleration: number
    startOperationDone: boolean;

    constructor({ scene, texture, maxSpeed = 20, speed = 1, startSpeed = 0.05, startPosition = 0, tint = 0xffffff }) {
        super(scene, 0, 0, texture);
        this.scene = scene;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.flipX = true

        this.tint = tint

        this.setScale(0.3);
        this.pathTweenCounter = { t: 0, vec: new Phaser.Math.Vector2() };
        this.pathTween = null;
        this.path;
        this.tangent = new Phaser.Math.Vector2();
        this.pathVector = new Phaser.Math.Vector2();
        this.pathOffset;
        this.t = startPosition / 100

        //https://ijsverenigingwoubrugge.nl/ijsvereniging/activiteiten/2015-05-11-09-06-53
        this.maxSpeed = maxSpeed; //53 sec if maxSpeed = 20 (33.96 km/uur)
        this.speed = speed;
        this.startSpeed = startSpeed;
        this.acceleration = 0;
        this.startOperationDone = false;
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        this.pathUpdate();
    }

    pathUpdate() {

        const tween = this.pathTween;
        if (tween && tween.isPlaying()) {
            this.t = tween.getValue();
        } else {
            this.calculateSpeed()
        }
        this.path.getPoint(1 - this.t, this.pathVector);
        this.path.getTangent(1 - this.t, this.tangent);
        this.setRotation(this.tangent.angle());
        this.pathVector.add(this.tangent.normalizeRightHand().setLength(this.pathOffset));
        this.setPosition(this.pathVector.x, this.pathVector.y);

    }

    calculateSpeed() {
        if (this.startOperationDone) {
            this.speed = Phaser.Math.Clamp(this.speed + this.acceleration, this.maxSpeed / 2, this.maxSpeed)
            this.t = this.t + this.normalize(this.speed) <= 1 ? this.t + this.normalize(this.speed) : 0;
        } else {
            this.speed = Phaser.Math.Clamp(this.speed + this.startSpeed, 0, this.maxSpeed)
            this.t = this.t + this.normalize(this.speed) <= 1 ? this.t + this.normalize(this.speed) : 0;
            if (this.speed === this.maxSpeed) {
                this.startOperationDone = true;
            }
        }
    }

    getX() {
        return this.pathVector.x
    }

    getY() {
        return this.pathVector.y
    }

    normalize(value: number) {
        return value / 100000
    }

    startFollow({ path, duration, pathOffset = 0 }) {
        this.path = path;
        this.pathOffset = pathOffset;
        if (duration) {
            this.pathTween = this.scene.tweens.addCounter({
                from: 0,
                to: 1,
                duration: duration,
                repeat: -1
            });
        }
    }

}