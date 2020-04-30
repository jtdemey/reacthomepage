import ground, { scrollGround, drawGround } from './ground';
import player from './player';
import game from './game';
import { handleKeyDown, handleKeyUp } from './controls';

export default function() {
  //game.paused = true;
  if(!game.paused) {
    game.tick += 1;
    ground.graphics.clear();
    scrollGround(this, game.speed);
    drawGround();
  }
  this.input.keyboard.on('keydown', e => handleKeyDown(e));
  //this.input.keyboard.on('keyup', e => handleKeyUp(e));
  player.sprite.rotation = 0;
}