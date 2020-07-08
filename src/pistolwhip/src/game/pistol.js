import Phaser from 'phaser';
import { getLineLength, getHypotenuseAngle, getDistBetweenPts } from '../pwUtils';
import controls from './controls';
import game from './game';
import { detectAimLineHits } from './collision';
import { addShell, addTracer, addHit } from './bullets';
import { hurtEnemy } from './enemies';
import player from './player';

const pistol = {
  aimLine: null,
  damage: 40,
  position: null,
  range: 600,
  sprite: null
};

export default pistol;

export const initPistolSprite = () => {
  pistol.sprite = game.scene.matter.add.image(60, 190, 'pistol');
  pistol.sprite.setScale(0.15, 0.15);
  pistol.sprite.setIgnoreGravity(true);
  pistol.sprite.body.collisionFilter.mask = 0;
  pistol.aimLine = new Phaser.Geom.Line(pistol.sprite.body.position.x, pistol.sprite.body.position.y, 500, 500);
};

export const shoot = () => {
  const hits = detectAimLineHits();
  addShell();
  if(!hits.closestPt) {
    addTracer(800);
  } else {
    addHit(hits.closestPt);
    const dist = getDistBetweenPts(hits.closestPt.x, hits.closestPt.y, pistol.sprite.body.position.x, pistol.sprite.body.position.y);
    if(dist > 400) {
      addTracer(dist);
    }
    if(hits.closestPt.enemyId) {
      hurtEnemy(hits.closestPt.enemyId, pistol.damage);
    }
  }
};

export const updateAimLine = () => {
  pistol.aimLine.x1 = player.sprite.body.position.x;
  pistol.aimLine.y1 = player.sprite.body.position.y;
  pistol.aimLine.x2 = controls.mouseX;
  pistol.aimLine.y2 = controls.mouseY;
};

export const updateGunSprite = () => {
  pistol.position = pistol.aimLine.getPoint(24 / getLineLength(pistol.aimLine), pistol.sprite.body);
  if(controls.mouseX - pistol.sprite.body.position.x < 0) {
    pistol.sprite.angle = Math.floor(100 * getHypotenuseAngle(controls.mouseY - pistol.sprite.body.position.y, controls.mouseX - pistol.sprite.body.position.x)) / 2 - 180;
  } else {
    pistol.sprite.angle = Math.floor(100 * getHypotenuseAngle(controls.mouseY - pistol.sprite.body.position.y, controls.mouseX - pistol.sprite.body.position.x)) / 2;
  }
  pistol.sprite.setPosition(pistol.position.x, pistol.position.y);
};