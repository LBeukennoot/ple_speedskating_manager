import "phaser";
import Icerink from "./Icerink";

//@ts-ignore
// let config: GameConfig = {
//     title: "Speedskating Manager",
//     width: 800,
//     height: 600,
//     scene: [Icerink],
//     type: Phaser.AUTO,
//     scale: {
//         mode: Phaser.Scale.FIT
//         // ...
//     },
//     backgroundColor: "#eeeeee"
// };

// export class Game extends Phaser.Game {

//     //@ts-ignore
//     constructor(config: GameConfig) {
//         super(config);
//     }

// };

// window.onload = () => {
//     var game = new Game(config);
// };

const config = {
    width: 900,
    height: 443,
    backgroundColor: 0x000000,
    pixelArt: true,
    physics: {
        default: "arcade",
        arcade: {
            debug: false
            //debugShowVelocity: false
        }
    },
    scene: [Icerink],
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT
    },
};

var game = new Phaser.Game(config);
