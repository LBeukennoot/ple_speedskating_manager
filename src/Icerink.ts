import Skater from "./Skater";

export default class Icerink extends Phaser.Scene {
  circuit: any;
  redCar: Skater;
  yellowCar: any;
  cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
  graphics: Phaser.GameObjects.Graphics;
  path: Phaser.Curves.Path;

  //codepen: https://codepen.io/cedarcantab/pen/yLPXRzR
  //svg to JSON path: https://natureofcode.github.io/svg-to-phaser-path/

  preload() {
    this.load.image('trackImage', 'assets/icerink.png');
    this.load.image('redcar', 'assets/speedskater.png');
    this.load.image('yellowcar', 'assets/speedskater.png');
    this.load.json('path', 'assets/route.json')
  }

  create() {
    this.path = new Phaser.Curves.Path(this.cache.json.get('path'));

    this.drawPath(true);
    this.redCar = new Skater(this, 460, 398, 'redcar');
    //@ts-ignore
    this.redCar.startFollow({ path: this.path, pathOffset: -18 }); // don't specify duration -> want to control speed manually
    this.yellowCar = new Skater(this, 0, 0, 'yellowcar');
    this.yellowCar.startFollow({ path: this.path, duration: 8000, pathOffset: -18 });

    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.add.text(8, 2, ["UP Arrow: Accelerate", "DOWN Arrow: Decelerate"], { color: '0x0000ff' })
  }

  update() {
    this.controlRedCar();
  }

  controlRedCar() {
    this.redCar.acceleration = 0;
    if (this.cursorKeys.down.isDown) {
      this.redCar.acceleration = -0.00001;
    } else if (this.cursorKeys.up.isDown) {
      this.redCar.acceleration = 0.00001;
    }
  }

  drawPath(debug = false) {
    // this.add.image(0, 0, 'trackImage').setOrigin(0, 0);
    if (debug) {
      this.graphics = this.add.graphics();
      // this.graphics.setPosition(14, 35)
      this.graphics.lineStyle(2, 0x0000ff, 1);
      this.path.draw(this.graphics);
    }
  }
}