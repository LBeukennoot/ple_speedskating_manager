import Skater from "./Skater";

export default class Icerink extends Phaser.Scene {
  circuit: Phaser.Curves.Path;
  redCar: Skater;
  yellowCar: any;
  cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
  graphics: Phaser.GameObjects.Graphics;
  path: any;

  //codepen: https://codepen.io/cedarcantab/pen/yLPXRzR

  preload() {
    this.load.image('racetrack', 'assets/icerink.png');
    this.load.image('redcar', 'assets/speedskater.png');
    this.load.image('yellowcar', 'assets/speedskater.png');
    this.load.json('circuit', 'assets/route.json')
  }

  create() {
    this.circuit = new Phaser.Curves.Path(this.cache.json.get('circuit'));
    this.circuit.moveTo(14, 35)
    this.drawCircuit(true);
    this.redCar = new Skater(this, 460, 398, 'redcar');
    //@ts-ignore
    this.redCar.startFollow({ path: this.circuit, pathOffset: -18 }); // don't specify duration -> want to control speed manually
    this.yellowCar = new Skater(this, 0, 0, 'yellowcar');
    this.yellowCar.startFollow({ path: this.circuit, duration: 8000, pathOffset: -18 });

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

  drawCircuit(debug = false) {
    this.add.image(0,0, 'racetrack').setOrigin(0, 0);
    if (debug) {
      this.graphics = this.add.graphics();
      // this.graphics.setPosition(14, 35)
      this.graphics.lineStyle(2, 0x0000ff, 1);
      this.circuit.draw(this.graphics);
    }
  }
}