import 'phaser'
import Button from './Button'
import Skater from '../Skater'

export default class IcerinkHUD extends Phaser.Scene {
  timerText: Phaser.GameObjects.Text
  splitTime1: Phaser.GameObjects.Text
  splitTime2: Phaser.GameObjects.Text

  skaterName1: Phaser.GameObjects.Text
  skaterName2: Phaser.GameObjects.Text

  player: Skater
  opponent: Skater
  size: { width: number, height: number }
  timer: Date

  constructor() {
    super('icerinkhud')
  }


  init({ player, opponent }) {
    this.player = player
    this.opponent = opponent
  }

  preload() {
    this.load.svg('hud', 'assets/hud.svg')
    this.load.svg('hud_button_normal', 'assets/hud_button_normal.svg')
    this.load.svg('hud_button_click', 'assets/hud_button_click.svg')
  }

  create() {

    const textStyle = { fontSize: "3.5rem", fontFamily: "Open Sans", fontStyle: "bolder italic", fill: "black", align: "right", boundsAlignH: 'right' }
    const smallTextStyle = { fontSize: "2.6rem", fontFamily: "Open Sans", fontStyle: "bolder italic", fill: "black", align: "right", boundsAlignH: 'right' }
    const nameStyle = { fontSize: "2.6rem", fontFamily: "Open Sans", fontStyle: "bolder italic", fill: "white", align: "right", boundsAlignH: 'right' }

    let hudImage = this.add.image(0, 0, 'hud').setOrigin(0, 0)

    this.initButtons(textStyle)

    this.timerText = this.add.text(908, 964, `0.00`, textStyle).setOrigin(0.5, 0.5)
    this.splitTime1 = this.add.text(912, 837, `0.00`, smallTextStyle).setOrigin(0.5, 0.5)
    this.splitTime2 = this.add.text(912, 901, `0.00`, smallTextStyle).setOrigin(0.5, 0.5)

    this.skaterName1 = this.add.text(334, 833, this.player.name.toUpperCase(), nameStyle).setOrigin(0, 0.5)
    this.skaterName2 = this.add.text(334, 895, this.opponent.name.toUpperCase(), nameStyle).setOrigin(0, 0.5)

    this.input.mouse.disableContextMenu()

  }

  initButtons(textStyle) {
    let slowButton = new Button({
      scene: this,
      x: 1430,
      y: 901,
      textureNormal: 'hud_button_normal',
      textureOnClick: 'hud_button_click',
      pointerDown: () => { this.player.acceleration = -0.05 },
      pointerUp: () => { this.player.acceleration = 0 }
    })
    let slowText = this.add.text(1430, 901, 'slow', textStyle).setOrigin(0.5, 0.5)
    let boostButton = new Button({
      scene: this,
      x: 1699,
      y: 901,
      textureNormal: 'hud_button_normal',
      textureOnClick: 'hud_button_click',
      pointerDown: () => { this.player.acceleration = 0.05; this.player.maxSpeed *= 1.1 },
      pointerUp: () => { this.player.acceleration = 0; this.player.maxSpeed /= 1.1 }
    })
    let boostText = this.add.text(1699, 901, 'boost', textStyle).setOrigin(0.5, 0.5)
  }


  formatDate(date: Date): string {
    if (date.getMinutes() <= 0) {
      return `${date.getSeconds()},${('0' + date.getMilliseconds()).slice(-2)}`
    } else {
      return `${date.getMinutes()}.${('0' + date.getSeconds()).slice(-2)},${('0' + date.getMilliseconds()).slice(-2)}`
    }
  }


  update(time, delta) {

    this.timer = new Date(time)
    this.timerText.text = this.formatDate(this.timer)

    this.splitTime1.text = this.formatDate(this.player.getLastFinishTime())
    this.splitTime2.text = this.formatDate(this.opponent.getLastFinishTime())

  }
}