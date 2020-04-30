import player from './player';

export const handleKeyDown = e => {
  switch(e.key) {
    case 'a':
    case 'ArrowLeft':
      player.sprite.setVelocityX(-10);
      break;
    case 'd':
    case 'ArrowRight':
      player.sprite.setVelocityX(10);
      break;
    case 'w':
    case 'ArrowUp':
    case ' ':
      player.sprite.setVelocityY(-10);
      break;
    default:
      break;
  }
};

export const handleKeyUp = e => {
  switch(e.key) {
    case 'a':
    case 'ArrowLeft':
      player.sprite.setVelocityX(-4);
      break;
    case 'd':
    case 'ArrowRight':
      player.sprite.setVelocityX(4);
      break;
    case 'w':
    case 'ArrowUp':
    case ' ':
      player.sprite.setVelocityY(-10);
      break;
    default:
      break;
  }
};