import { scrollGround, drawGround } from './ground';
import player from './player';
import game from './game';
import { setMousePos } from './controls';
import { updateProgressBar } from './progressBar';
import enemies from './enemies';
import { updateBullets } from './bullets';
import { updatePowerups } from './powerups';
import pistol from './pistol';
import { updateDestructibles } from './destructibles';

export default function() {
  if(game.paused) {
    return;
  } else {
    game.graphics.strokeLineShape(pistol.aimLine);
    game.onTick();
    player.onTick();
    if(enemies.length > 0) {
      enemies.forEach(e => e.onTick());
    }
    setMousePos(this.input.mousePointer.x, this.input.mousePointer.y);
    scrollGround(this, game.speed);
    drawGround();
    updateProgressBar();
    updateBullets();
    updatePowerups();
    updateDestructibles();
  }
}