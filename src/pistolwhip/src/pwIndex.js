import Phaser from 'phaser';
import createScene from './createScene.js';
import preload from './preload.js';
import update from './updateGame';
import { getClientDims } from './pwUtils';
import game from './game.js';

let config = (() => {
  getClientDims();
  const conf = {
    type: Phaser.AUTO,
    width: game.width,
    height: game.height,
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

const gameInstance = new Phaser.Game(config);