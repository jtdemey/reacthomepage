import game from "./game";
import player from './player';
import { getPhaserColorFromHex } from '../pwUtils';

//Hp bar gradient: #800000, #6c2509, #574d13, #3e7c1f, #29a329
const gui = {
  healthBarBg: null,
  healthBar: null,
  healthCt: null 
};

export default gui;

export const initGui = () => {
  initHealthBar();
};

export const initHealthBar = () => {
  gui.healthBarBg = game.scene.add.rectangle(110, 32, 200, 30, getPhaserColorFromHex('#333')); 
  gui.healthBar = game.scene.add.rectangle(110, 32, 198, 28, getPhaserColorFromHex('#29a329'));
  gui.healthCt = game.scene.add.text(30, 22, '100', {
    fontFamily: `'Archivo Black', sans-serif`,
    fontSize: '1.25rem'
  });
};

export const refreshHealthBar = () => {
  gui.healthCt.setText(player.hp);
  gui.healthCt.setStyle({
    fontFamily: `'Archivo Black', sans-serif`,
    fontSize: '1.25rem',
    fontStyle: 'normal'
  });
  let color;
  if(player.hp > 80) {
    color = '#29a329';
  } else if(player.hp > 60) {
    color = '#3e7c1f';
  } else if(player.hp > 40) {
    color = '#574d13';
  } else if(player.hp > 20) {
    color = '#6c2509';
  } else {
    color = '#800000';
  }
  gui.healthBar.width = player.hp * 2;
  gui.healthBar.fillColor = getPhaserColorFromHex(color);
};