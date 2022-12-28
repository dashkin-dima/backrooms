import { COLORS, SIZES } from "@/shared/consts";
import { IMap, IPosition, IRay } from "@/Model";
import { drawLineHOC, IDrawLine } from "./utils/drawLine";
import { drawRectHOC, IDrawRect } from "./utils/drawRect";

interface IMinimap {
  setPositionMinimap(position: IPosition): void;
  setScale(scale: number): void;

  render(positionPlayer: IPosition, rays: IRay[]): void;
}

class Minimap implements IMinimap {
  private scale: number = 1;
  private positionMinimap: IPosition = { x: 0, y: 0 };

  private map: IMap;
  private drawLine: IDrawLine;
  private drawRect: IDrawRect;

  constructor(context: CanvasRenderingContext2D, map: IMap) {
    this.map = map;
    this.drawRect = drawRectHOC(context);
    this.drawLine = drawLineHOC(context);
  }

  private drawBackground() {
    const { x, y } = this.positionMinimap;
    const width = this.map[0].length * SIZES.CELL;
    const height = this.map.length * SIZES.CELL;

    this.drawRect(x, y, width, height, COLORS.background);
  }

  private drawWall() {
    this.map.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell === "W") {
          const rectX = this.positionMinimap.x + x * SIZES.CELL;
          const rectY = this.positionMinimap.y + y * SIZES.CELL;
          this.drawRect(rectX, rectY, SIZES.CELL, SIZES.CELL, COLORS.wall);
        }
      });
    });
  }

  private drawPlayer(positionPlayer: IPosition) {
    const x =
      this.positionMinimap.x + positionPlayer.x * this.scale - SIZES.PLAYER / 2;
    const y =
      this.positionMinimap.y + positionPlayer.y * this.scale - SIZES.PLAYER / 2;

    this.drawRect(x, y, SIZES.PLAYER, SIZES.PLAYER, COLORS.player);
  }

  private drawRays(positionPlayer: IPosition, rays: IRay[]) {
    const from: IPosition = {
      x: positionPlayer.x * this.scale,
      y: positionPlayer.y,
    };

    rays.forEach((ray) => {
      const to: IPosition = {
        x: positionPlayer.x + Math.cos(ray.angle) * ray.distance * this.scale,
        y: positionPlayer.y + Math.sin(ray.angle) * ray.distance * this.scale,
      };
      this.drawLine(from, to, COLORS.rays);
    });
  }

  setPositionMinimap = (position: IPosition) => {
    this.positionMinimap = position;
  };

  setScale = (scale: number) => {
    this.scale = scale;
  };

  render(positionPlayer: IPosition, rays: IRay[]) {
    this.drawBackground();
    this.drawWall();
    this.drawPlayer(positionPlayer);
    this.drawRays(positionPlayer, rays);
  }
}

export { Minimap };
export type { IMinimap };
