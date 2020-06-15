import Phaser from 'phaser';
import controls from "./controls";
import { getLineLength, getHypotenuseAngle } from '../pwUtils';
import { detectAimLineHit } from './collision';
import { refreshHealthBar } from './gui';
import { gameOver } from './game';

const player = {
  aimLine: null,
  damage: 40,
  gunPosition: null,
  gunSprite: null,
  hasControl: true,
  hitCooldown: 0,
  hp: 100,
  jumps: 0,
  maxJumps: 1,
  maxSpeed: 3,
  range: 600,
  scene: null,
  score: 0,
  sprite: null,
  isInvulnerable: false,
  isJumping: false,
  isMovingLeft: false,
  isMovingRight: false,
  velocityModifier: 0.28
};

player.jump = () => {
  if(player.jumps < player.maxJumps) {
    player.jumps++;
    player.sprite.setVelocityY(-9);
  }
};

player.onTick = () => {
  player.sprite.rotation = 0;
  if(player.isMovingLeft) {
    if(player.sprite.body.velocity.x > -(player.maxSpeed + 1)) {
      player.sprite.setVelocityX(player.sprite.body.velocity.x - player.velocityModifier);
    }
  }
  if(player.isMovingRight) {
    if(player.sprite.body.velocity.x < player.maxSpeed) {
      player.sprite.setVelocityX(player.sprite.body.velocity.x + player.velocityModifier);
    }
  }
  if(player.isEnteringLevel) {
    player.sprite.setVelocityX(player.sprite.body.velocity.x + 0.15);
    if(player.sprite.x > 100) {
      player.isEnteringLevel = false;
    }
  }
  player.updateAimLine();
  player.updateGunSprite();
  if(player.hitCooldown > 0) {
    player.hitCooldown -= 1;
  }
};

player.setScene = scene => {
  player.scene = scene;
};

player.shoot = () => {
  if(detectAimLineHit()) {
    console.log('oi');
  }
};

player.updateAimLine = () => {
  player.aimLine.x1 = player.sprite.body.position.x;
  player.aimLine.y1 = player.sprite.body.position.y;
  player.aimLine.x2 = controls.mouseX;
  player.aimLine.y2 = controls.mouseY;
};

player.updateGunSprite = () => {
  player.gunPosition = player.aimLine.getPoint(24 / getLineLength(player.aimLine), player.gunSprite.body);
  if(controls.mouseX - player.sprite.body.position.x < 0) {
    player.gunSprite.angle = Math.floor(100 * getHypotenuseAngle(controls.mouseY - player.sprite.body.position.y, controls.mouseX - player.sprite.body.position.x)) / 2 - 180;
  } else {
    player.gunSprite.angle = Math.floor(100 * getHypotenuseAngle(controls.mouseY - player.sprite.body.position.y, controls.mouseX - player.sprite.body.position.x)) / 2;
  }
  player.gunSprite.setPosition(player.gunPosition.x, player.gunPosition.y);
};

export const disablePlayerCollision = () => {
  player.sprite.body.collisionFilter.mask = 0;
};

export const hurtPlayer = amt => {
  if(player.hitCooldown < 1 && player.isInvulnerable === false) {
    player.hitCooldown = 120;
    player.hp = player.hp - amt < 0 ? 0 : player.hp - amt;
    if(player.hp === 0) {
      gameOver();
    }
    refreshHealthBar();
  }
};

export const initSprite = () => {
  player.sprite = player.scene.matter.add.sprite(50, 190, 'player');
  player.sprite.setBody({
    type: 'circle',
    radius: 16 
  });
  player.sprite.setBounce(0);
  player.gunSprite = player.scene.matter.add.image(60, 190, 'pistol');
  player.gunSprite.setScale(0.15, 0.15);
  player.gunSprite.setIgnoreGravity(true);
  player.gunSprite.body.collisionFilter.mask = 0;
  player.aimLine = new Phaser.Geom.Line(player.sprite.body.position.x, player.sprite.body.position.y, 500, 500);
  player.scene.anims.create({
    key: 'walk',
    frames: player.scene.anims.generateFrameNumbers('player'),
    frameRate: 10,
    yoyo: true,
    repeat: -1
  });
  player.sprite.anims.load('walk');
  player.sprite.anims.play('walk');
};

export const tweenPlayerVelocityX = (target, time, cb = undefined) => {
  let velocityModifer = { x: 1 };
  player.scene.tweens.add({
    targets: velocityModifer,
    x: target,
    ease: 'Sine.easeInOut',
    duration: time,
    repeat: 0,
    onUpdate: () => player.sprite.setVelocityX(velocityModifer.x),
    onComplete: cb === undefined ? () => { return; } : cb
  });
};

export default player;