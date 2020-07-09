import Phaser from 'phaser';
import game from './game';
import { getPhaserColorFromHex, xPos, yPos } from '../pwUtils';
import collisionCats from './collision';
import pistol from './pistol';

const bullets = {
  hits: [],
  shells: []
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

export const addShell = () => {
  const shell = game.scene.matter.add.image(xPos(pistol.sprite), yPos(pistol.sprite) - 5, 'bullet');
  shell.setVelocity(-3, -4);
  shell.body.collisionFilter.category = collisionCats.BULLET;
  setTimeout(() => shell.destroy(), 500);
  bullets.shells.push(shell);
};

const getTracerAlignment = a => {
  if(a > -89 && a < 0) {
    return Phaser.Display.Align.BOTTOM_LEFT;
  } else if(a >= 0 && a < 90) {
    return Phaser.Display.Align.TOP_LEFT;
  } else if(a >= 90 && a < 180) {
    return Phaser.Display.Align.TOP_RIGHT;
  } else {
    return Phaser.Display.Align.BOTTOM_RIGHT;
  }
};

export const addTracer = distance => {
  const anchor = pistol.aimLine.getPoints(20)[0];
  const gunshot = game.scene.matter.add.image(pistol.sprite.x, pistol.sprite.y, 'gunshot');
  gunshot.setScale(distance * 0.0065, 1);
  gunshot.setCollisionCategory(0);
  gunshot.setIgnoreGravity(true);
  gunshot.angle = pistol.sprite.angle;
  game.scene.matter.alignBody(gunshot.body, anchor.x, anchor.y, getTracerAlignment(gunshot.angle));
  game.scene.tweens.add({
    targets: gunshot,
    alpha: 0,
    ease: 'Sine.easeOut',
    duration: 300,
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