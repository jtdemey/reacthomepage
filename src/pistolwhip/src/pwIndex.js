import Phaser from 'phaser';
import createScene from './createScene.js';
import preload from './preload.js';
import update from './updateGame';
import { getClientDims } from './pwUtils';

let config = (() => {
  const dims = getClientDims();
  const conf = {
    type: Phaser.AUTO,
    width: dims.width,
    height: dims.height,
    parent: 'site-wrapper',
    physics: {
      default: 'matter',
      matter: {
        debug: true,
        gravity: {
          x: 0,
          y: 0.6
        }
      }
    },
    scene: {
      create: createScene,
      preload: preload,
      update: update
    }
  };
  return conf;
})();

const game = new Phaser.Game(config);