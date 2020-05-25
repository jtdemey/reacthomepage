export default function() {
  //Backgrounds
  this.load.image('dusk', 'assets/dusk.png');
  this.load.image('nightfall', 'assets/nightfall.png');
  this.load.image('night', 'assets/night.png');
  this.load.image('midnight', 'assets/midnight.png');
  this.load.image('earlymorning', 'assets/earlymorning.png');
  this.load.image('dawn', 'assets/dawn.png');
  //Sprites
  this.load.spritesheet('player', 'assets/playersprite.png', {
    frameWidth: 32,
    frameHeight: 32
  });
  this.load.image('pistol', 'assets/pistol.png');
  this.load.image('bullet', 'assets/bullet.png');
  this.load.spritesheet('roller', 'assets/rollersprite.png', {
    frameWidth: 64,
    frameHeight: 64 
  });
}