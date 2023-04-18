import 'phaser'

export default class Button {

    scene: Phaser.Scene
    x: number
    y: number
    textureNormal: string
    textureOnclick: string
    buttonNormal: Phaser.GameObjects.Image
    button: Phaser.GameObjects.Image

    constructor(scene: Phaser.Scene, x: number, y: number, textureNormal: string, textureOnclick:string) {

        this.scene = scene
        this.x = x
        this.y = y
        this.textureNormal = textureNormal
        this.textureOnclick = textureOnclick


        this.buttonNormal = this.scene.add.image(x,y, textureNormal).setOrigin(0.5, 0.5)
        this.button = this.scene.add.image(x,y, textureOnclick).setOrigin(0.5, 0.5)
        this.button.setInteractive();
    
        this.scene.input.on('gameobjectdown', function (pointer, gameObject) {
    
          if (pointer.leftButtonDown()) {
            gameObject.alpha = 0.1
          }
    
        }, this);
    
        this.scene.input.on('gameobjectup', function (pointer, gameObject) {
    
          if (pointer.leftButtonReleased()) {
            gameObject.alpha = 1
          }
    
        }, this);

    }

    pointerDown(button) {
        console.log(button)
        // this.button.visible = false
    }

    pointerUp() {
        this.button.visible = true
    }
}