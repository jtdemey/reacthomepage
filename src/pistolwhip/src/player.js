import Phaser from 'phaser';
import collisionCats from "./collision";
import controls from "./controls";
import { getLineLength, getHypotenuseAngle } from './pwUtils';

const player = {
  aimLine: null,
  gunPosition: null,
  gunSprite: null,
  jumps: 0,
  maxJumps: 1,
  maxSpeed: 3,
  scene: null,
  sprite: null,
  isJumping: false,
  isMovingLeft: false,
  isMovingRight: false,
  velocityModifier: 0.28
};

player.initSprite = () => {
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
  player.updateAimLine();
  player.updateGunSprite();
};

player.setScene = scene => {
  player.scene = scene;
};

player.updateAimLine = () => {
  player.aimLine.x1 = player.sprite.body.position.x;
  player.aimLine.y1 = player.sprite.body.position.y;
  player.aimLine.x2 = controls.mouseX;
  player.aimLine.y2 = controls.mouseY;
};
let um = false;
player.updateGunSprite = () => {
  player.gunPosition = player.aimLine.getPoint(24 / getLineLength(player.aimLine), player.gunSprite.body);
  if(!um) {
    console.log(getHypotenuseAngle(Math.abs(controls.mouseY - player.sprite.body.position.y), Math.abs(controls.mouseX - player.sprite.body.position.x)));
    um = true;
  }
  if(controls.mouseX - player.sprite.body.position.x < 0) {
    player.gunSprite.angle = Math.floor(100 * getHypotenuseAngle(controls.mouseY - player.sprite.body.position.y, controls.mouseX - player.sprite.body.position.x)) / 2 - 180;
  } else {
    player.gunSprite.angle = Math.floor(100 * getHypotenuseAngle(controls.mouseY - player.sprite.body.position.y, controls.mouseX - player.sprite.body.position.x)) / 2;
  }
  console.log(player.gunSprite.angle);
  player.gunSprite.setPosition(player.gunPosition.x, player.gunPosition.y);
};

export default player;