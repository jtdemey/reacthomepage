import Phaser from 'phaser';
import createScene from './createScene.js';
import preload from './preload.js';
import { getClientDims } from './pwUtils';

let config = (() => {
  const dims = getClientDims();
  const conf = {
    type: Phaser.AUTO,
    width: dims.width,
    height: dims.height,
    parent: 'site-wrapper',
    physics: {
      default: 'impact',
      impact: {
        gravity: {
          y: 400
        },
        debug: true
      }
    },
    scene: {
      preload: preload,
      create: createScene
    }
  };
  return conf;
})();

const game = new Phaser.Game(config);