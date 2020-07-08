import { getRandomProperty, getRandBetween } from "../pwUtils";
import { POWERUP_IDS, POWERUP_NAMES } from "../constants";
import game from "./game";
import collisionCats from "./collision";
import player, { fadingPlayerAlert } from "./player";
import { refreshHealthBar } from "./gui";

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

export const addPowerup = () => {
  const nextId = getRandomProperty(POWERUP_IDS);
  const pickup = game.scene.matter.add.sprite(game.width + 32, getRandBetween(game.height - 300, game.height - 400), POWERUP_NAMES[nextId]);
  pickup.powerupId = nextId;
  pickup.setIgnoreGravity(true);
  pickup.setCollisionCategory(collisionCats.CONSUMABLE);
  pickup.body.collisionFilter.mask = collisionCats.PLAYER;
  powerups.sprites.push(pickup);
};

export const applyPower = powerupId => {
  let gain;
  switch(powerupId) {
    case POWERUP_IDS.HEAL:
      gain = getRandBetween(15, 30);
      player.hp += gain;
      refreshHealthBar();
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

export const consumePowerup = bodyId => {
  powerups.sprites.forEach((powerup, i) => {
    if(powerup.body.id === bodyId) {
      powerup.destroy();
      powerups.sprites.splice(i, 1);
      i -= 1;
      applyPower(powerup.powerupId);
    }
  });
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

export const updatePowerups = () => {
  if(powerups.sprites.length > 0) {
    powerups.sprites.forEach(sprite => {
      sprite.rotation = 0;
      sprite.setVelocityX(getRandBetween(-2, -3));
    });
  }
};