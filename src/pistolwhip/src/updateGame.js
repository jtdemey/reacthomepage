import ground, { scrollGround, drawGround } from './ground';
import player from './player';
import game from './game';
import { setMousePos } from './controls';

export default function() {
  //game.paused = true;
  if(!game.paused) {
    ground.graphics.clear();
    ground.graphics.strokeLineShape(player.aimLine);
    game.onTick();
    player.onTick();
    setMousePos(this.input.mousePointer.x, this.input.mousePointer.y);
    scrollGround(this, game.speed);
    drawGround();
  }
}