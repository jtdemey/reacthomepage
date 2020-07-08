import game from "./game";
import player from './player';
import { LEVEL_DISPLAYS } from "../constants";

//Hp bar gradient: #800000, #6c2509, #574d13, #3e7c1f, #29a329
const gui = {
  labels: [],
  counts: []
};

export default gui;

const addText = (x, y, text, color, size) => game.scene.add.text(x, y, text, {
  color: color,
  fontFamily: `Coda`,
  fontSize: size 
});

export const initGui = () => {
  initLabels();
  initCounts();
};

export const initCounts = () => {
  const hpCt = addText(58, -2, '100', '#556F49', '3rem');
  gui.counts = [hpCt];
};

export const initLabels = () => {
  const hpLabel = addText(20, 12, 'HP', '#556F49', '1.5rem');
  const lvlLabel = addText(game.width - 320, 12, '1: CIVIL DUSK', '#556F49', '1.5rem');
  lvlLabel.x = game.width - lvlLabel.width - 20;
  gui.labels = [hpLabel, lvlLabel];
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

export const refreshHealthBar = () => {
  gui.counts[0].setText(player.hp);
  gui.counts[0].setColor(getHpColor(player.hp));
};

export const refreshLvlLabel = () => {
  gui.labels[1].setText(LEVEL_DISPLAYS[game.level - 1]);
  gui.labels[1].x = game.width - gui.labels[1].width - 20;
};