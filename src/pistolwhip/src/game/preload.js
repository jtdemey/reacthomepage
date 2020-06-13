export default function() {
  const png = str => `assets/${str}.png`;
  //Backgrounds
  this.load.image('dusk', png('dusk'));
  this.load.image('nightfall', png('nightfall'));
  this.load.image('night', png('night'));
  this.load.image('midnight', png('midnight'));
  this.load.image('earlymorning', png('earlymorning'));
  this.load.image('dawn', png('dawn'));
  //Sprites
  this.load.spritesheet('player', png('playersprite'), {
    frameWidth: 32,
    frameHeight: 32
  });
  this.load.image('pistol', png('pistol'));
  this.load.image('bullet', png('bullet'));
  this.load.spritesheet('roller', png('rollerspriteV2'), {
    frameWidth: 64,
    frameHeight: 64 
  });
  //Pause
  this.load.image('resumeBtn', png('resumeBtn'));
  this.load.image('optionsBtn', png('optionsBtn'));
  this.load.image('quitBtn', png('quitBtn'));
}