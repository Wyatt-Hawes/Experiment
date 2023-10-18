import { MoveableSprite } from "./moveableSprite";

export class Button extends Phaser.GameObjects.Sprite {
  pressed: Boolean = false;
  unpressedTexture: string = "";
  pressedTexture: string = "";

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "button-unpressed");

    this.unpressedTexture = "button-unpressed";
    this.pressedTexture = "button-pressed";

    // Add this zone to the scene
    scene.add.existing(this);

    this.depth = 0.5;

    // Enable physics for the zone
    scene.physics.world.enable(this);
    (this.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);
    (this.body as Phaser.Physics.Arcade.Body).immovable = true;
  }

  checkPress(object: MoveableSprite) {
    return this.scene.physics.overlap(this, object.sprite);
  }

  press() {
    if (!this.pressed) {
      this.pressed = true;
      this.setTexture(this.pressedTexture);
    }
  }

  unpress() {
    if (this.pressed) {
      this.pressed = false;
      this.setTexture(this.unpressedTexture);
    }
  }
}
