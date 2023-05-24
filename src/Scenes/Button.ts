import 'phaser'


export default class Button {

  scene: Phaser.Scene

  x: number
  y: number

  textureNormal: string
  textureOnClick: string

  button: Phaser.GameObjects.Image

  clickable: boolean = true

  pointerDown = () => { }
  pointerUp = () => { }


  constructor({ scene, x, y, textureNormal, textureOnClick, pointerDown, pointerUp }) {

    this.scene = scene
    this.x = x
    this.y = y
    this.textureNormal = textureNormal
    this.textureOnClick = textureOnClick
    this.pointerDown = pointerDown
    this.pointerUp = pointerUp

    this.button = this.scene.add.image(x, y, textureNormal).setOrigin(0.5, 0.5)


    this.button.setInteractive().on('pointerdown', () => {

      if (this.clickable) {
        this.button.alpha = 0.75
        this.pointerDown()
      }

    }, this);

    let mask = this.button.createBitmapMask()

    this.button.setInteractive(mask.bitmapMask).on('pointerup', () => {

      if (this.clickable) {
        this.button.alpha = 1
        this.pointerUp()
      }

    }, this);

  }

  setClickable(v: boolean): void {
    this.clickable = v
    if (v) {
      this.button.alpha = 1
      this.button.setTexture(this.textureNormal)
    } else {
      this.button.alpha = 0.75
      this.button.setTexture(this.textureOnClick)
    }
  }

}