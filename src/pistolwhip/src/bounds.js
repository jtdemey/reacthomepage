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