import Phaser from 'phaser';
import controls from "./controls";
import { getLineLength, getHypotenuseAngle, getDistBetweenPts } from '../pwUtils';
import { detectAimLineHits } from './collision';
import { refreshHealthBar } from './gui';
import { gameOver } from './game';
import { addTracer, addHit, addShell } from './bullets';
import { hurtEnemy } from './enemies';
import { updateGunSprite, updateAimLine } from './pistol';

const player = {
  hasControl: true,
  hitCooldown: 0,
  hp: 100,
  jumps: 0,
  jumpHeight: -9,
  maxJumps: 1,
  maxSpeed: 3,
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
    player.sprite.setVelocityY(player.jumpHeight);
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
  updateAimLine();
  updateGunSprite();
  if(player.hitCooldown > 0) {
    player.hitCooldown -= 1;
  }
};

player.setScene = scene => {
  player.scene = scene;
};

player.stopMoving = () => {
  player.isJumping = false;
  player.isMovingLeft = false;
  player.isMovingRight = false;
};

export const disablePlayerCollision = () => {
  player.sprite.body.collisionFilter.mask = 0;
};

export const fadingPlayerAlert = msg => {
  const text = player.scene.add.text(player.sprite.x - player.sprite.width, player.sprite.y - 10, msg, {
    color: '#fff',
    fontFamily: `Coda`,
    fontSize: '1.5rem' 
  });
  player.scene.tweens.add({
    targets: text,
    alpha: 0,
    y: player.sprite.y - 100,
    ease: 'Sine.easeOut',
    duration: 1000,
    repeat: 0
  });
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

export const initPlayerSprite = () => {
  player.sprite = player.scene.matter.add.sprite(50, 190, 'player');
  player.sprite.setBody({
    type: 'circle',
    radius: 16 
  });
  console.log(player)
  player.sprite.setBounce(0);
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