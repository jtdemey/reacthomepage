import Phaser from 'phaser';
import player from './player';
import enemies, { hurtEnemy, hurtEnemyByBodyId } from './enemies';
import { detectCatColl } from './pwUtils';
import { removeBulletByBodyId } from './bullets';

const collisionCatNames = ['PLAYER', 'GROUND', 'ENEMY', 'CONSUMABLE', 'BULLET', 'BOUNDARY'];

const collisionCats = {};

export default collisionCats;

const checkBulletGroundColl = pair => {
  if(detectCatColl(pair.bodyA, pair.bodyB, collisionCats.GROUND, collisionCats.BULLET)) {
    removeBulletByBodyId(pair.bodyA.collisionFilter.category === collisionCats.BULLET ? pair.bodyA.id : pair.bodyB.id);
  }
};

const checkBulletEnemyColl = pair => {
  if(detectCatColl(pair.bodyA, pair.bodyB, collisionCats.ENEMY, collisionCats.BULLET)) {
    removeBulletByBodyId(pair.bodyA.collisionFilter.category === collisionCats.BULLET ? pair.bodyA.id : pair.bodyB.id);
    hurtEnemyByBodyId(pair.bodyA.collisionFilter.category === collisionCats.BULLET ? pair.bodyB.id : pair.bodyA.id, player.damage);
  }
};

const checkPlayerGroundColl = pair => {
  if(pair.bodyA.id === player.sprite.body.id && pair.bodyB.collisionFilter.category === collisionCats.GROUND
    || pair.bodyB.id === player.sprite.body.id && pair.bodyA.collisionFilter.category === collisionCats.GROUND) {
    if(player.jumps > 0) {
      player.jumps = 0;
    }
  }
};

export const detectAimLineHit = () => {
  let circle;
  enemies.forEach(e => {
    if(e.sprite.body) {
      circle = new Phaser.Geom.Circle(e.sprite.body.position.x, e.sprite.body.position.y, e.sprite.body.circleRadius);
      if(Phaser.Geom.Intersects.LineToCircle(player.aimLine, circle)) {
        hurtEnemy(e.enemyId, player.damage);
      }
    }
  });
};

export const handleCollisions = event => {
  event.pairs.forEach(pair => {
    checkBulletEnemyColl(pair);
    checkBulletGroundColl(pair);
    checkPlayerGroundColl(pair);
  });
};

export const initCollisionCats = world => {
  const next = () => world.nextCategory();
  collisionCatNames.forEach((n, i) => {
    if(i === 0) {
      collisionCats[n] = 0x0001;
    } else {
      collisionCats[n] = next();
    }
  });
};