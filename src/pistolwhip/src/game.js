import ground, { makeGroundSegments } from './ground';
import { LEVEL_IDS, LEVEL_NAMES } from './constants';
import enemies, { spawnNextEnemy, spawnCheck } from './enemies';
import { getRandBetween } from './pwUtils';

const game = {
  background: null,
  enemySpawnDist: null,
  enemySpawnRange: 100,
  width: 800,
  height: 600,
  level: LEVEL_IDS.DUSK,
  levelStartTick: 0,
  nextLevelTick: 0,
  paused: false,
  scene: null,
  speed: 1
};

game.onTick = () => {
  spawnCheck();
};

game.setScene = scene => {
  game.scene = scene;
};

export default game;

export const loadLevel = (scene, lvlId) => {
  game.level = lvlId;
  game.levelStartTick = scene.time.now;
  game.nextLevelTick = scene.time.now + 100000;
  switch(lvlId) {
    case LEVEL_IDS.DUSK:
      game.enemySpawnRange = [400, 500];
      ground.widthRange = [150, 220];
      ground.altRange = [game.height - 100, game.height - 220];
      break;
    case LEVEL_IDS.NIGHTFALL:
      game.enemySpawnRange = [200, 280];
      ground.widthRange = [180, 260];
      ground.altRange = [game.height - 100, game.height - 300];
      break;
    default:
      console.error(`No level associated to ID ${lvlId}`);
      break;
  }
  setBackground(scene, lvlId);
  makeGroundSegments(10);
  spawnNextEnemy();
  //enterLevel();
};

export const rollNextEnemySpawnDist = () => {
  game.enemySpawnDist = getRandBetween(game.enemySpawnRange[0], game.enemySpawnRange[1]);
};

export const setBackground = (scene, lvlId) => {
  game.background = scene.add.image(0, 0, LEVEL_NAMES[lvlId - 1]).setOrigin(0);
  game.background.width = game.width;
  game.background.height = game.height;
};