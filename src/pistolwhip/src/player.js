// const makePlayer = () => {
//   const player = {};

//   player.initSprite = () => {
//     player.sprite = player.scene.matter.add.sprite(50, 190, 'player');
//     player.sprite.setBody({
//       type: 'circle',
//       radius: 16 
//     });
//     player.sprite.setBounce(0);
//   };
//   player.setScene = scene => {
//     player.scene = scene;
//   };

//   return player;
// };

// const player = makePlayer();

// export default player;
const player = {
  jumps: 1,
  scene: null,
  sprite: null
};

player.initSprite = () => {
  player.sprite = player.scene.matter.add.sprite(50, 190, 'player');
  player.sprite.setBody({
    type: 'circle',
    radius: 16 
  });
  player.sprite.setBounce(0);
};

player.setScene = scene => {
  player.scene = scene;
};

export default player;