import { getClientDims } from './pwUtils';
import controls, { mapInputEvents } from './controls';
import player from './player';
import { setGroundGraphics } from './ground';
import game, { loadLevel } from './game';
import { handleCollisions, initCollisionCats } from './collision';

export default function() {

  //undo this dummy
  // setInterval(() => {
  //   console.log(Math.abs(controls.mouseX - player.sprite.body.position.x));
  // }, 1000);

  //Client dims
  const dims = getClientDims();
  game.width = dims.width;
  game.height = dims.height;
  initCollisionCats(this.matter.world);

  //Inputs
  mapInputEvents(this.input);

  //Background
  this.add.image(0, 0, 'day').setOrigin(0);

  //Player
  player.setScene(this);
  player.initSprite();

  //Game world
  this.matter.world.setBounds(0, 0, dims.width, dims.height, 1, true, true, false, true);
  this.matter.world.on('collisionstart', e => handleCollisions(e));

  //Ground
  setGroundGraphics(this.add.graphics({
    fillStyle: {
      color: 0x000000
    },
    lineStyle: {
      width: 2,
      color: '#000'
    }
  }));

  //Init
  loadLevel(this, 1);
}