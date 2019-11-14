import Phaser from 'phaser';
import createScene from './createScene.js';
import preload from './preload.js';

const siteWrapper = document.querySelector('#site-wrapper');
const screenWidth = siteWrapper.clientWidth;
const screenHeight = siteWrapper.clientHeight;

let config = (() => {
  const conf = {
    type: Phaser.AUTO,
    width: screenWidth,
    height: screenHeight,
    parent: 'site-wrapper',
    physics: {
      default: 'arcade',
      arcade: {
        gravity: {
          y: 200
        }
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