import Skater from "../Skater"

export default class Icerink extends Phaser.Scene {
  circuit: any
  player: Skater
  cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys
  graphics: Phaser.GameObjects.Graphics
  path: Phaser.Curves.Path
  opposite: Skater
  hud: any

  constructor() {
    super("icerink")
  }

  //codepen: https://codepen.io/cedarcantab/pen/yLPXRzR
  //svg to JSON path: https://natureofcode.github.io/svg-to-phaser-path/

  preload() {
    this.load.image('trackImage', 'assets/icerink.png')
    this.load.image('player', 'assets/speedskater.png')
    this.load.json('path', 'assets/route.json')
  }

  create() {
    this.cameras.main.setBounds(0, 0, 3753, 1854.65)
    


    this.path = new Phaser.Curves.Path(this.cache.json.get('path'))

    this.drawPath(true)
    this.player = new Skater({
      scene: this,
      texture: 'player',
      name: "Jutta Leerdam"
    });
    //@ts-ignore
    this.player.startFollow({ 
      path: this.path, 
      pathOffset: -18,
    }) // don't specify duration -> want to control speed manually
    this.opposite = new Skater({
      scene: this,
      texture: 'player',
      startSpeed: 0.05,
      // speed: 3,
      startPosition: 50,
      tint: 0xff00ff,
      name: "Koen Verweij"
    })
    //@ts-ignore
    this.opposite.startFollow({ path: this.path, pathOffset: -18 }) // don't specify duration -> want to control speed manually

    
    this.scene.launch("icerinkhud", {player: this.player, opponent: this.opposite})
    this.hud = this.scene.get("icerinkhud")

    this.cameras.main.setZoom(4)
  }

  update() {
    // this.player.acceleration = 2;
    // this.controlPlayer()
    this.cameras.main.centerOn(this.player.getX(), this.player.getY())
    this.hud.speed = this.player.speed

  }

  drawPath(debug = false) {
    this.add.image(0, 0, 'trackImage').setOrigin(0, 0);
    if (debug) {
      this.graphics = this.add.graphics()
      // this.graphics.setPosition(14, 35)
      // this.graphics.lineStyle(2, 0x0000ff, 1);
      this.path.draw(this.graphics)
    }
  }
}