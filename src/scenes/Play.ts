import * as Phaser from "phaser";

import Background from "/assets/basic.png";
import Character from "/assets/character.png";

import { MoveableSprite } from "../moveableSprite";
import { MoveCommand } from "../command";

console.log("Play running");

export default class Play extends Phaser.Scene {
  player: MoveableSprite | null = null;
  startingTime: number = performance.now();
  spinner?: Phaser.GameObjects.Shape;

  rotationSpeed = Phaser.Math.PI2 / 1000; // radians per millisecond
  objectsToUpdate: MoveableSprite[] = [];

  constructor() {
    super("play");
  }

  preload() {
    this.load.image("character", Character);
    this.load.image("base", Background);
  }

  create() {
    // Limit to how many ghosts?
    // Add set timeout?
    // Reset resets to 5 seconds ago (instead of resetting to a fixed time)

    this.add.image(0, 0, "base").setOrigin(0, 0);
    this.createNewPlayer();
    this.startingTime = performance.now();

    this.addPlayerInputs();

    this.input.keyboard?.on("keydown-Q", () => {
      this.player?.replay();
    });
    this.input.keyboard?.on("keydown-R", () => {
      this.reset();
    });
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
    const pSprite = this.add.sprite(100, 100, "character").setScale(1);
    this.player = new MoveableSprite(pSprite, 1);
    this.objectsToUpdate.push(this.player);
  }

  recallBackToStart() {
    this.objectsToUpdate.forEach((obj) => {
      obj.sprite.x = 100;
      obj.sprite.y = 100;
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
    this.input.keyboard?.on(
      "keydown-W",
      () =>
        this.player?.action(
          new MoveCommand(1000, { x: 0, y: -1 }, this.getRelativeTime()),
        ),
    );
    this.input.keyboard?.on(
      "keydown-S",
      () =>
        this.player?.action(
          new MoveCommand(1000, { x: 0, y: 1 }, this.getRelativeTime()),
        ),
    );
    this.input.keyboard?.on(
      "keydown-A",
      () =>
        this.player?.action(
          new MoveCommand(1000, { x: -1, y: 0 }, this.getRelativeTime()),
        ),
    );
    this.input.keyboard?.on(
      "keydown-D",
      () =>
        this.player?.action(
          new MoveCommand(1000, { x: 1, y: 0 }, this.getRelativeTime()),
        ),
    );
  }

  // eslint-disable-next-line no-unused-vars
  update(_timeMs: number, _delta: number) {
    this.objectsToUpdate.forEach((obj) => {
      obj.update();
    });

    return;
  }
}
