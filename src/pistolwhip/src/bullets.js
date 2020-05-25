import Phaser from 'phaser';
import game from './game';
import player from './player';
import collisionCats from './collision';
import ground from './ground';
import { genId } from './pwUtils';

const bullets = {
  sprites: [],
  paths: [],
  points: [],
  tweens: []
};

export default bullets;

export const fireBullet = () => {
  const bulletId = genId(8);

  const point = {
    t: 0,
    vec: new Phaser.Math.Vector2()
  };
  bullets.points.push(point);

  const l = player.aimLine;
  const sprite = game.scene.matter.add.sprite(l.x1, l.y1, 'bullet');
  sprite.body.collisionFilter = {
    category: collisionCats.BULLET,
    group: 0,
    mask: collisionCats.GROUND | collisionCats.ENEMY | collisionCats.BOUNDARY
  };
  sprite.body.gravityScale.y = 0;
  sprite.bulletId = bulletId;
  bullets.sprites.push(sprite);

  const pathLine = new Phaser.Curves.Line([l.x1, l.y1, l.x2, l.y2]);
  const path = game.scene.add.path();
  path.add(pathLine);
  bullets.paths.push(path);

  const fireTween = game.scene.tweens.add({
    targets: point,
    t: 1,
    ease: 'linear',
    duration: 100,
    repeat: 0
  });
  bullets.tweens.push(fireTween);
};

export const getBulletIndexFromBodyId = bodyId => {
  bullets.sprites.forEach((sprite, i) => {
    if(sprite.body && sprite.body.id === bodyId) {
      return i;
    }
  });
  return false;
};

export const removeBullet = ind => {
  bullets.sprites[ind].destroy();
  bullets.sprites.splice(ind, 1);
  bullets.paths.splice(ind, 1);
  bullets.points.splice(ind, 1);
  bullets.tweens.splice(ind, 1);
};

export const removeBulletByBodyId = bodyId => {
  bullets.sprites.forEach((sprite, i) => {
    if(sprite.body && sprite.body.id === bodyId) {
      removeBullet(i);
      return true;
    }
  });
  return false;
};

export const updateBullets = () => {
  bullets.paths.forEach((path, i) => {
    path.getPoint(bullets.points[i].t, bullets.points[i].vec);
    ground.graphics.fillRect(bullets.points[i].vec.x - 2, bullets.points[i].vec.y - 2, 4, 2);
    bullets.sprites[i].body.position.x = bullets.points[i].vec.x;
    bullets.sprites[i].body.position.y = bullets.points[i].vec.y;
    if(bullets.tweens[i].totalProgress >= 1) {
      removeBullet(i);
    }
  });
};