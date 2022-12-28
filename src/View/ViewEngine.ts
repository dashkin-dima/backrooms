import { COLORS, SCREEN_WIDTH } from "@/shared/consts";
import { IMap, IPlayer, IRay } from "@/Model";
import { IMinimap, Minimap } from "./Minimap";
import { ISceen, Sceen } from "./Sceen";
import { drawRectHOC, IDrawRect } from "./utils/drawRect";

interface IViewEngine {
  render: () => void;
}

class ViewEngine {
  minimap: IMinimap;
  sceen: ISceen;
  drawRect: IDrawRect;

  constructor(context: CanvasRenderingContext2D, map: IMap) {
    this.minimap = new Minimap(context, map);
    this.sceen = new Sceen(context);
    this.drawRect = drawRectHOC(context);
  }

  private clearScreen() {
    this.drawRect(0, 0, SCREEN_WIDTH, SCREEN_WIDTH, COLORS.empty);
  }

  render(player: IPlayer, rays: IRay[]) {
    this.clearScreen();
    this.sceen.render(player.angle, rays);
    this.minimap.render(player, rays);
  }
}

export { ViewEngine };
export type { IViewEngine };
