import { LEVEL_NAMES, POWERUP_NAMES } from "../constants";

export default function() {
  const bg = str => `assets/bg/${str}.png`;
  const png = str => `assets/${str}.png`;
  const pu = str => `assets/powerups/${str}.png`;
  const d = str => `assets/destructibles/${str}.png`;
  //Backgrounds
  LEVEL_NAMES.forEach(n => this.load.image(n, bg(n)));
  //Sprites
  this.load.spritesheet('player', png('playersprite'), {
    frameWidth: 32,
    frameHeight: 32
  });
  this.load.image('pistol', png('pistol'));
  this.load.image('bullet', png('bullet'));
  this.load.image('gunshot', png('gunshot'));
  this.load.spritesheet('roller', png('rollerspriteV2'), {
    frameWidth: 64,
    frameHeight: 64 
  });
  this.load.spritesheet('glider', png('glidersprite'), {
    frameWidth: 80,
    frameHeight: 40 
  });
  //Powerups
  POWERUP_NAMES.forEach(n => this.load.image(n, pu(n)));
  //Destructibles
  this.load.image('powerupPackage', d('powerupPackage'));
  //Pause
  this.load.image('pausedHeader', png('pausedHeader'));
  this.load.image('resumeBtn', png('resumeBtn'));
  this.load.image('optionsBtn', png('optionsBtn'));
  this.load.image('quitBtn', png('quitBtn'));
}