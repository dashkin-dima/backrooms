import { SCREEN_HEIGHT, SCREEN_WIDTH } from "./shared/consts";

const initCanvas = () => {
  const canvas = document.createElement("canvas");
  canvas.setAttribute("width", `${SCREEN_WIDTH}`);
  canvas.setAttribute("height", `${SCREEN_HEIGHT}`);
  document.querySelector<HTMLDivElement>("#app")!.appendChild(canvas);

  return canvas;
};

export { initCanvas };
