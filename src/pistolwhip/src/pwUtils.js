import Phaser from 'phaser';

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

export const getHypotenuseAngle = (oppLen, adjLen) => {
  return Math.atan(oppLen / adjLen);
};

export const getClientDims = () => {
  const siteWrapper = document.querySelector('#site-wrapper');
  const w = siteWrapper.clientWidth;
  const h = siteWrapper.clientHeight;
  return {
    width: w,
    height: h 
  };
};

export const getLineLength = line => {
  return Math.sqrt(Math.pow((line.x2 - line.x1), 2) + Math.pow((line.y2 - line.y1), 2));
};

export const getRandBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};