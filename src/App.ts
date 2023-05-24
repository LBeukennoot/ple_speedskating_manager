import "phaser";
import Startup from "./Scenes/Startup";
import End from "./Scenes/End";
import Icerink from "./Scenes/Icerink";
import IcerinkHUD from "./Scenes/IcerinkHUD";

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
    width: 1920,
    height: 1080,
    backgroundColor: 0x888888,
    // pixelArt: false,
    physics: {
        default: "arcade",
        // arcade: {
            // debug: false
            //debugShowVelocity: false
        // }
    },
    scene: [ Startup, Icerink, IcerinkHUD, End],
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT
    },
};

var game = new Phaser.Game(config);