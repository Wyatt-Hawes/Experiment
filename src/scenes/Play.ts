import * as Phaser from "phaser";

import Background from "/assets/basic.png";
import Character from "/assets/character.png";
import Box from "/assets/Red Box.png";

import { MoveableSprite } from "../classes/moveableSprite";
import { MoveCommand } from "../classes/command";

console.log("Play running");

export default class Play extends Phaser.Scene {
  tileJSON = {
    compressionlevel: -1,
    height: 20,
    infinite: false,
    layers: [
      {
        data: [
          111, 131, 131, 131, 131, 131, 131, 131, 131, 131, 131, 131, 131, 131,
          131, 131, 131, 131, 131, 131, 131, 131, 131, 131, 131, 131, 131, 131,
          131, 113, 117, 174, 175, 176, 177, 174, 171, 172, 177, 174, 175, 176,
          177, 174, 175, 174, 175, 176, 177, 174, 175, 174, 175, 174, 175, 174,
          175, 176, 177, 117, 117, 182, 183, 184, 185, 182, 179, 180, 174, 175,
          176, 177, 185, 182, 174, 175, 176, 177, 177, 177, 177, 177, 177, 177,
          176, 182, 183, 184, 185, 117, 117, 190, 191, 192, 174, 175, 187, 188,
          182, 183, 184, 185, 193, 190, 182, 183, 184, 185, 185, 185, 185, 185,
          185, 185, 171, 172, 175, 176, 177, 117, 117, 171, 172, 200, 182, 183,
          195, 196, 190, 191, 192, 193, 201, 198, 190, 191, 192, 193, 193, 193,
          193, 193, 193, 193, 179, 180, 183, 184, 185, 117, 117, 179, 180, 175,
          176, 177, 177, 193, 198, 171, 172, 201, 201, 201, 198, 199, 200, 201,
          201, 201, 201, 201, 201, 201, 187, 188, 191, 192, 193, 117, 117, 174,
          175, 183, 184, 174, 175, 176, 177, 179, 180, 201, 199, 201, 188, 201,
          188, 188, 188, 201, 198, 199, 200, 201, 195, 196, 199, 200, 201, 117,
          117, 182, 183, 191, 192, 182, 183, 184, 185, 192, 202, 202, 202, 202,
          202, 202, 202, 202, 202, 203, 174, 175, 176, 177, 175, 176, 174, 175,
          176, 117, 117, 190, 191, 171, 172, 190, 191, 192, 193, 192, 210, 202,
          210, 210, 202, 203, 210, 210, 210, 211, 182, 183, 184, 185, 183, 184,
          182, 183, 184, 117, 117, 195, 196, 179, 180, 198, 199, 200, 201, 199,
          210, 210, 210, 211, 210, 211, 211, 210, 210, 211, 190, 191, 192, 193,
          171, 172, 190, 191, 192, 117, 117, 179, 174, 175, 172, 182, 183, 184,
          185, 199, 202, 203, 203, 203, 202, 203, 202, 210, 210, 211, 198, 199,
          200, 174, 179, 180, 177, 177, 200, 117, 117, 171, 182, 183, 180, 190,
          191, 192, 193, 199, 210, 211, 211, 211, 210, 211, 210, 210, 210, 211,
          188, 188, 182, 182, 187, 188, 175, 176, 177, 117, 117, 179, 190, 191,
          188, 198, 199, 200, 201, 171, 171, 172, 172, 173, 220, 221, 172, 173,
          188, 188, 188, 183, 190, 190, 195, 196, 183, 184, 185, 117, 117, 187,
          188, 195, 196, 176, 177, 174, 175, 179, 179, 180, 180, 181, 220, 221,
          180, 181, 182, 183, 184, 199, 198, 198, 199, 190, 191, 192, 193, 117,
          117, 195, 196, 175, 176, 171, 172, 182, 183, 187, 187, 188, 188, 189,
          220, 221, 188, 189, 190, 191, 192, 199, 174, 175, 176, 171, 172, 176,
          177, 117, 117, 174, 175, 176, 177, 179, 180, 190, 191, 195, 195, 196,
          172, 173, 220, 221, 196, 197, 178, 179, 180, 199, 182, 183, 184, 179,
          180, 176, 177, 117, 117, 182, 183, 184, 185, 187, 188, 198, 199, 199,
          201, 183, 180, 181, 220, 221, 180, 181, 199, 182, 183, 184, 190, 191,
          192, 187, 188, 184, 185, 117, 117, 190, 191, 192, 193, 195, 196, 192,
          193, 199, 183, 183, 188, 189, 220, 221, 188, 189, 199, 190, 191, 192,
          198, 199, 200, 195, 196, 192, 193, 117, 117, 198, 199, 200, 201, 198,
          199, 200, 201, 184, 184, 184, 196, 197, 228, 229, 196, 197, 199, 178,
          179, 178, 179, 180, 198, 198, 199, 200, 201, 117, 127, 131, 131, 131,
          131, 131, 131, 131, 131, 131, 131, 131, 131, 131, 131, 131, 131, 131,
          131, 131, 131, 131, 131, 131, 131, 131, 131, 131, 131, 124,
        ],
        height: 20,
        id: 1,
        name: "Tile Layer 1",
        opacity: 1,
        type: "tilelayer",
        visible: true,
        width: 30,
        x: 0,
        y: 0,
      },
      {
        data: [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0,
        ],
        height: 20,
        id: 2,
        name: "Tile Layer 2",
        opacity: 1,
        type: "tilelayer",
        visible: true,
        width: 30,
        x: 0,
        y: 0,
      },
    ],
    nextlayerid: 3,
    nextobjectid: 1,
    orientation: "orthogonal",
    renderorder: "right-down",
    tiledversion: "1.10.1",
    tileheight: 32,
    tilesets: [
      {
        columns: 15,
        firstgid: 1,
        image:
          "../Downloads/P_P_FREE_RPG_TILESET/P_P_FREE_RPG_TILESET/Dungeon_24x24.png",
        imageheight: 168,
        imagewidth: 360,
        margin: 0,
        name: "Dungeon_24x24",
        spacing: 0,
        tilecount: 105,
        tileheight: 24,
        tilewidth: 24,
      },
      {
        columns: 8,
        firstgid: 106,
        image:
          "../Downloads/Pixel Art Top Down - Basic/Texture/TX Tileset Stone Ground.png",
        imageheight: 256,
        imagewidth: 256,
        margin: 0,
        name: "TX Tileset Stone Ground",
        spacing: 0,
        tilecount: 64,
        tileheight: 32,
        tilewidth: 32,
      },
      {
        columns: 8,
        firstgid: 170,
        image:
          "../Downloads/Pixel Art Top Down - Basic/Texture/TX Tileset Grass.png",
        imageheight: 256,
        imagewidth: 256,
        margin: 0,
        name: "TX Tileset Grass",
        spacing: 0,
        tilecount: 64,
        tileheight: 32,
        tilewidth: 32,
      },
    ],
    tilewidth: 32,
    type: "map",
    version: "1.10",
    width: 30,
  };

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
    //this.cache.json.add("tilemap", this.tileJSON);

    this.load.image("character", Character);
    this.load.image("base", Background);
    this.load.tilemapTiledJSON("map", this.tileJSON);
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
