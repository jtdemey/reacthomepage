import Phaser from 'phaser';
import createScene from './game/createScene';
import preload from './game/preload';
import update from './game/updateGame';
import { getClientDims } from './pwUtils';
import game from './game/game';

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
        // debug: true,
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

const glhf = new Phaser.Game(config);