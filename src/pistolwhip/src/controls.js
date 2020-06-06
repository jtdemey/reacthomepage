import player from './player';
import { fireBullet } from './bullets';
import { togglePause } from './game';

const controls = {
  mouseX: 0,
  mouseY: 0
};

export default controls;

export const setMousePos = (x, y) => {
  controls.mouseX = x;
  controls.mouseY = y;
};

export const handleClick = e => {
  if(!player.hasControl) {
    return;
  }
  // player.shoot();
  fireBullet();
  // shootBullet();
};

export const handleKeyDown = e => {
  if(!player.hasControl) {
    return;
  }
  console.log(e.key);
  switch(e.key) {
    case 'Escape':
      togglePause();
      break;
    case 'a':
    case 'ArrowLeft':
      player.isMovingLeft = true;
      break;
    case 'd':
    case 'ArrowRight':
      player.isMovingRight = true;
      break;
    case 'w':
    case 'ArrowUp':
    case ' ':
      player.jump();
      break;
    case 'f':
    case 'j':
      // player.shoot();
      break;
    default:
      break;
  }
};

export const handleKeyUp = e => {
  if(!player.hasControl) {
    return;
  }
  switch(e.key) {
    case 'a':
    case 'ArrowLeft':
      player.isMovingLeft = false;
      break;
    case 'd':
    case 'ArrowRight':
      player.isMovingRight = false;
      break;
    case 'w':
    case 'ArrowUp':
    case ' ':
      break;
    default:
      break;
  }
};

export const mapInputEvents = input => {
  input.keyboard.on('keydown', e => handleKeyDown(e));
  input.keyboard.on('keyup', e => handleKeyUp(e));
  input.on('pointerdown', e => handleClick(e));
};