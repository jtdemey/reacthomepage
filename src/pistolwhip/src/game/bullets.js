import Phaser from 'phaser';
import game from './game';
import { getPhaserColorFromHex, getHypotenuseAngle } from '../pwUtils';
import player from './player';
import collisionCats from './collision';

const bullets = {
  hits: []
};

export default bullets;

export const addHit = pt => {
  const hit = new Phaser.Geom.Circle(pt.x, pt.y, 2);
  if(pt.enemyId) {
    hit.enemyId = pt.enemyId;
    hit.enemySpeed = pt.enemySpeed;
  }
  game.scene.tweens.add({
    targets: hit,
    radius: 16,
    ease: 'Sine.easeOut',
    duration: 280,
    repeat: 0
  });
  bullets.hits.push(hit);
};

export const addTracer = contactPt => {
  const gunshot = game.scene.matter.add.image(player.gunSprite.x, player.gunSprite.y, 'gunshot');
  gunshot.scaleX = 3;
  gunshot.setCollisionCategory(0);
  gunshot.setIgnoreGravity(true);
  gunshot.angle = getHypotenuseAngle(player.aimLine.y2 - player.gunSprite.y, player.aimLine.x2 - player.gunSprite.x) / 2;
  console.log(gunshot);
  console.log(player.aimLine);
  // game.scene.tweens.add({
  //   targets: gunshot,
  //   ease: 'Sine.easeOut',
  //   duration: 1000,
  //   repeat: 0
  // });
};

export const updateBullets = () => {
  game.graphics.fillStyle(getPhaserColorFromHex('#fff280'));
  bullets.hits.forEach((hit, i) => {
    if(hit.enemyId) {
      hit.x -= hit.enemySpeed;
    } else {
      hit.x -= game.speed;
    }
    game.graphics.fillCircle(hit.x, hit.y, hit.radius);
    if(hit.radius > 15) {
      bullets.hits.splice(i, 1);
      i -= 1;
    }
  });
};