import { mapInputEvents } from './controls';
import player, { initSprite } from './player';
import { setGroundGraphics } from './ground';
import game, { loadLevel } from './game';
import { handleCollisions, initCollisionCats } from './collision';
import { LEVEL_IDS } from './constants';
import { initProgressBar } from './progressbar';
import { initBounds, setFixedBounds, setExtendedBounds } from './bounds';
import enemies from './enemies';

export default function() {

  //Slide whistle
  //Hank Hill whaa

  //undo this dummy
  setInterval(() => {
    // console.log(enemies[0].sprite.body.position.x)
    // console.log(game.width - game.enemySpawnDist, game.width + 50);
  }, 1000);

  //Client dims
  initCollisionCats(this.matter.world);

  //Inputs
  mapInputEvents(this.input);

  //Prep
  player.setScene(this);
  game.setScene(this);
  setExtendedBounds();
  this.matter.world.on('collisionstart', e => handleCollisions(e));

  //Init
  loadLevel(this, LEVEL_IDS.DUSK);
  initSprite();
  setGroundGraphics(this);
  initBounds();
  initProgressBar(this);
}