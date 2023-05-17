import 'phaser'


export default class Button {

  scene: Phaser.Scene
  x: number
  y: number
  textureNormal: string
  textureOnclick: string
  buttonClick: Phaser.GameObjects.Image
  buttonNormal: Phaser.GameObjects.Image
  clickable: boolean = true

  constructor({ scene, x, y, textureNormal, textureOnClick, pointerDown, pointerUp }) {
    // constructor(scene: Phaser.Scene, x: number, y: number, textureNormal: string, textureOnclick:string, onClick: Function) {

    this.scene = scene
    this.x = x
    this.y = y
    this.textureNormal = textureNormal
    this.textureOnclick = textureOnClick

    this.buttonClick = this.scene.add.image(x, y, textureNormal).setOrigin(0.5, 0.5)
    this.buttonNormal = this.scene.add.image(x, y, textureOnClick).setOrigin(0.5, 0.5)

    this.buttonClick.alpha = 0.01
    // this.buttonNormal.alpha = 0.01

    this.buttonNormal.setInteractive().on('pointerdown', () => {

      if (this.clickable) {
        console.log("down")
        this.buttonClick.alpha = 1
        this.buttonNormal.alpha = 0.7
        this.pointerDown()
      }

    }, this);

    let mask = this.buttonNormal.createBitmapMask()

    this.buttonNormal.setInteractive(mask.bitmapMask).on('pointerup', () => {

      if (this.clickable) {
        console.log("up")
        this.buttonClick.alpha = 0.01
        this.buttonNormal.alpha = 1
        this.pointerUp()
      }

    }, this);

  }

  setClickable(v: boolean): void {
    this.clickable = v
    this.buttonNormal.setBlendMode(Phaser.BlendModes.LUMINOSITY)
  }

  pointerDown() {}
  pointerUp() {}

  // pointerDown(button) {
  //   console.log(button)
  //   // this.button.visible = false
  // }

  // pointerUp() {
  //   
  // }

}