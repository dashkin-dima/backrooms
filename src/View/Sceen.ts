import { COLORS, SCREEN_HEIGHT, SIZES, WALL_HEIGHT } from "@/shared/consts";
import { IRay } from "@/Model";
import { drawRectHOC, IDrawRect } from "./utils/drawRect";
import { fixFishEye } from "./utils/fixFishEye";

interface ISceen {
  render(anglePlayer: number, rays: IRay[]): void;
}

class Sceen implements ISceen {
  private drawRect: IDrawRect;

  constructor(context: CanvasRenderingContext2D) {
    this.drawRect = drawRectHOC(context);
  }

  render(anglePlayer: number, rays: IRay[]) {
    rays.forEach((ray, i) => {
      const distance = fixFishEye(ray.distance, ray.angle, anglePlayer);
      const wallHeight = ((SIZES.CELL * 5) / distance) * WALL_HEIGHT;

      // wall
      const colorWall =
        ray.direction === "vertical" ? COLORS.wallDark : COLORS.wallLight;
      this.drawRect(
        i,
        SCREEN_HEIGHT / 2 - wallHeight / 2,
        1,
        wallHeight,
        colorWall
      );

      // floor
      this.drawRect(
        i,
        SCREEN_HEIGHT / 2 + wallHeight / 2,
        1,
        SCREEN_HEIGHT / 2 - wallHeight / 2,
        COLORS.floor
      );

      // ceiling
      this.drawRect(
        i,
        0,
        1,
        SCREEN_HEIGHT / 2 - wallHeight / 2,
        COLORS.ceiling
      );
    });
  }
}

export { Sceen };
export type { ISceen };
