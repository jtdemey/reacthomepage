import Phaser from 'phaser';
import game from './game/game';

export const convertPathToPoints = path => {
  const res = [];
  const splitPath = path.split(' ');
  let index = 0;
  for(let i = 0; i < splitPath.length / 2; i++) {
    const point = new Phaser.Geom.Point(splitPath[index], splitPath[index + 1]);
    res.push(point);
    index += 2;
  }
  return res;
};

export const detectCatColl = (bodyA, bodyB, catA, catB) => isCollCat(bodyA, catA) && isCollCat(bodyB, catB)
    || isCollCat(bodyA, catB) && isCollCat(bodyB, catA);

export const genId = len => {
  const abc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
  let id = '';
  for(let i = 0; i < len; i++) {
    const cInd = Math.floor(Math.random() * abc.length);
    const c = abc.charAt(cInd);
    id += c;
  }
  return id;
};

export const getClientDims = () => {
  const siteWrapper = document.querySelector('#site-wrapper');
  game.width = siteWrapper.clientWidth;
  game.height = siteWrapper.clientHeight;
};

export const getClosestPtTo = (targetX, targetY, points) => {
  if(points.length < 2) {
    return points[0];
  }
  let ptInd = 0;
  let leastDist = undefined;
  points.forEach((p, i) => {
    let dist = getDistBetweenPts(p.x, p.y, targetX, targetY);
    if(leastDist === undefined || dist < leastDist) {
      leastDist = dist;
      ptInd = i;
    }
  });
  return points[ptInd];
};

export const getDistBetweenPts = (x1, y1, x2, y2) => Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

export const getHypotenuseAngle = (oppLen, adjLen) => {
  return Math.atan(oppLen / adjLen);
};

export const getLineLength = line => {
  return Math.sqrt(Math.pow((line.x2 - line.x1), 2) + Math.pow((line.y2 - line.y1), 2));
};

export const getPhaserColorFromHex = hex => new Phaser.Display.Color.HexStringToColor(hex).color;

export const getRandBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

export const getRandomProperty = obj => {
  const keys = Object.keys(obj);
  return obj[keys[keys.length * Math.random() << 0]];
};

export const isCollCat = (body, cat) => body.collisionFilter.category === cat;

export const makePt = (x, y) => new Phaser.Geom.Point(x, y);

export const xPos = entity => entity.body.position.x;

export const yPos = entity => entity.body.position.y;