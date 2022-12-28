import { IPosition } from "@/Model";
type IDrawLine = (from: IPosition, to: IPosition, color: string) => void;

const drawLineHOC =
  (context: CanvasRenderingContext2D) =>
  (from: IPosition, to: IPosition, color: string) => {
    context.strokeStyle = color;
    context.beginPath();
    context.moveTo(from.x, from.y);
    context.lineTo(to.x, to.y);
    context.closePath();
    context.stroke();
  };

export { drawLineHOC };
export type { IDrawLine };
