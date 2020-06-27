import Phaser from 'phaser';
import game from './game';
import { getPhaserColorFromHex, getHypotenuseAngle, getDistBetweenPts } from '../pwUtils';
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

const getTracerAlignment = a => {
  if(a > -89 && a < 0) {
    return Phaser.Display.Align.BOTTOM_LEFT;
  } else if(a > 0 && a < 90) {
    return Phaser.Display.Align.TOP_LEFT;
  } else if(a > 90 && a < 180) {
    return Phaser.Display.Align.TOP_RIGHT;
  } else {
    return Phaser.Display.Align.BOTTOM_RIGHT;
  }
};

export const addTracer = distance => {
  const gunshot = game.scene.matter.add.image(player.gunSprite.x, player.gunSprite.y, 'gunshot');
  gunshot.scaleX = 3;
  gunshot.setCollisionCategory(0);
  gunshot.setIgnoreGravity(true);
  gunshot.angle = player.gunSprite.angle;
  game.scene.matter.alignBody(gunshot.body, player.gunSprite.body.position.x, player.gunSprite.body.position.y, getTracerAlignment(gunshot.angle));
  gunshot.setScale(distance * 0.005, 1);
  game.scene.tweens.add({
    targets: gunshot,
    alpha: 0,
    ease: 'Sine.easeOut',
    duration: 600,
    repeat: 0,
    onComplete: () => gunshot.destroy()
  });
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