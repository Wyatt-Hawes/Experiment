import { MoveCommand, Direction } from "./command";
console.log("Moveable sprite running");

//This prevents an error when deploying to github-pages
type Timeout = ReturnType<typeof setTimeout>;

export class MoveableSprite {
  sprite: Phaser.Physics.Arcade.Sprite;
  velocity: number;
  xVelocity: number;
  yVelocity: number;
  direction: Direction | null = null;
  moving: boolean = false;

  actionList: MoveCommand[] = [];
  timeoutID: Timeout | null = null;
  timeoutIDList: Timeout[] = [];

  constructor(sprite: Phaser.Physics.Arcade.Sprite, velocity = 0) {
    this.sprite = sprite;
    this.xVelocity = 0;
    this.yVelocity = 0;
    this.velocity = velocity;

    this.sprite.depth = 2;
  }

  action(command: MoveCommand) {
    if (this.moving) {
      return;
    }
    this.moving = true;

    this.actionList.push(command);

    this.xVelocity = this.velocity * command.direction.x;
    this.yVelocity = this.velocity * command.direction.y;

    this.direction = command.direction;

    if (this.timeoutID != null) {
      clearTimeout(this.timeoutID);
    }

    this.timeoutID = setTimeout(() => {
      this.moving = false;
      this.xVelocity = 0;
      this.yVelocity = 0;

      this.direction = null;
    }, command.duration);
  }

  replay() {
    this.actionList.forEach((command) => {
      const timeID = setTimeout(() => {
        this.action(command);
      }, command.time);
      this.timeoutIDList.push(timeID);
    });
  }

  stopAllTimeouts() {
    this.timeoutIDList.forEach((id) => {
      clearTimeout(id);
    });
    this.xVelocity = 0;
    this.yVelocity = 0;
  }

  update() {
    //console.log("update");

    this.sprite.setVelocityX(this.xVelocity);
    this.sprite.setVelocityY(this.yVelocity);
  }
}
