import { INIT_PLAYER, TICK } from "./shared/consts";
import { setupControl } from "./Control/setupControl";
import { initCanvas } from "./initCanvas";
import { IMap, IPosition } from "./Model";
import { PhysicsEngine } from "./Physics/PhysicsEngine";
import { ViewEngine } from "./View/ViewEngine";
import { cloneDeep } from "lodash";

import "./styles.css";

const canvas = initCanvas();
const context = canvas.getContext("2d")!;

const map: IMap = [
  ["W", "W", "W", "W", "W", "W", "W", "W"],
  ["W", "E", "E", "E", "E", "E", "E", "W"],
  ["W", "E", "E", "E", "E", "E", "E", "W"],
  ["W", "E", "E", "E", "E", "E", "E", "W"],
  ["W", "E", "E", "E", "E", "E", "E", "W"],
  ["W", "E", "E", "E", "E", "E", "E", "W"],
  ["W", "E", "E", "E", "E", "E", "E", "W"],
  ["W", "E", "W", "W", "W", "W", "W", "W"],
  ["W", "E", "W", "W", "W", "W", "W", "W"],
  ["W", "E", "E", "E", "E", "E", "E", "W"],
  ["W", "E", "E", "E", "E", "E", "E", "W"],
  ["W", "E", "E", "E", "E", "E", "E", "W"],
  ["W", "E", "E", "E", "E", "E", "E", "W"],
  ["W", "E", "E", "E", "E", "E", "E", "W"],
  ["W", "E", "E", "E", "E", "E", "E", "W"],
  ["W", "W", "W", "W", "W", "W", "W", "W"],
];

const player = cloneDeep(INIT_PLAYER);

const viewEngine = new ViewEngine(context, map);
const physicsEngine = new PhysicsEngine(map, player);

function movePlayer(): IPosition {
  const clonePlayer = cloneDeep(player);
  clonePlayer.x += Math.cos(player.angle) * player.speed;
  clonePlayer.y += Math.sin(player.angle) * player.speed;

  return physicsEngine.isCanMove(clonePlayer) ? clonePlayer : player;
}

function gameLoop() {
  const newPositionPlayer = movePlayer();
  player.x = newPositionPlayer.x;
  player.y = newPositionPlayer.y;
  const rays = physicsEngine.getRays();
  viewEngine.render(player, rays);
}

setupControl(player, canvas);
setInterval(gameLoop, TICK);
