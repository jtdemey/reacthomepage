import { LEVEL_NAMES } from "../constants";

export default function() {
  const bg = str => `assets/bg/${str}.png`;
  const png = str => `assets/${str}.png`;
  //Backgrounds
  // this.load.image('civildusk', bg('civildusk'));
  // this.load.image('nauticaldusk', bg('nauticaldusk'));
  // this.load.image('astronomicaldusk', bg('astronomicaldusk'));
  // this.load.image('nightfall', bg('nightfall'));
  // this.load.image('nightfall2', bg('nightfall2'));
  // this.load.image('nightfall3', bg('nightfall3'));
  // this.load.image('night', bg('night'));
  // this.load.image('midnight', bg('midnight'));
  // this.load.image('morning', bg('morning'));
  // this.load.image('sunrise', bg('sunrise'));
  // this.load.image('sunrise2', bg('sunrise2'));
  // this.load.image('sunrise3', bg('sunrise3'));
  // this.load.image('astronomicaldawn', bg('astronomicaldawn'));
  // this.load.image('nauticaldawn', bg('nauticaldawn'));
  // this.load.image('civildawn', bg('civildawn'));
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
  //Pause
  this.load.image('resumeBtn', png('resumeBtn'));
  this.load.image('optionsBtn', png('optionsBtn'));
  this.load.image('quitBtn', png('quitBtn'));
}