export class Button extends Phaser.GameObjects.Sprite {
  pressed: Boolean = false;
  unpressedTexture: string = "";
  pressedTexture: string = "";

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    unpressedTexture: string,
    pressedTexture: string,
  ) {
    super(scene, x, y, unpressedTexture);

    this.unpressedTexture = unpressedTexture;
    this.pressedTexture = pressedTexture;

    // Add this zone to the scene
    scene.add.existing(this);

    this.depth = 0.5;

    // Enable physics for the zone
    scene.physics.world.enable(this);
    (this.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);
    (this.body as Phaser.Physics.Arcade.Body).immovable = true;
  }

  checkPress(sprite: Phaser.GameObjects.GameObject) {
    return this.scene.physics.overlap(this, sprite);
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
