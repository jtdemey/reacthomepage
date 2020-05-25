import Phaser from 'phaser';
import game, { loadLevel } from './game';
import player from './player';

const progressBar = {
  complete: 0,
  bar: null,
  leftBg: null,
  leftNum: null,
  leftShadow: null,
  rightBg: null,
  rightNum: null,
  rightShadow: null
};

export const initProgressBar = scene => {
  const barColor = new Phaser.Display.Color.HexStringToColor('#00ace6');
  //scene.add.text
  progressBar.bar = scene.add.rectangle(game.width / 2, 4, game.width, 8, barColor.color);
};

export const updateProgressBar = () => {
  let ticksComplete = player.scene.time.now - game.levelStartTick;
  let tickTotal = game.nextLevelTick;
  let pctComplete = ticksComplete / tickTotal * 100;
  progressBar.bar.width = pctComplete / 100 * (game.width - 120);
  if(ticksComplete > tickTotal) {
    //loadLevel(player.scene, game.level + 1);
  }
};