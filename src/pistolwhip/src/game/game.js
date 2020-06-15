import ground, { makeGroundSegments } from './ground';
import { LEVEL_IDS, LEVEL_NAMES } from '../constants';
import { spawnCheck, killAllEnemies } from './enemies';
import { getRandBetween } from '../pwUtils';
import player, { tweenPlayerVelocityX } from './player';
import { showPauseMenu, hidePauseMenu } from '../pausemenu/pauseMenu';
import { disableBoundCollision, enableBoundCollision } from './bounds';

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
  speed: 1,
  tick: 0,
  isTransitioningLevels: false
};

game.onTick = () => {
  game.tick += 1;
  spawnCheck();
};

game.setScene = scene => {
  game.scene = scene;
};

export default game;

export const advanceLevel = () => {
  game.isTransitioningLevels = true;
  player.hasControl = false;
  player.isInvulnerable = true;
  disableBoundCollision();
  // clearEnemies();
  killAllEnemies();
  tweenPlayerVelocityX(-10, 2000, () => {
    player.sprite.visible = false;
    player.gunSprite.visible = false;
  });
  game.scene.tweens.add({
    targets: game,
    ease: 'Sine.easeInOut',
    duration: 4000,
    repeat: 0,
    speed: 8,
    onComplete: () => {
      loadLevel(game.scene, game.level + 1);
      player.sprite.visible = true;
      player.gunSprite.visible = true;
      player.sprite.x = -100;
      game.scene.tweens.add({
        targets: player.sprite,
        x: 100,
        ease: 'Sine.easeInOut',
        duration: 2000,
        repeat: 0,
        speed: 1
      });
      game.scene.tweens.add({
        targets: game,
        ease: 'Sine.easeInOut',
        duration: 2000,
        repeat: 0,
        speed: 1,
        onComplete: () => {
          player.hasControl = true;
          player.isInvulnerable = false;
          enableBoundCollision();
          setTimeout(() => {
            game.isTransitioningLevels = false;
          }, 3000);
        }
      });
    }
  });
};

export const gameOver = () => {
  game.paused = true;
  player.gunSprite.setIgnoreGravity(false);
  player.gunSprite.setVelocityX(3);
  player.gunSprite.setVelocityY(-10);
};

export const loadLevel = (scene, lvlId) => {
  game.level = lvlId;
  game.levelStartTick = game.tick;
  game.nextLevelTick = game.tick + 2000;//+ 100000;
  switch(lvlId) {
    case LEVEL_IDS.CIVIL_DUSK:
      game.enemySpawnRange = [400, 500];
      ground.widthRange = [150, 220];
      ground.altRange = [game.height - 100, game.height - 220];
      break;
    case LEVEL_IDS.NAUTICAL_DUSK:
      game.enemySpawnRange = [380, 490];
      ground.widthRange = [180, 260];
      ground.altRange = [game.height - 100, game.height - 300];
      break;
    default:
      console.error(`No level associated to ID ${lvlId}`);
      break;
  }
  setBackground(scene, lvlId);
  makeGroundSegments(10);
};

export const pauseGame = () => {
  console.log(game.scene);
  game.paused = true;
  game.scene.matter.world.pause();
  showPauseMenu();
};

export const rollNextEnemySpawnDist = () => {
  game.enemySpawnDist = getRandBetween(game.enemySpawnRange[0], game.enemySpawnRange[1]);
};

export const setBackground = (scene, lvlId) => {
  game.background = scene.add.image(0, 0, LEVEL_NAMES[lvlId - 1]).setOrigin(0);
  game.background.width = game.width;
  game.background.height = game.height;
  game.background.setDepth(-1);
};

export const togglePause = () => {
  if(game.paused) {
    unpauseGame();
  } else {
    pauseGame();
  }
};

export const unpauseGame = () => {
  game.paused = false;
  game.scene.matter.world.resume();
  hidePauseMenu();
};