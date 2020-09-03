import { getRandomProperty, getRandBetween } from "../pwUtils";
import { POWERUP_IDS, POWERUP_NAMES, POWERUP_TYPES } from "../constants";
import game from "./game";
import collisionCats from "./collision";
import player, { fadingPlayerAlert } from "./player";
import { refreshHealthCt } from "./gui";
import { addPackageDestructible } from "./destructibles";

/*
Reload speed up (gears of war style action reload)
Rage: 1hp, game speed+, every enemy is one shot
Jump height
Amount of jumps
Dmg+
Max ammo

Alternate fires
Two different colors: one representing a time-based powerup (GO HAM), other color = ammo-based (big think)
Shotgun
Grenade launcher
Molotovs?
Seeker launcher

Immersion idea:
falling debris from the sky release powerups that float away
*/

const powerups = {
  spawnChance: 0.9,
  sprites: []
};

export default powerups;

const getPowerupId = () => {
  let goodId;
  const badIds = [];
  if(player.maxJumps > 2) {
    badIds.push(POWERUP_IDS.JUMP_AMOUNT);
  }
  do {
    goodId = getRandomProperty(POWERUP_IDS);
  } while(badIds.some(id => id === goodId));
  return goodId;
};

const makeLinearPowerup = id => {
  const pickup = game.scene.matter.add.sprite(game.width + 32, getRandBetween(game.height - 300, game.height - 400), POWERUP_NAMES[id]);
  pickup.setBody({
    type: 'circle',
    radius: 32 
  });
  pickup.powerupId = id;
  pickup.powerupType = POWERUP_TYPES.LINEAR;
  pickup.setIgnoreGravity(true);
  pickup.setCollisionCategory(collisionCats.CONSUMABLE);
  pickup.body.collisionFilter.mask = collisionCats.PLAYER;
  pickup.body.mass = 0.01;
  pickup.onTick = () => {
    pickup.rotation = 0;
    pickup.setVelocityX(getRandBetween(-4, -6));
    if(pickup.x < 0 - pickup.width) {
      deletePowerup(pickup.body.id);
    }
  };
  powerups.sprites.push(pickup);
};

export const addPowerup = () => {
  const nextId = getPowerupId();
  // const powerupType = getRandomProperty(POWERUP_TYPES);
  // switch(powerupType) {
  //   case POWERUP_TYPES.LINEAR:
  //     // makeLinearPowerup(nextId);
  //     addPackageDestructible(game.width + 64, getRandBetween(100, 200), nextId);
  //     break;
  //   case POWERUP_TYPES.PACKAGE:
  //     addPackageDestructible(game.width + 64, getRandBetween(100, 200), nextId);
  //     break;
  //   case POWERUP_TYPES.MISSILE:
  //     // makeLinearPowerup(nextId);
  //     addPackageDestructible(game.width + 64, getRandBetween(100, 200), nextId);
  //     break;
  // }
  makeLinearPowerup(nextId);
};

export const applyPower = powerupId => {
  let gain;
  switch(powerupId) {
    case POWERUP_IDS.HEAL:
      gain = getRandBetween(15, 30);
      player.hp += gain;
      if(player.hp > 999) {
        player.hp = 999;
      }
      refreshHealthCt();
      fadingPlayerAlert(`+${gain} HEALTH`);
      break;
    case POWERUP_IDS.DAMAGE:
      player.damage += 10;
      fadingPlayerAlert(`+10 DAMAGE`);
      break;
    case POWERUP_IDS.MAX_AMMO:
      fadingPlayerAlert(`+2 AMMO CAPACITY`);
      break;
    case POWERUP_IDS.RELOAD_SPEED:
      fadingPlayerAlert(`RELOAD SPEED UP`);
      break;
    case POWERUP_IDS.JUMP_HEIGHT:
      player.jumpHeight -= 2;
      fadingPlayerAlert(`JUMP HEIGHT UP`);
      break;
    case POWERUP_IDS.JUMP_AMOUNT:
      player.maxJumps += 1;
      fadingPlayerAlert(`+1 JUMP`);
      break;
    case POWERUP_IDS.RAGE:
      fadingPlayerAlert(`RAGE`);
      break;
  }
};

export const attemptPowerupSpawn = () => {
  if(!game.paused && !game.isTransitioningLevels && Math.random() < powerups.spawnChance) {
    addPowerup();
    powerups.spawnChance = 0.5;
  } else {
    if(powerups.spawnChance < 1) {
      powerups.spawnChance += 0.1;
    }
  }
};

export const consumePowerup = bodyId => {
  const powerup = powerups.sprites.filter(s => s.body.id === bodyId)[0];
  deletePowerup(bodyId);
  applyPower(powerup.powerupId);
};

export const deleteAllPowerups = () => {
  powerups.sprites.forEach(s => deletePowerup(s.body.id));
};

export const deletePowerup = bodyId => {
  powerups.sprites.forEach((powerup, i) => {
    if(powerup.body.id === bodyId) {
      powerup.destroy();
      powerups.sprites.splice(i, 1);
      i -= 1;
    }
  });
};

export const updatePowerups = () => {
  if(powerups.sprites.length > 0) {
    powerups.sprites.forEach(sprite => sprite.onTick());
  }
};