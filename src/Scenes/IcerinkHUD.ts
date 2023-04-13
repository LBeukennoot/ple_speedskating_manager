import 'phaser'

export default class IcerinkHUD extends Phaser.Scene {
    text: Phaser.GameObjects.Text;
    speed: number
    size: {width: number, height: number}
    
    constructor() {
        super('icerinkhud')
    }

    init({speed}) {
        this.speed = speed
    }

    preload() {
      this.load.svg('hud', 'assets/hud.svg');
    }

    create () {
      // this.text = this.add.text(0, 0, `${Math.floor(this.speed)}`, { fontSize: "20rem" })
      // this.size = this.sys.game.canvas;

      const textStyle = { fontSize: "3.5rem", fontFamily:"Open Sans", fontStyle: "bolder italic", fill:"black", align: "right", boundsAlignH: 'right' }

      // let banner1 = this.add.image(0,0, 'live_result_banner').setOrigin(0,0)
      // banner1.displayHeight = banner1.height * 1.3
      // banner1.displayWidth = banner1.width * 1.3
      // banner1.setPosition(100, this.size.height - (3.5 * banner1.displayHeight))

      // this.text = this.add.text(banner1.x, banner1.y, `${Math.floor(this.speed)}`, textStyle)

      // let banner2 = this.add.image(0,0, 'live_result_banner').setOrigin(0,0)
      // banner2.displayHeight = banner2.height * 1.3
      // banner2.displayWidth = banner2.width * 1.3
      // banner2.setPosition(100, this.size.height - (2.5 * banner2.displayHeight))


      // let timeBanner = this.add.image(0,0, 'live_time').setOrigin(0,0)
      // timeBanner.displayHeight = timeBanner.height * 1.3
      // timeBanner.displayWidth = timeBanner.width * 1.3
      // timeBanner.setPosition(860, this.size.height - (1.5 * banner1.displayHeight))
      
      let hudImage = this.add.image(0,0, 'hud').setOrigin(0,0)


      this.text = this.add.text(908, 964, `0.00`, textStyle).setOrigin(0.5,0.5)
      console.log(this.text)

      this.input.mouse.disableContextMenu();

      this.input.on('pointerup', pointer => {
        console.log(pointer)
      })
    }
    
    update (time, delta) {
      const date = new Date(time)
      if (date.getMinutes() <= 0) {
        this.text.text = `${date.getSeconds()},${('0' + date.getMilliseconds()).slice(-2)}`
      } else {
        this.text.text = `${date.getMinutes()}.${('0' + date.getSeconds()).slice(-2)},${('0' + date.getMilliseconds()).slice(-2)}`
      }
      // console.log(this.text.width)
    }
  }