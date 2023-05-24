import 'phaser'
import Button from './Button'
import BoostButton from './BoostButton'
import Skater from '../Skater'

export default class IcerinkHUD extends Phaser.Scene {
  timerText: Phaser.GameObjects.Text
  splitTime1: Phaser.GameObjects.Text
  splitTime2: Phaser.GameObjects.Text
  distanceText: Phaser.GameObjects.Text

  skaterName1: Phaser.GameObjects.Text
  skaterName2: Phaser.GameObjects.Text

  distances = {
    '500': {
      finishDistances: [0, 100, 500],
      finishAmount: 3
    }
  }

  distance = 500

  player: Skater
  opponent: Skater
  size: { width: number, height: number }
  timer: Date
  boostButton: BoostButton


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
    this.load.svg('hud_button_stamina', 'assets/hud_button_stamina.svg')
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
    this.distanceText = this.add.text(231, 965, `0m`, smallTextStyle).setOrigin(0.5, 0.5)

    this.skaterName1 = this.add.text(334, 833, this.player.name.toUpperCase(), nameStyle).setOrigin(0, 0.5)
    this.skaterName2 = this.add.text(334, 895, this.opponent.name.toUpperCase(), nameStyle).setOrigin(0, 0.5)


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



    this.boostButton = new BoostButton({
      scene: this,
      x: 1699,
      y: 901,
      textureNormal: 'hud_button_normal',
      textureOnClick: 'hud_button_click',
      pointerDown: () => {  },
      pointerUp: () => {  }
    }, this.player)

    // let mask = this.boostButton.buttonNormal.createBitmapMask()
    // this.boostButtonLevel = this.add.image(1699 - (2*this.boostLevel), 901, 'hud_button_stamina')
    // this.boostButtonLevel.setMask(mask);

    // this.boostButton.setClickable(false)

    // boost bar 0% = origin - 202
    // boost bar 100% = origin

    let boostText = this.add.text(1699, 901, 'boost', textStyle).setOrigin(0.5, 0.5)

  }


  formatDate(date: Date): string {
    
    if(date) {
      if (date.getMinutes() <= 0) {
        return `${date.getSeconds()},${('0' + date.getMilliseconds()).slice(-2)}`
      } else {
        return `${date.getMinutes()}.${('0' + date.getSeconds()).slice(-2)},${('0' + date.getMilliseconds()).slice(-2)}`
      }
    } else {
      return '0,00'
    }
  }

  showEndingScreen(text: string) {
    this.scene.stop('icerinkhud')
    this.scene.launch("end", {text: text})
  }

  update(time, delta) {

    this.boostButton.update()

    this.timer = new Date(time)
    this.timerText.text = this.formatDate(this.timer)

    this.splitTime1.text = this.formatDate(this.player.getLastFinishTime())
    this.splitTime2.text = this.formatDate(this.opponent.getLastFinishTime())
    

    if (this.opponent.finishTimes.length == this.distances[this.distance.toString()].finishAmount - 1) {
      this.opponent.acceleration = -0.05
    }

    let laps = this.player.finishTimes.length
    this.distanceText.text = this.distances[this.distance.toString()].finishDistances[laps] + '/' + this.distance.toString() + 'm'

    if (laps == this.distances[this.distance.toString()].finishAmount - 1) {
      this.player.acceleration = -0.05

      let opponentLaps = this.opponent.finishTimes.length
      let playerLaps = this.player.finishTimes.length
      let opponentTime = this.opponent.finishTimes[opponentLaps - 1]
      let playerTime = this.player.finishTimes[playerLaps - 1]

      if (playerLaps > 0 && opponentLaps > 0) {
        if (playerTime < opponentTime) {
          this.showEndingScreen("WON")
        } else {
          if (playerLaps > opponentLaps) {
            this.showEndingScreen("WON")
          } else {
            this.showEndingScreen("LOST")
          }
        }
      } else {
        if (playerLaps > opponentLaps) {
          this.showEndingScreen("WON")
        } else {
          this.showEndingScreen("LOST")
        }
      }

      //open finish screen
    }
  }
}