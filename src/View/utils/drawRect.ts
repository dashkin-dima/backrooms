type IDrawRect = (
  x: number,
  y: number,
  w: number,
  h: number,
  color: string
) => void;

const drawRectHOC =
  (context: CanvasRenderingContext2D) =>
  (x: number, y: number, w: number, h: number, color: string) => {
    context.fillStyle = color;
    context.fillRect(x, y, w, h);
  };

export type { IDrawRect };
export { drawRectHOC };
