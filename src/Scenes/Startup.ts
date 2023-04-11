import Icerink from "./Icerink";

export default class Startup extends Phaser.Scene {

    constructor() {
        super("startup")
    }

    preload() {

    }

    create() {
        this.scene.start("icerink")
    }

    update() {

    }
}