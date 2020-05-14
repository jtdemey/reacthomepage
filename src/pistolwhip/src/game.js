import ground, { makeGroundSegments } from './ground';
import { LEVEL_IDS, LEVEL_NAMES } from './constants';
import player, { enterLevel } from './player';
import enemies, { spawnNextEnemy } from './enemies';

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
  // if(!enemies.some(e => e.sprite.body.position.x > game.width - game.enemySpawnDist && e.sprite.body.position.x < game.width + 50)) {

  // }
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
      game.enemySpawnRange = [200, 300];
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

export const setBackground = (scene, lvlId) => {
  game.background = scene.add.image(0, 0, LEVEL_NAMES[lvlId - 1]).setOrigin(0);
  game.background.width = game.width;
  game.background.height = game.height;
};

export const setExtendedBounds = () => {
  game.scene.matter.world.setBounds(-100, 0, game.width + 300, game.height, 1, true, true, false, true);
};

export const setFixedBounds = () => {
  game.scene.matter.world.setBounds(0, 0, game.width, game.height, 1, true, true, false, true);
};