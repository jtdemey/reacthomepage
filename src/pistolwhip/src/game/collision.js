import Phaser from 'phaser';
import player, { hurtPlayer } from './player';
import enemies from './enemies';
import { detectCatColl, getClosestPtTo } from '../pwUtils';
import { ENEMY_TYPES, DESTRUCTIBLE_TYPES } from '../constants';
import ground from './ground';
import { consumePowerup } from './powerups';
import pistol from './pistol';
import destructibles from './destructibles';

const collisionCatNames = ['PLAYER', 'GROUND', 'ENEMY', 'CONSUMABLE', 'BULLET', 'BOUNDARY', 'DESTRUCTIBLE'];

const collisionCats = {};

export default collisionCats;

const checkPlayerEnemyColl = pair => {
  if(detectCatColl(pair.bodyA, pair.bodyB, collisionCats.PLAYER, collisionCats.ENEMY)) {
    const enemy = pair.bodyA.collisionFilter.category === collisionCats.ENEMY ? pair.bodyA : pair.bodyB;
    hurtPlayer(enemy.damage);
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

const checkPlayerPowerupColl = pair => {
  if(detectCatColl(pair.bodyA, pair.bodyB, collisionCats.PLAYER, collisionCats.CONSUMABLE)) {
    if(pair.bodyA.label !== 'Circle Body' && pair.bodyB.label !== 'Circle Body') {
      return;
    }
    const powerupBody = pair.bodyA.collisionFilter.category === collisionCats.PLAYER ? pair.bodyB : pair.bodyA;
    consumePowerup(powerupBody.id);
  }
};

const getAimLineDestructibleCollisionPts = () => {
  const destHits = [];
  let ptContainer;
  const collectPts = dType => {
    if(ptContainer.length) {
      ptContainer.forEach(pt => {
        pt.destructibleType = dType;
        destHits.push(pt);
      });
    }
  };
  destructibles.sprites.forEach(d => {
    if(d.destructibleType === DESTRUCTIBLE_TYPES.PACKAGE) {
      const circle = new Phaser.Geom.Circle(d.body.position.x, d.body.position.y, d.body.circleRadius);
      ptContainer = Phaser.Geom.Intersects.GetLineToCircle(pistol.aimLine, circle);
    }
    collectPts(DESTRUCTIBLE_TYPES.PACKAGE);
  });
};

const getAimLineEnemyCollisionPts = () => {
  const enemyHits = [];
  let ptContainer;
  const collectPts = (enemyId, speed) => {
    if(ptContainer.length) {
      ptContainer.forEach(pt => {
        pt.enemyId = enemyId;
        pt.enemySpeed = speed;
        enemyHits.push(pt);
      });
    }
  };
  enemies.forEach(e => {
    ptContainer = [];
    if(!e.sprite.body) {
      return;
    }
    if(e.type === ENEMY_TYPES.ROLLER) {
      const circle = new Phaser.Geom.Circle(e.sprite.body.position.x, e.sprite.body.position.y, e.sprite.body.circleRadius);
      ptContainer = Phaser.Geom.Intersects.GetLineToCircle(pistol.aimLine, circle);
    } else if(e.type === ENEMY_TYPES.GLIDER) {
      const rect = new Phaser.Geom.Rectangle(e.sprite.body.position.x - e.sprite.width / 2, e.sprite.body.position.y - e.sprite.height / 2, e.sprite.width, e.sprite.height);
      ptContainer = Phaser.Geom.Intersects.GetLineToRectangle(pistol.aimLine, rect);
    }
    collectPts(e.enemyId, e.speed);
  });
  return enemyHits;
};

const getAimLineGroundCollisionPts = () => {
  const pts = [];
  let outPt = new Phaser.Geom.Point(0, 0);
  ground.paths.forEach(path => {
    path.forEach((pt, i) => {
      if(!path[i + 1]) return;
      if(Phaser.Geom.Intersects.LineToLine(new Phaser.Geom.Line(pt.x, pt.y, path[i + 1].x, path[i + 1].y), pistol.aimLine, outPt)) {
        pts.push(new Phaser.Geom.Point(outPt.x, outPt.y));
      }
    });
  });
  return pts;
};

export const detectAimLineHits = () => {
  const enemyHits = getAimLineEnemyCollisionPts();
  const groundHits = getAimLineGroundCollisionPts();
  const closestPt = getClosestPtTo(player.sprite.body.position.x, player.sprite.body.position.y, enemyHits.concat(groundHits));
  return {
    closestPt,
    enemyHits,
    groundHits
  };
};

export const handleCollisions = event => {
  event.pairs.forEach(pair => {
    checkPlayerEnemyColl(pair);
    checkPlayerGroundColl(pair);
    checkPlayerPowerupColl(pair);
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