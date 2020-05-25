import ground, { scrollGround, drawGround } from './ground';
import player from './player';
import game from './game';
import { setMousePos } from './controls';
import { updateProgressBar } from './progressbar';
import enemies from './enemies';
import { updateBullets } from './bullets';

export default function() {
  if(!game.paused) {
    ground.graphics.clear();
    ground.graphics.strokeLineShape(player.aimLine);
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
  }
}