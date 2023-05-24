import Button from './Button'
import Skater from '../Skater'

export default class BoostButton extends Button {

    boostLevel: number = -201
    boostActive: boolean = false
    boostButtonLevel

    boostUpSpeed: number = 0.25
    boostDownSpeed: number = 0.5

    player: Skater

    constructor(obj: any, player: Skater) {
        super(obj)
        this.player = player

        let mask = this.button.createBitmapMask()
        this.boostButtonLevel = this.scene.add.image(1699 - (2 * this.boostLevel), 901, 'hud_button_stamina')
        this.boostButtonLevel.setMask(mask)

        this.pointerDown = () => {
            this.boostActive = true
            this.setClickable(false)

            this.player.boostActive = true
            this.player.toggleBoost(true)
        }

        this.setClickable(false)
    }

    update() {
        if (this.boostLevel <= 0 && !this.boostActive) {
            this.setClickable(false)
            this.boostLevel += this.boostUpSpeed
        } else if (this.boostActive) {
            this.boostLevel -= this.boostDownSpeed
            if (this.boostLevel <= -200) {
                this.boostActive = false

                this.player.boostActive = false
                this.player.toggleBoost(false)
            }
        } else if (this.boostLevel > 0) {
            this.setClickable(true)
        }


        this.boostButtonLevel.x = 1699 + this.boostLevel
    }
}