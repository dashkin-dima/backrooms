
const fixFishEye = (distance: number, angle: number, playerAngle: number) => {
  const diff = angle - playerAngle;
  return distance * Math.cos(diff);
}

export {fixFishEye}