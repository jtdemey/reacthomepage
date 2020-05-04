import player from './player';

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
  console.log(e);
};

export const handleKeyDown = e => {
  switch(e.key) {
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
    default:
      break;
  }
};

export const handleKeyUp = e => {
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