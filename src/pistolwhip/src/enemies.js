import game from './game';
import { ENEMY_TYPES, LEVEL_IDS } from './constants';
import collisionCats from './collision';

const enemies = [];

export default enemies;

const getPossibleEnemyTypes = () => {
  if(game.level === LEVEL_IDS.DUSK) {
    return ['roller'];
  } else if(game.level === LEVEL_IDS.NIGHTFALL) {
    return ['roller', 'glider'];
  } else if(game.level === LEVEL_IDS.NIGHT) {
    return ['roller', 'glider', 'hopper'];
  } else if(game.level === LEVEL_IDS.MIDNIGHT) {
    return ['glider', 'hopper', 'driver'];
  } else if(game.level === LEVEL_IDS.NIGHTFALL) {
    return ['hopper', 'driver', 'bomber'];
  }
};

const makeEnemy = type => {
  let sprite, hp, speed, onTick;
  if(type === 'roller') {
    hp = 100;
    speed = 2;
    sprite = game.scene.matter.add.sprite(game.width + 200, 200, type);
    sprite.setBody({
      type: 'circle',
      radius: 32
    });
    sprite.body.collisionFilter = {
      category: collisionCats.ENEMY,
      group: 0,
      mask: collisionCats.PLAYER | collisionCats.GROUND
    };
    sprite.body.friction = 0;
    sprite.setBounce(0);
    onTick = () => {
      sprite.rotation = 0;
      sprite.setVelocityX(-2);
      if(sprite.body.position.x < 500) {
        console.log(sprite.body.id);
        //sprite.destroy();
      }
    };
  }
  const enemy = {type, hp, speed, sprite, onTick};
  enemies.push(enemy);
  console.log(enemy.sprite.body);
  return enemy;
};

export const makeRoller = () => makeEnemy(ENEMY_TYPES.ROLLER);

export const spawnNextEnemy = () => {
  const types = getPossibleEnemyTypes();
  const rolledType = types[Math.floor(Math.random() * types.length)];
  makeEnemy(rolledType);
};