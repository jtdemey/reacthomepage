import { mapInputEvents } from './controls';
import player, { initPlayerSprite } from './player';
import game, { loadLevel, setGraphics } from './game';
import { handleCollisions, initCollisionCats } from './collision';
import { LEVEL_IDS } from '../constants';
import { initProgressBar } from './progressBar';
import { initBounds, setExtendedBounds } from './bounds';
import { initGui } from './gui';
import { initPistolSprite } from './pistol';

export default function() {

  //Slide whistle
  //Hank Hill whaa

  //undo this dummy
  setInterval(() => {
    // fadingPlayerAlert('ahoyahoyahoy');
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
  initGui();
  loadLevel(this, LEVEL_IDS.CIVIL_DUSK);
  initPlayerSprite();
  initPistolSprite();
  setGraphics(this);
  initBounds();
  initProgressBar(this);
}