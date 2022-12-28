import { toRadian } from "./utils/toRadian";

const SIZES = {
  CELL: 32,
  PLAYER: 16,
};

const TICK = 30;

const FOV = toRadian(60);

const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;

const SPEED = 2;

const WALL_HEIGHT = 300;

const COLORS = {
  empty: "white",

  //minimap
  background: "white",
  wall: "black",
  player: "blue",
  rays: "blue",

  // sceen
  wallLight: "#a0a246",
  wallDark: "#4b4f1c",
  floor: "#6f5c25",
  ceiling: "#75703b",
};

const INIT_PLAYER = {
  x: SIZES.CELL * 1.5,
  y: SIZES.CELL * 2,
  angle: toRadian(0),
  speed: 0,
};

export {
  SIZES,
  TICK,
  COLORS,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  FOV,
  INIT_PLAYER,
  SPEED,
  WALL_HEIGHT,
};
