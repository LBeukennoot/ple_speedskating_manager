export default class Skater extends Phaser.Physics.Arcade.Sprite {
    pathTweenCounter: { t: number; vec: Phaser.Math.Vector2 }
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
    finishTimes: Array<Date> = [new Date(0)];
    name: string;
    boostActive: boolean = false

    boostSpeed = 1.1

    r = 0

    speedParticles
    particlesEmitter

    constructor({ scene, texture, maxSpeed = 20, speed = 1, startSpeed = 0.05, startPosition = 0, tint = 0xffffff, name = "-" }) {
        super(scene, 0, 0, texture)
        this.scene = scene
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.flipX = true

        this.tint = tint
        this.name = name

        this.setScale(0.3);
        this.pathTweenCounter = { t: 0, vec: new Phaser.Math.Vector2() }
        this.pathTween = null
        this.path
        this.tangent = new Phaser.Math.Vector2()
        this.pathVector = new Phaser.Math.Vector2()
        this.pathOffset
        this.t = startPosition / 100

        // calculating speed: https://ijsverenigingwoubrugge.nl/ijsvereniging/activiteiten/2015-05-11-09-06-53
        this.maxSpeed = maxSpeed //53 sec if maxSpeed = 20 (33.96 km/uur)
        this.speed = speed
        this.startSpeed = startSpeed
        this.acceleration = 0
        this.startOperationDone = false

        this.speedParticles = this.scene.add.particles('line');

        this.particlesEmitter = this.speedParticles.createEmitter(
            {
                x: 0,
                y: 0,
                lifespan: 400,
                alpha: { start: 1, end: 0, ease: 'linear' },
                scale: { start: 0, end: 0.5, ease: 'linear' },
                tintFill: [0xff0000, 0x000000],

                rotate: {
                    onEmit: () => {
                        return this.rotation * 180 / Math.PI
                    },
                },
                emitZone: {
                    type: 'random',
                    source: new Phaser.Geom.Circle(0, 0, 20),
                }
            }
        )

        this.particlesEmitter.startFollow(this)
        this.particlesEmitter.stop()

    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta)
        this.pathUpdate()

        if (this.isOnFinishline()) {
            this.addFinishTime(time)
        }
    }

    toggleBoost(b) {
        if (b) {
            this.acceleration = 0.05;
            this.maxSpeed *= this.boostSpeed
            this.particlesEmitter.start()
            this.boostActive = false
        } else {
            this.acceleration = 0;
            this.maxSpeed /= this.boostSpeed
            this.particlesEmitter.stop()
            this.boostActive = true
        }
    }

    pathUpdate() {



        const tween = this.pathTween
        if (tween && tween.isPlaying()) {
            this.t = tween.getValue()
        } else {
            this.calculateSpeed()
        }
        this.path.getPoint(1 - this.t, this.pathVector)
        this.path.getTangent(1 - this.t, this.tangent)
        this.setRotation(this.tangent.angle())
        this.pathVector.add(this.tangent.normalizeRightHand().setLength(this.pathOffset))
        this.setPosition(this.pathVector.x, this.pathVector.y)

    }

    calculateSpeed() {
        if (this.startOperationDone) {
            this.speed = Phaser.Math.Clamp(this.speed + this.acceleration, this.maxSpeed / 2, this.maxSpeed)
            this.t = this.t + this.normalize(this.speed) <= 1 ? this.t + this.normalize(this.speed) : 0
        } else {
            this.speed = Phaser.Math.Clamp(this.speed + this.startSpeed, 0, this.maxSpeed)
            this.t = this.t + this.normalize(this.speed) <= 1 ? this.t + this.normalize(this.speed) : 0
            if (this.speed === this.maxSpeed) {
                this.startOperationDone = true
            }
        }
    }

    getX() {
        return this.pathVector.x
    }

    getY() {
        return this.pathVector.y
    }

    isOnFinishline() {
        let trackProcent = this.t * 100

        if (trackProcent >= 62 && trackProcent < 62 + this.normalize(this.speed) * 100 ||
            trackProcent >= 12 && trackProcent < 12 + this.normalize(this.speed) * 100) {
            return true
        } else {
            return false
        }
    }

    addFinishTime(date: Date) {
        this.finishTimes.push(new Date(date))
    }

    getLastFinishTime(): Date {
        return this.finishTimes[this.finishTimes.length - 1]
    }

    normalize(value: number) {
        return value / 100000
    }

    startFollow({ path, duration, pathOffset = 0 }) {
        this.path = path
        this.pathOffset = pathOffset
        if (duration) {
            this.pathTween = this.scene.tweens.addCounter({
                from: 0,
                to: 1,
                duration: duration,
                repeat: -1
            })
        }
    }

}