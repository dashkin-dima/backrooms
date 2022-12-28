interface IPosition {
  x: number;
  y: number;
}

interface IPlayer extends IPosition {
  angle: number;
  speed: number;
}

interface IRef<T> {
  current: T;
}

type IDirection = "vertical" | "horizontal";

interface IRay {
  angle: number;
  distance: number;
  direction: IDirection;
}

type IWall = "W";
type IEmpty = "E";
type ICell = IWall | IEmpty;

type IMap = ICell[][];

export type { IPosition, IRef, IMap, IRay, IPlayer };
