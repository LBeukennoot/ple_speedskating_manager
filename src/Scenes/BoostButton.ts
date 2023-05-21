import Button from './Button'
import Skater from '../Skater'

export default class BoostButton extends Button {

    boostLevel: number = -201
    boostActive: boolean = false
    boostButtonLevel

    boostUpSpeed: number = 0.25
    boostDownSpeed: number = 0.5

    boostSpeed: number = 1.1

    player: Skater

    constructor(obj: any, player: Skater) {
        super(obj)
        this.player = player

        let mask = this.buttonNormal.createBitmapMask()
        this.boostButtonLevel = this.scene.add.image(1699 - (2 * this.boostLevel), 901, 'hud_button_stamina')
        this.boostButtonLevel.setMask(mask)



        this.setClickable(false)
    }

    pointerDown() {
        this.boostActive = true
        this.clickable = false

        this.player.boostActive = true
        this.player.toggleBoost(true)
    }

    // pointerUp() {
        
    // }

    update() {
        if (this.boostLevel <= 0 && !this.boostActive) {
            this.clickable = false
            this.boostLevel += this.boostUpSpeed
        } else if (this.boostActive) {
            this.boostLevel -= this.boostDownSpeed
            if (this.boostLevel <= -200) {
                this.boostActive = false
                this.buttonClick.alpha = 0.01
                this.buttonNormal.alpha = 1
                
                this.player.boostActive = false
                this.player.toggleBoost(false)
            }
        } else if (this.boostLevel > 0) {
            this.clickable = true
        }

        if (this.clickable) {
            this.buttonClick.alpha = 0.01
            this.buttonNormal.alpha = 1
        } else {
            this.buttonClick.alpha = 1
            this.buttonNormal.alpha = 0.7
        }


        this.boostButtonLevel.x = 1699 + this.boostLevel
    }
}