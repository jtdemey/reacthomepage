import Phaser from 'phaser';

class Pistolwhip extends Phaser.Scene {

  constructor() {
    super('Pistolwhip');
  }

  preload() {
    this.load.image('assets/day');
    this.load.image('assets/player');
  }

  create() {
    this.cameras.main.backgroundColor = '#666666';
    this.physics.world.setBoundsCollision(true);

      //Create the bricks in a 10x6 grid
    //   this.bricks = this.physics.add.staticGroup({
    //       key: 'assets', frame: [ 'blue1', 'red1', 'green1', 'yellow1', 'silver1', 'purple1' ],
    //       frameQuantity: 10,
    //       gridAlign: { width: 10, height: 6, cellWidth: 64, cellHeight: 32, x: 112, y: 100 }
    //   });

      //Our colliders
      //this.physics.add.collider(this.ball, this.bricks, this.hitBrick, null, this);
      //this.physics.add.collider(this.ball, this.paddle, this.hitPaddle, null, this);

      //Input events
      this.input.on('pointermove', function (pointer) {

      }, this);

      this.input.on('pointerup', function (pointer) {

      }, this);
  }

  resetLevel() {
    //   this.resetBall();

    //   this.bricks.children.each(function (brick) {

    //       brick.enableBody(false, 0, 0, true, true);

    //   });
  }

  update() {
    //   if (this.ball.y > 600)
    //   {
    //       this.resetBall();
    //   }
  }
}

let config = (() => {
  const root = document.querySelector('#site-wrapper');
  const w = root.clientWidth;
  const h = root.clientHeight;
  const conf = {
    type: Phaser.WEBGL,
    width: w,
    height: h,
    parent: 'site-wrapper',
    scene: [ Pistolwhip ],
    physics: {
      default: 'arcade'
    }
  };
  return conf;
})();

let game = new Phaser.Game(config);