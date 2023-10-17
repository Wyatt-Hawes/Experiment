import * as Phaser from "phaser";
import Menu from "./scenes/Menu";
import Play from "./scenes/Play";

const config: Phaser.Types.Core.GameConfig = {
  width: 960,
  height: 640,
  scene: [Menu, Play],
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
    },
  },
};

document.title = "CMPM - 170 Prototype";
document.body.style.backgroundColor = "beige";

new Phaser.Game(config);
