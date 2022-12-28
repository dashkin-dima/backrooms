import { FOV, SCREEN_WIDTH, SIZES } from "@/shared/consts";
import { IMap, IPlayer, IPosition, IRay } from "@/Model";

interface IPhysicsEngine {
  getRays(): IRay[];
}

class PhysicsEngine implements IPhysicsEngine {
  map: IMap;
  player: IPlayer;

  constructor(map: IMap, player: IPlayer) {
    this.map = map;
    this.player = player;
  }

  private outOfMapBounds(x: number, y: number) {
    return x < 0 || x >= this.map[0].length || y < 0 || y >= this.map.length;
  }

  private distance(x1: number, y1: number, x2: number, y2: number) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }

  private getVCollision(angle: number): IRay {
    const right = Math.abs(Math.floor((angle - Math.PI / 2) / Math.PI) % 2);

    const firstX = right
      ? Math.floor(this.player.x / SIZES.CELL) * SIZES.CELL + SIZES.CELL
      : Math.floor(this.player.x / SIZES.CELL) * SIZES.CELL;

    const firstY = this.player.y + (firstX - this.player.x) * Math.tan(angle);

    const xA = right ? SIZES.CELL : -SIZES.CELL;
    const yA = xA * Math.tan(angle);

    let wall;
    let nextX = firstX;
    let nextY = firstY;
    while (wall !== "W") {
      const cellX = right
        ? Math.floor(nextX / SIZES.CELL)
        : Math.floor(nextX / SIZES.CELL) - 1;
      const cellY = Math.floor(nextY / SIZES.CELL);

      if (this.outOfMapBounds(cellX, cellY)) {
        break;
      }
      wall = this.map[cellY][cellX];
      if (wall !== "W") {
        nextX += xA;
        nextY += yA;
      }
    }
    return {
      angle,
      distance: this.distance(this.player.x, this.player.y, nextX, nextY),
      direction: "vertical",
    };
  }
  getHCollision(angle: number): IRay {
    const up = Math.abs(Math.floor(angle / Math.PI) % 2);
    const firstY = up
      ? Math.floor(this.player.y / SIZES.CELL) * SIZES.CELL
      : Math.floor(this.player.y / SIZES.CELL) * SIZES.CELL + SIZES.CELL;
    const firstX = this.player.x + (firstY - this.player.y) / Math.tan(angle);

    const yA = up ? -SIZES.CELL : SIZES.CELL;
    const xA = yA / Math.tan(angle);

    let wall;
    let nextX = firstX;
    let nextY = firstY;
    while (wall !== "W") {
      const cellX = Math.floor(nextX / SIZES.CELL);
      const cellY = up
        ? Math.floor(nextY / SIZES.CELL) - 1
        : Math.floor(nextY / SIZES.CELL);

      if (this.outOfMapBounds(cellX, cellY)) {
        break;
      }

      wall = this.map[cellY][cellX];
      if (wall !== "W") {
        nextX += xA;
        nextY += yA;
      }
    }
    return {
      angle,
      distance: this.distance(this.player.x, this.player.y, nextX, nextY),
      direction: "horizontal",
    };
  }

  castRay(angle: number): IRay {
    const vCollision = this.getVCollision(angle);
    const hCollision = this.getHCollision(angle);

    return hCollision.distance >= vCollision.distance ? vCollision : hCollision;
  }

  getRays() {
    const initialAngle = this.player.angle - FOV / 2;
    const numberOfRays = SCREEN_WIDTH;
    const angleStep = FOV / numberOfRays;

    const rays = Array.from({ length: numberOfRays }, (_, i) => {
      const angle = initialAngle + i * angleStep;
      const ray = this.castRay(angle);
      return ray;
    });

    return rays;
  }

  isCanMove(newPositionPlayer: IPosition): boolean {
    const i = Math.ceil(newPositionPlayer.y / SIZES.CELL) - 1;
    const j = Math.ceil(newPositionPlayer.x / SIZES.CELL) - 1;

    return this.map[i][j] !== "W";
  }
}

export { PhysicsEngine };
export type { IPhysicsEngine };
