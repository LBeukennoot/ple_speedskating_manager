import 'phaser'


export default class Button {

    scene: Phaser.Scene
    x: number
    y: number
    textureNormal: string
    textureOnclick: string
    buttonNormal: Phaser.GameObjects.Image
    button: Phaser.GameObjects.Image


    constructor({scene, x, y, textureNormal, textureOnClick, pointerDown, pointerUp}) {
    // constructor(scene: Phaser.Scene, x: number, y: number, textureNormal: string, textureOnclick:string, onClick: Function) {

        this.scene = scene
        this.x = x
        this.y = y
        this.textureNormal = textureNormal
        this.textureOnclick = textureOnClick


        this.buttonNormal = this.scene.add.image(x,y, textureNormal).setOrigin(0.5, 0.5)
        this.button = this.scene.add.image(x,y, textureOnClick).setOrigin(0.5, 0.5)

        
        this.button.setInteractive().on('pointerdown', () => {
          
          this.button.alpha = 0.01
          pointerDown()
    
        }, this);
    

        this.button.setInteractive().on('pointerup', () => {
    
          this.button.alpha = 1
          pointerUp()
    
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