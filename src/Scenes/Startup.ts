import Icerink from "./Icerink";

export default class Startup extends Phaser.Scene {
    timedEvent: Phaser.Time.TimerEvent;
    countdownText: Phaser.GameObjects.Text;

    constructor() {
        super("startup")
    }

    preload() {

    }

    create() {
        this.countdownText = this.add.text(0,0, "")

        this.timedEvent = this.time.delayedCall(3000, this.onEvent, [], this);

    }

    update() {
        this.countdownText.setText(Math.floor((this.timedEvent.getProgress() * 3) + 1).toString())
    }

    onEvent() {
        this.scene.start("icerink")

    }
}