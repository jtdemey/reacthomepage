import game from "./game";
import player from './player';
import { LEVEL_DISPLAYS } from "../constants";

//Hp bar gradient: [gui color], #384A30, #574d13, #3e7c1f, #29a329
const gui = {
  labels: {},
  counts: {}
};

export default gui;

const addText = (x, y, text, color, size) => game.scene.add.text(x, y, text, {
  color: color,
  fontFamily: `Coda`,
  fontSize: size,
  shadowOffsetX: 8,
  shadowOffsetY: 12,
  shadowBlur: 2,
  shadowColor: '#000'
});

export const initGui = () => {
  initLabels();
  initCounts();
};

export const initCounts = () => {
  const hpCt = addText(58, -2, '100', '#556F49', '3rem');
  gui.counts.health = hpCt;
  const ammoCt = addText(252, -2, '10', '#556F49', '3rem');
  gui.counts.ammo = ammoCt;
  const scoreCt = addText(416, -2, '0', '#556F49', '3rem');
  gui.counts.score = scoreCt;
};

export const initLabels = () => {
  const hpLabel = addText(20, 12, 'HP', '#556F49', '1.5rem');
  gui.labels.health = hpLabel;
  const ammoLabel = addText(170, 12, 'AMMO', '#556F49', '1.5rem');
  gui.labels.ammo = ammoLabel;
  const scoreLabel = addText(330, 12, 'SCORE', '#556F49', '1.5rem');
  gui.labels.score = scoreLabel;
  const lvlLabel = addText(game.width - 320, 12, '1: CIVIL DUSK', '#556F49', '1.5rem');
  lvlLabel.x = game.width - lvlLabel.width - 20;
  gui.labels.lvl = lvlLabel;
};

const getHpColor = hp => {
  let color;
  if(hp > 80) {
    color = '#556F49';
  } else if(hp > 60) {
    color = '#384A30';
  } else if(hp > 40) {
    color = '#574d13';
  } else if(hp > 20) {
    color = '#6c2509';
  } else if(hp > 0) {
    color = '#800000';
  } else {
    color = '#000000';
  }
  return color;
};

export const refreshGui = () => {
  refreshHealthCt();
  refreshLvlLabel();
  refreshScoreCt();
};

export const refreshHealthCt = () => {
  gui.counts.health.setText(player.hp);
  gui.counts.health.setColor(getHpColor(player.hp));
};

export const refreshLvlLabel = () => {
  gui.labels.lvl.setText(LEVEL_DISPLAYS[game.level - 1]);
  gui.labels.lvl.x = game.width - gui.labels.lvl.width - 20;
};

export const refreshScoreCt = () => {
  gui.counts.score.setText(game.score.toString());
};