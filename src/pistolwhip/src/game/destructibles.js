import { genId, getRandBetween } from "../pwUtils";
import game from "./game";
import collisionCats from "./collision";
import { DESTRUCTIBLE_TYPES } from "../constants";

const destructibles = {
  sprites: []
};

export default destructibles;

export const addPackageDestructible = (x, y, powerupId) => {
  const item = game.scene.matter.add.sprite(x, y, DESTRUCTIBLE_TYPES.PACKAGE);
  item.setBody({
    type: 'circle',
    radius: 16 
  });
  item.destructibleType = DESTRUCTIBLE_TYPES.PACKAGE;
  item.powerupId = powerupId;
  item.damage = 0;
  item.scale = 1.25;
  item.setIgnoreGravity(true);
  item.setCollisionCategory(collisionCats.DESTRUCTIBLE);
  item.body.collisionFilter.mask = collisionCats.PLAYER & collisionCats.BOUNDARY;
  item.body.mass = 0.01;
  item.onTick = () => {
    item.rotation = 0;
    item.setVelocityX(getRandBetween(-4, -6));
    if(item.x < 0 - item.width) {
      deleteDestructible(item.body.id);
    }
  };
  console.log(item)
  destructibles.sprites.push(item);
};

export const deleteDestructible = bodyId => {
  destructibles.sprites.forEach((sprite, i) => {
    if(sprite.body.id === bodyId) {
      sprite.destroy();
      destructibles.sprites.splice(i, 1);
      i -= 1;
    }
  });
};

export const updateDestructibles = () => destructibles.sprites.forEach(d => d.onTick());