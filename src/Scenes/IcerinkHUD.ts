import 'phaser'

export default class IcerinkHUD extends Phaser.Scene {
    text: Phaser.GameObjects.Text;
    speed: number
    
    constructor() {
        super('icerinkhud')
    }

    init({speed}) {
        this.speed = speed
    }

    create () {
      this.text = this.add.text(0, 0, `${Math.floor(this.speed)}`, { fontSize: "20rem" })
    }
    
    update () {
    //   this.text.setText('Score:\n\n' + this.game.loop.frame);
    }
  }