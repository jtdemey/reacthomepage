import game, { rollNextEnemySpawnDist } from './game';
import { ENEMY_TYPES, LEVEL_IDS, ENEMY_TYPE_NAMES } from '../constants';
import collisionCats from './collision';
import { genId, getRandBetween } from '../pwUtils';

const enemies = [];

export default enemies;

const deleteEnemy = enemyId => {
  enemies.forEach((e, i) => {
    if(e.enemyId === enemyId) {
      e.sprite.destroy();
      enemies.splice(i, 1);
      i -= 1;
    }
  });
};

export const clearEnemies = () => {
  while(enemies.length) {
    enemies.pop().sprite.destroy();
  }
};

export const getEnemyFromBodyId = bodyId => {
  enemies.forEach((goon, i) => {
    if(goon.sprite.body !== undefined) {
      console.error(`Enemy sprite ${goon.enemyId} contains no defined body`);
    }
    if(goon.sprite.body && goon.sprite.body.id === bodyId) {
      return enemies[i];
    }
  });
  return false;
};

const getPossibleEnemyTypes = () => {
  let ids = LEVEL_IDS;
  let x = ENEMY_TYPES;
  switch(game.level) {
    case ids.CIVIL_DUSK:
      return [x.ROLLER];
    case ids.NAUTICAL_DUSK:
      return [x.ROLLER];
    case ids.ASTRONOMICAL_DUSK:
      return [x.ROLLER];
    case ids.NIGHTFALL:
      return [x.ROLLER];
    case ids.NIGHTFALL2:
      return [x.ROLLER];
    case ids.NIGHTFALL3:
      return [x.ROLLER];
    case ids.NIGHT:
      return [x.ROLLER];
    case ids.MIDNIGHT:
      return [x.ROLLER];
    case ids.MORNING:
      return [x.ROLLER];
    case ids.SUNRISE:
      return [x.ROLLER];
    case ids.SUNRISE2:
      return [x.ROLLER];
    case ids.SUNRISE3:
      return [x.ROLLER];
    case ids.ASTRONOMICAL_DAWN:
      return [x.ROLLER];
    case ids.NAUTICAL_DAWN:
      return [x.ROLLER];
    case ids.CIVIL_DAWN:
      return [x.ROLLER];
  }
};

export const hurtEnemy = (enemyId, amt) => {
  enemies.map(e => {
    if(e.enemyId === enemyId) {
      e.hp -= amt;
      if(e.hp < 1) {
        killEnemy(enemyId);
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
        killEnemy(e.enemyId);
      }
    }
  });
};

export const killAllEnemies = () => {
  enemies.map(e => killEnemy(e.enemyId));
};

export const killEnemy = enemyId => {
  enemies.map(e => {
    if(e.enemyId === enemyId) {
      e.speed = 0;
      e.sprite.setVelocity(getRandBetween(-1.5, 1.5), getRandBetween(-3, -6));
      // e.sprite.setRotation(2);
      e.sprite.setAngularVelocity(0.15);
      e.sprite.body.collisionFilter.category = 0;
      e.onTick = () => { return; }
      setTimeout(() => {
        deleteEnemy(enemyId);
      }, 500);
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
    console.log(sprite);
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
  if(!enemies.some(e => e.sprite && e.sprite.body && e.sprite.body.position.x > game.width - game.enemySpawnDist)
  && !game.isTransitioningLevels) {
    spawnNextEnemy();
  }
};

export const spawnNextEnemy = () => {
  rollNextEnemySpawnDist();
  const types = getPossibleEnemyTypes();
  const rolledType = types[Math.floor(Math.random() * types.length)];
  makeEnemy(rolledType);
};