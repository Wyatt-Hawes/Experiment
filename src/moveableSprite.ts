import { MoveCommand, Direction } from "./command";
console.log("Moveable sprite running");

//This prevents an error when deploying to github-pages
type Timeout = ReturnType<typeof setTimeout>;

export class MoveableSprite {
  sprite: Phaser.GameObjects.Sprite;
  velocity: number;
  currentVelocity: number;
  direction: Direction | null = null;

  actionList: MoveCommand[] = [];
  timeoutID: Timeout | null = null;
  timeoutIDList: Timeout[] = [];

  constructor(sprite: Phaser.GameObjects.Sprite, velocity = 1) {
    this.sprite = sprite;
    this.currentVelocity = 0;
    this.velocity = velocity;
  }

  action(command: MoveCommand) {
    this.actionList.push(command);

    this.currentVelocity = this.velocity;
    this.direction = command.direction;

    if (this.timeoutID != null) {
      clearTimeout(this.timeoutID);
    }

    this.timeoutID = setTimeout(() => {
      this.currentVelocity = 0;
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
    this.currentVelocity = 0;
  }

  update() {
    //console.log("update");
    if (this.direction != null) {
      this.sprite.x += this.currentVelocity * this.direction.x;
      this.sprite.y += this.currentVelocity * this.direction.y;
    }
  }
}
