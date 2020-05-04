import ground, { makeGroundSegments } from './ground';
import player from './player';
import collisionCats from './collision';

const game = {
  width: 800,
  height: 600,
  level: 1,
  paused: false,
  tick: 0,
  speed: 1
};

game.onTick = () => {
  game.tick += 1;
};

export default game;

export const loadLevel = (scene, lvlId) => {
  game.level = lvlId;
  switch(lvlId) {
    case 1:
      ground.widthRange = [150, 220];
      ground.altRange = [game.height - 100, game.height - 220];
      break;
    default:
      console.error(`No level associated to ID ${lvlId}`);
      break;
  }
  makeGroundSegments(10);
};