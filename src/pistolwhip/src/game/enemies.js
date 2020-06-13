import game, { rollNextEnemySpawnDist } from './game';
import { ENEMY_TYPES, LEVEL_IDS, ENEMY_TYPE_NAMES } from '../constants';
import collisionCats from './collision';
import { genId } from '../pwUtils';

const enemies = [];

export default enemies;

const deleteEnemy = enemyId => {
  enemies.forEach((e, i) => {
    if(e.enemyId === enemyId) {
      e.sprite.destroy();
      enemies.splice(i, 1);
    }
  });
};

export const getEnemyFromBodyId = bodyId => {
  enemies.forEach((goon, i) => {
    if(goon.sprite.body !== undefined) {
      console.log(goon.sprite.body)
      console.log(bodyId)
    }
    if(goon.sprite.body && goon.sprite.body.id === bodyId) {
      return enemies[i];
    }
  });
  return false;
};

const getPossibleEnemyTypes = () => {
  let x = ENEMY_TYPES;
  if(game.level === LEVEL_IDS.DUSK) {
    return [x.ROLLER];
  } else if(game.level === LEVEL_IDS.NIGHTFALL) {
    return [x.ROLLER, x.GLIDER];
  } else if(game.level === LEVEL_IDS.NIGHT) {
    return [x.ROLLER, x.GLIDER, x.HOPPER];
  } else if(game.level === LEVEL_IDS.MIDNIGHT) {
    return [x.GLIDER, x.HOPPER, x.DRIVER];
  } else if(game.level === LEVEL_IDS.NIGHTFALL) {
    return [x.HOPPER, x.DRIVER, x.BOMBER];
  }
};

export const hurtEnemy = (enemyId, amt) => {
  enemies.map(e => {
    if(e.enemyId === enemyId) {
      e.hp -= amt;
      if(e.hp < 1) {
        deleteEnemy(enemyId);
      }
    }
  });
};

export const hurtEnemyByBodyId = (bodyId, amt) => {
  enemies.map(e => {
    if(!e.sprite.body) {
      console.error('No sprite body with id ' + bodyId);
    }
    if(e.sprite.body && e.sprite.body.id === bodyId) {
      e.hp -= amt;
      if(e.hp < 1) {
        deleteEnemy(e.enemyId);
      }
    }
  });
};

const makeEnemy = type => {
  let enemyId, sprite, hp, speed, onTick;
  enemyId = genId(16);
  if(type === ENEMY_TYPES.ROLLER) {
    hp = 100;
    speed = 2;
    sprite = game.scene.matter.add.sprite(game.width + 250, 200, ENEMY_TYPE_NAMES[type]);
    sprite.setBody({
      type: 'circle',
      radius: 32
    });
    sprite.body.collisionFilter = {
      category: collisionCats.ENEMY,
      group: 0,
      mask: collisionCats.PLAYER | collisionCats.GROUND | collisionCats.ENEMY | collisionCats.BULLET
    };
    sprite.body.friction = 0;
    sprite.setBounce(0);
    onTick = () => {
      sprite.rotation = 0;
      sprite.setVelocityX(-2);
      if(sprite.body.position.x < -50) {
        deleteEnemy(enemyId);
      }
    };
  }
  const enemy = {enemyId, type, hp, speed, sprite, onTick};
  enemies.push(enemy);
  return enemy;
};

export const spawnCheck = () => {
  if(!enemies.some(e => e.sprite.body.position.x > game.width - game.enemySpawnDist)) {
    spawnNextEnemy();
  }
};

export const spawnNextEnemy = () => {
  rollNextEnemySpawnDist();
  const types = getPossibleEnemyTypes();
  const rolledType = types[Math.floor(Math.random() * types.length)];
  makeEnemy(rolledType);
};