import Phaser from 'phaser';
import { getClientDims, getRandBetween } from './pwUtils';

// class Pistolwhip extends Phaser.Scene {

//   constructor() {
//     super('Pistolwhip');
//   }

//   preload() {
//     this.load.image('assets/day');
//     this.load.image('assets/player');
//   }

//   create() {
//     this.cameras.main.backgroundColor = '#666666';
//     this.physics.world.setBoundsCollision(true);

//       //Create the bricks in a 10x6 grid
//     //   this.bricks = this.physics.add.staticGroup({
//     //       key: 'assets', frame: [ 'blue1', 'red1', 'green1', 'yellow1', 'silver1', 'purple1' ],
//     //       frameQuantity: 10,
//     //       gridAlign: { width: 10, height: 6, cellWidth: 64, cellHeight: 32, x: 112, y: 100 }
//     //   });

//       //Our colliders
//       //this.physics.add.collider(this.ball, this.bricks, this.hitBrick, null, this);
//       //this.physics.add.collider(this.ball, this.paddle, this.hitPaddle, null, this);

//       //Input events
//       this.input.on('pointermove', function (pointer) {

//       }, this);

//       this.input.on('pointerup', function (pointer) {

//       }, this);
//   }

//   resetLevel() {
//     //   this.resetBall();

//     //   this.bricks.children.each(function (brick) {

//     //       brick.enableBody(false, 0, 0, true, true);

//     //   });
//   }

//   update() {
//     //   if (this.ball.y > 600)
//     //   {
//     //       this.resetBall();
//     //   }
//   }
// }
let ground = {
  lastX: 0,
  lastY: 0,
  xInd: 0,
  yInd: 0
};

export default function() {

  //Client dims
  const dims = getClientDims();
  ground.yInd = dims.height;
  console.log(this.impact);

  //Background
  this.add.image(0, 0, 'day').setOrigin(0);

  //Player
  const player = this.impact.add.sprite(50, 300, 'player');
  player.setBounce(0.1);

  //Ground
  const getSlopes =  (unitCt, viewHeight, widthRange, altRange) => {
    let points = [0, viewHeight, 0, viewHeight - 100];
    let xInd = 0, yInd = 0;
    for(let i = 0; i < unitCt; i++) {
      const w = getRandBetween(widthRange[0], widthRange[1]);
      xInd = xInd + w;
      yInd = getRandBetween(altRange[0], altRange[1]);
      const newPt = [xInd, yInd];
      points = points.concat(newPt);
    }
    points = points.concat([xInd, viewHeight]);
    return new Phaser.Geom.Polygon(points);
  };

  const groundGraphics = this.add.graphics({
    fillStyle: {
      color: 0x000000
    },
    lineStyle: {
      width: 2,
      color: '#000'
    }
  });
  const renderedSlopes = getSlopes(10, dims.height, [100, 300], [dims.height - 100, dims.height - 300]);
  groundGraphics.fillPoints(renderedSlopes.points, true);

  //Physics
  console.log(renderedSlopes);
  //const slopes = this.impact.add.existing(renderedSlopes);
  //slopes.body.y = dims.height - 100;
  //console.log(slopes.body);

  //Colliders
  //this.physics.add.collider(player, slopes);
}