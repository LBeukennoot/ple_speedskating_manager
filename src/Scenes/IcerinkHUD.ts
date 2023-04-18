import 'phaser'
import Button from './Button'

export default class IcerinkHUD extends Phaser.Scene {
  text: Phaser.GameObjects.Text;
  speed: number
  size: { width: number, height: number }

  constructor() {
    super('icerinkhud')
  }

  init({ speed }) {
    this.speed = speed
  }

  preload() {
    this.load.svg('hud', 'assets/hud.svg');
    this.load.svg('hud_button_normal', 'assets/hud_button_normal.svg');
    this.load.svg('hud_button_click', 'assets/hud_button_click.svg');
  }

  create() {

    const textStyle = { fontSize: "3.5rem", fontFamily: "Open Sans", fontStyle: "bolder italic", fill: "black", align: "right", boundsAlignH: 'right' }

    let hudImage = this.add.image(0, 0, 'hud').setOrigin(0, 0)

    let slowButton = new Button(this, 1430, 901, 'hud_button_normal', 'hud_button_click')
    let slowText = this.add.text(1430, 901, 'slow', textStyle).setOrigin(0.5, 0.5)
    let boostButton = new Button(this, 1699, 901, 'hud_button_normal', 'hud_button_click')
    let boostText = this.add.text(1699, 901, 'boost', textStyle).setOrigin(0.5, 0.5)

    this.text = this.add.text(908, 964, `0.00`, textStyle).setOrigin(0.5, 0.5)

    this.input.mouse.disableContextMenu();

  }


  update(time, delta) {

    const date = new Date(time)
    if (date.getMinutes() <= 0) {
      this.text.text = `${date.getSeconds()},${('0' + date.getMilliseconds()).slice(-2)}`
    } else {
      this.text.text = `${date.getMinutes()}.${('0' + date.getSeconds()).slice(-2)},${('0' + date.getMilliseconds()).slice(-2)}`
    }
    
  }
}