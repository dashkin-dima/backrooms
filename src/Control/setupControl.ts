import { IPlayer } from "@/Model";
import { SPEED } from "@/shared/consts";
import { toRadian } from "@/shared/utils/toRadian";

const setupControl = (refPlayer: IPlayer, canvas: HTMLCanvasElement) => {
  const handleLockPointer = () => {
    canvas.requestPointerLock();
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowUp") {
      refPlayer.speed = SPEED;
    }
    if (event.key === "ArrowDown") {
      refPlayer.speed = -SPEED;
    }
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      refPlayer.speed = 0;
    }
  };

  const handleMouseMove = (event: MouseEvent) => {
    refPlayer.angle += toRadian(event.movementX);
  };

  canvas.addEventListener("click", handleLockPointer);
  document.addEventListener("keydown", handleKeyDown);
  document.addEventListener("keyup", handleKeyUp);
  document.addEventListener("mousemove", handleMouseMove);

  const destroy = () => {
    canvas.removeEventListener("click", handleLockPointer);
    document.removeEventListener("keydown", handleKeyDown);
    document.removeEventListener("keyup", handleKeyUp);
    document.removeEventListener("mousemove", handleMouseMove);
  };

  return destroy;
};

export { setupControl };
