import game from './game';
import collisionCats from './collision';
import { makePt } from './pwUtils';

const bounds = {
  left: null,
  right: null
};

export default bounds;

export const initBounds = () => {
  const makeBound = (x, y, verts) => game.scene.matter.add.fromVertices(x, y, verts, {
    collisionFilter: {
      category: collisionCats.BOUNDARY,
      mask: collisionCats.PLAYER
    },
    isStatic: true
  });
  const rectPts = [makePt(0, 0), makePt(0, game.height), makePt(20, game.height), makePt(20, 0)];
  bounds.left = makeBound(-10, game.height / 2, rectPts);
  bounds.right = makeBound(game.width + 10, game.height / 2, rectPts);
};

export const setExtendedBounds = () => {
  game.scene.matter.world.setBounds(-100, 0, game.width + 400, game.height, 1, true, true, false, true);
};

export const setFixedBounds = () => {
  game.scene.matter.world.setBounds(0, 0, game.width, game.height, 1, true, true, false, true);
};