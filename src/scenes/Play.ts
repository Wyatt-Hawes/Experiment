import * as Phaser from "phaser";

import Background from "/assets/basic.png";
import Character from "/assets/character.png";
import Box from "/assets/Red Box.png";
const tilemapURL = "/assets/basic.json?url";

import { MoveableSprite } from "../classes/moveableSprite";
import { MoveCommand } from "../classes/command";

console.log("Play running");

export default class Play extends Phaser.Scene {
  player: MoveableSprite | null = null;
  startingTime: number = performance.now();

  objectsToUpdate: MoveableSprite[] = [];

  map: Phaser.Tilemaps.Tilemap | null = null;
  tileset: Phaser.Tilemaps.Tileset | null = null;
  layer: Phaser.Tilemaps.TilemapLayer | null = null;
  startPosition = { x: 112, y: 112 };

  constructor() {
    super("play");
  }

  preload() {
    this.load.image("character", Character);
    this.load.image("base", Background);
    this.load.tilemapTiledJSON("map", tilemapURL);
    console.log("Test");
    this.load.image("box", Box);
  }

  create() {
    // Limit to how many ghosts?
    // Add set timeout?
    // Reset resets to 5 seconds ago (instead of resetting to a fixed time)
    //Phaser.Physics.Arcade.Events.OVERLAP;

    this.map = this.make.tilemap({ key: "map", tileWidth: 32, tileHeight: 32 });
    this.tileset = this.map.addTilesetImage("base");
    this.layer = this.map.createLayer("Tile Layer 1", this.tileset!);

    this.add.image(0, 0, "base").setOrigin(0, 0);
    this.createNewPlayer();
    this.map.setCollision([111, 131, 113, 117, 127, 124]);

    this.startingTime = performance.now();

    this.addPlayerInputs();

    this.input.keyboard?.on("keydown-Q", () => {
      this.player?.replay();
    });
    this.input.keyboard?.on("keydown-R", () => {
      this.reset();
    });

    /*
    const rect = this.physics.add.staticSprite(300, 300, "box");

    //this.physics.add.existing(rect);
    this.physics.add.collider(this.player!.sprite, rect, () => {
      console.log("????");
    });
    */
  }

  getRelativeTime() {
    return performance.now() - this.startingTime;
  }

  reset() {
    this.startingTime = performance.now();
    this.createNewPlayer();
    this.recallBackToStart();
    this.startAllReplays();
  }

  createNewPlayer() {
    if (this.player != null) {
      this.player.sprite.alpha = 0.5;
    }
    const pSprite = this.physics.add
      .sprite(this.startPosition.x, this.startPosition.y, "character")
      .setScale(1)
      .setAcceleration(0, 0);
    this.player = new MoveableSprite(pSprite, 100);
    this.objectsToUpdate.push(this.player);

    this.physics.add.existing(this.player?.sprite!);
    this.physics.add.collider(this.player!.sprite, this.layer!);
  }

  recallBackToStart() {
    this.objectsToUpdate.forEach((obj) => {
      obj.sprite.x = this.startPosition.x;
      obj.sprite.y = this.startPosition.y;
      obj.stopAllTimeouts();
    });
  }

  startAllReplays() {
    this.objectsToUpdate.forEach((obj) => {
      if (obj == this.player) {
        return;
      }
      obj.replay();
    });
  }

  addPlayerInputs() {
    //Key Objects
    const wKey = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    const sKey = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    const aKey = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    const dKey = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    const commandDuration = 318;

    wKey?.on("down", () => {
      this.player?.action(
        new MoveCommand(
          commandDuration,
          { x: 0, y: -1 },
          this.getRelativeTime(),
        ),
      );
    });

    sKey?.on("down", () => {
      this.player?.action(
        new MoveCommand(
          commandDuration,
          { x: 0, y: 1 },
          this.getRelativeTime(),
        ),
      );
    });
    aKey?.on("down", () => {
      this.player?.action(
        new MoveCommand(
          commandDuration,
          { x: -1, y: 0 },
          this.getRelativeTime(),
        ),
      );
    });
    dKey?.on("down", () => {
      this.player?.action(
        new MoveCommand(
          commandDuration,
          { x: 1, y: 0 },
          this.getRelativeTime(),
        ),
      );
    });
  }

  // eslint-disable-next-line no-unused-vars
  update(_timeMs: number, _delta: number) {
    this.objectsToUpdate.forEach((obj) => {
      obj.update();
    });

    return;
  }
}
