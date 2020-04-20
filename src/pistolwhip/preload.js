export default function() {
  this.load.image('day', 'assets/day.png');
  this.load.spritesheet('player', 'assets/player.png', {
    frameWidth: 32,
    frameHeight: 32,
    startFrame: 0,
    endFrame: 1
  });
}