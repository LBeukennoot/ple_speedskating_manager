import Icerink from "./Icerink";

export default class Startup extends Phaser.Scene {
    timedEvent: Phaser.Time.TimerEvent;
    countdownTime: Number = 3
    countdownText: Phaser.GameObjects.Text;

    constructor() {
        super("startup")
    }

    preload() {

    }

    create() {
        this.countdownText = this.add.text(0, 0, `${this.countdownTime}`, { fontSize: "20rem" })
        this.scene.start("icerink")
        // this.timedEvent = this.time.addEvent({ delay: 1000, callback: this.onEvent, callbackScope: this, loop: true });

    }

    update() {
        this.countdownText.setText(`${this.countdownTime}`)
    }

    onEvent() {

        if (this.countdownTime == 0) {
            this.scene.start("icerink")
        } else {
            //@ts-ignore
            this.countdownTime--
        }

    }
}