export default class TestScene extends Phaser.Scene {

    // x: number = 0;
    // y: number = 0;
    // d: number = 1;

    flame

    preload ()
    {
        this.load.image('trackImage', 'assets/icerink.png');
        // this.load.image('player', 'assets/speedskater.png');
        this.load.atlas('line', 'assets/particles/line.png', 'assets/particles/line.json');
    }

    create ()
    {
        this.add.image(400, 300, 'trackImage');

        // this.add.particles('player', {
        //     x: 0,
        //     y: 500,
        //     advance: 2000,
        //     moveToX: 400,
        //     moveToY: 570,
        //     lifespan: 2000,
        //     sortProperty: 'lifeT',
        //     sortOrderAsc: true
        // });

        this.flame = this.add.particles('line',
        {
            x: 500,
            y: {min: 510, max: 400},
            // accelerationX: -300,
            speed: 50,
            color: [ 0xff0000, 0x000000 ],
            colorEase: 'quart.out',
            lifespan: 1500,
            angle: 90,
            rotate: 90,
            scale: 0.5,
            quantity: 0.1,
        });

        // this.flame.emitter.setQuantity(500)
    }

    update() {
        // if(this.x >= 500) {
        //     this.d = -1
        // } else if (this.x < 0) {
        //     this.d = -1
        // }

        // this.x += this.d
        // this.y += this.d

        // console.log(this.x)

        // this.flame.x = this.x
        // this.flame.y = this.y
    }
}