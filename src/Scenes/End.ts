
export default class End extends Phaser.Scene {
    endingText: string
    text: Phaser.GameObjects.Text

    constructor() {
        super("end")
    }

    init({text}) {
        this.endingText = text
    }

    preload() {
        this.load.svg('end', 'assets/end.svg')
    }

    create() {
        let endImage = this.add.image(0, 0, 'end').setOrigin(0, 0)

        this.cameras.main.setZoom(1)
        const textStyle = { fontSize: "10rem", fontFamily: "Open Sans", fontStyle: "bolder italic", fill: "white", align: "right", boundsAlignH: 'right' }
        this.text = this.add.text(960, 540, `${this.endingText}`, textStyle).setOrigin(0.5,0.5)
    }

    update() {
    }
}