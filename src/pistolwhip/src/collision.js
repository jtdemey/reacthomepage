import player from './player';

const collisionCats = {};

export default collisionCats;

let uh = false;
export const handleCollisions = event => {
  if(!uh) {
    uh = true;
  }
  event.pairs.forEach(pair => {
    if(pair.bodyA.id === player.sprite.body.id && pair.bodyB.collisionFilter.category === collisionCats.GROUND) {
      if(player.jumps > 0) {
        player.jumps = 0;
      }
    }
  });
};

export const initCollisionCats = world => {
  const n = () => world.nextCategory();
  collisionCats.PLAYER = 0x0001;
  collisionCats.GROUND = n();
  collisionCats.ENEMY = n();
  collisionCats.CONSUMABLE = n();
  collisionCats.BULLET = n();
  collisionCats.BOUNDARY = n();
};