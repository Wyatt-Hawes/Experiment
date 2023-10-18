import * as Phaser from "phaser";

import Background from "/assets/basic.png";
import Character from "/assets/character.png";
import Box from "/assets/Red Box.png";
import ButtonPressed from "/assets/button_pressed.png";
import ButtonUnpressed from "/assets/button_unpressed.png";

import { MoveableSprite } from "../classes/moveableSprite";
import { Button } from "../classes/button";
import { MoveCommand, Direction } from "../classes/command";
import { tilemapJSON } from "../classes/tilemap";

export default class Play extends Phaser.Scene {
  player: MoveableSprite | null = null;
  startingTime: number = performance.now();

  objectsToUpdate: MoveableSprite[] = [];

  map: Phaser.Tilemaps.Tilemap | null = null;
  tileset: Phaser.Tilemaps.Tileset | null = null;
  layer: Phaser.Tilemaps.TilemapLayer | null = null;
  startPosition = { x: 112, y: 112 };
  buttons: Button[] = [];

  winRect: Phaser.GameObjects.Rectangle | null = null;
  winText: Phaser.GameObjects.Text | null = null;
  countdownTimer: Phaser.GameObjects.Text | null = null;
  countdownTimeout: Phaser.Time.TimerEvent | null = null;

  hasWon: boolean = false;

  constructor() {
    super("play");
  }

  preload() {
    //this.cache.json.add("tilemap", this.tileJSON);

    this.load.image("character", Character);
    this.load.image("base", Background);
    this.load.tilemapTiledJSON("map", tilemapJSON);
    this.load.image("box", Box);
    this.load.image("button-pressed", ButtonPressed);
    this.load.image("button-unpressed", ButtonUnpressed);
  }

  create() {
    // Limit to how many ghosts?
    // Add set timeout?
    // Reset resets to 5 seconds ago (instead of resetting to a fixed time)
    //Phaser.Physics.Arcade.Events.OVERLAP;

    //Add tilemap and its collision
    this.map = this.make.tilemap({ key: "map", tileWidth: 32, tileHeight: 32 });
    this.tileset = this.map.addTilesetImage("base");
    this.layer = this.map.createLayer("Tile Layer 1", this.tileset!);

    //Add background image
    this.add.image(0, 0, "base").setOrigin(0, 0);
    this.createNewPlayer();
    this.map.setCollision([111, 131, 113, 117, 127, 124]);

    //set current starting time for shades
    this.startingTime = performance.now();

    //add all player movement inputs
    this.addPlayerInputs();

    /*
    this.input.keyboard?.on("keydown-Q", () => {
      this.player?.replay();
    });
    */

    //Add special player hotkeys
    this.input.keyboard?.on("keydown-R", () => {
      this.reset();
    });
    this.input.keyboard?.on("keydown-Q", () => {
      this.fullReset();
    });

    //Add clickable buttons
    const buttonCoords: { x: number; y: number }[] = [
      { x: 1, y: 1 },
      { x: 15, y: 6 },
      { x: 8, y: 13 },
      { x: 26, y: 15 },
    ];
    for (const button of buttonCoords) {
      this.buttons.push(
        new Button(this, 32 * button.x + 16, 32 * button.y + 16),
      );
    }

    this.winRect = this.add
      .rectangle(240, 270, 560, 110, 0x000000)
      .setOrigin(0, 0)
      .setVisible(false);
    this.winText = this.add
      .text(250, 280, "You WIN!!")
      .setFontSize("100px")
      .setColor("white")
      .setVisible(false);

    this.startCountdown();
  }

  getRelativeTime() {
    return performance.now() - this.startingTime;
  }

  reset() {
    //Reset player position and play its shade.
    this.startingTime = performance.now();
    this.createNewPlayer();
    this.recallBackToStart();
    this.startAllReplays();
    this.startCountdown();
  }

  fullReset() {
    //Reset and delete all shades
    this.deleteShades();
    this.reset();

    this.hasWon = false;
    this.winRect!.visible = false;
    this.winText!.visible = false;
  }

  deleteShades() {
    this.objectsToUpdate.forEach((obj) => {
      obj.sprite.destroy();
    });
    this.objectsToUpdate = [];
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
    const wKey = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.W)!;
    const sKey = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.S)!;
    const aKey = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.A)!;
    const dKey = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.D)!;

    const keys: {
      key: Phaser.Input.Keyboard.Key;
      dir: Direction;
    }[] = [
      { key: wKey, dir: { x: 0, y: -1 } },
      { key: sKey, dir: { x: 0, y: 1 } },
      { key: aKey, dir: { x: -1, y: 0 } },
      { key: dKey, dir: { x: 1, y: 0 } },
    ];

    const commandDuration = 318;
    for (const key of keys) {
      key.key?.on("down", () => {
        this.player?.action(
          new MoveCommand(commandDuration, key.dir, this.getRelativeTime()),
        );
      });
    }
  }

  // eslint-disable-next-line no-unused-vars
  update(_timeMs: number, _delta: number) {
    this.objectsToUpdate.forEach((obj) => {
      obj.update();
    });

    this.checkButtons();
    this.checkWin();
    this.setCountdownText();

    return;
  }

  checkButtons() {
    for (const button of this.buttons) {
      let pressed: Boolean = false;
      for (const object of this.objectsToUpdate) {
        if (button.checkPress(object)) {
          button.press();
          pressed = true;
          //breaks the object loop
        }
      }
      if (pressed == false) {
        button.unpress();
      }
    }
  }

  checkWin() {
    const total_pressed = this.buttons.filter((button) => button.pressed);
    if (total_pressed.length == this.buttons.length) {
      this.triggerWin();
    }
  }

  triggerWin() {
    this.winRect!.visible = true;
    this.winText!.visible = true;
    this.hasWon = true;
  }

  startCountdown() {
    this.countdownTimeout?.destroy();
    if (!this.countdownTimer) {
      this.countdownTimer = this.add.text(800, 50, "10").setFontSize("50px");
    }
    this.countdownTimeout = this.time.delayedCall(18000, () => {
      if (!this.hasWon) {
        this.reset();
      }
    });
  }
  setCountdownText() {
    const val = this.countdownTimeout!.getProgress().toString();
    const newText = (18 - parseFloat(val) * 18).toFixed(1);
    this.countdownTimer?.setText(newText);
  }
}
