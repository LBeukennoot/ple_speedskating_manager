export default class Skater extends Phaser.Physics.Arcade.Sprite {
    pathTweenCounter: { t: number; vec: Phaser.Math.Vector2; };
    pathTween: any;
    path: any;
    tangent: Phaser.Math.Vector2;
    pathVector: Phaser.Math.Vector2;
    pathOffset: any;
    t: number;
    maxSpeed: number;
    speed: number;
    acceleration: number;
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        this.scene = scene;
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setScale(0.3);
        this.pathTweenCounter = { t: 0, vec: new Phaser.Math.Vector2() };
        this.pathTween = null;
        this.path;
        this.tangent = new Phaser.Math.Vector2();
        this.pathVector = new Phaser.Math.Vector2();
        this.pathOffset;
        this.t = 0;
        this.maxSpeed = 0.002;
        this.speed = 0;
        this.acceleration = 0;
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
            this.speed = Phaser.Math.Clamp(this.speed + this.acceleration, 0, this.maxSpeed);
            this.t = this.t + this.speed <= 1 ? this.t + this.speed : 0;
        }
        this.path.getPoint(this.t, this.pathVector);
        this.path.getTangent(this.t, this.tangent);
        this.setRotation(this.tangent.angle());
        this.pathVector.add(this.tangent.normalizeRightHand().setLength(this.pathOffset));
        this.setPosition(this.pathVector.x, this.pathVector.y);

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