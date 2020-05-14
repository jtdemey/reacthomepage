import { mapInputEvents } from './controls';
import player, { initSprite } from './player';
import { setGroundGraphics } from './ground';
import game, { loadLevel, setFixedBounds, setExtendedBounds } from './game';
import { handleCollisions, initCollisionCats } from './collision';
import { LEVEL_IDS } from './constants';
import { initProgressBar } from './progressbar';
import { initBounds } from './bounds';

export default function() {

  //Slide whistle
  //Hank Hill whaa

  //undo this dummy
  // setInterval(() => {
  // console.log(player.sprite.body.position.x);
  // }, 1000);

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