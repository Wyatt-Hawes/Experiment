console.log("Command.ts running");
export abstract class Command {
  time: number;
  type: string;

  constructor(action: string, time: number) {
    this.time = time;
    this.type = action;
  }

  //abstract execute(): any;

  //abstract undo(): any;
}

export interface Direction {
  x: -1 | 0 | 1;
  y: -1 | 0 | 1;
}

export class MoveCommand extends Command {
  duration: number;
  direction: Direction;

  constructor(duration: number, direction: Direction, time: number) {
    super("Move", time);
    this.duration = duration;
    this.direction = direction;
  }
}
