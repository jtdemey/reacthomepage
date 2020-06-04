import Phaser from 'phaser';
import game from "./game";

const gui = {
  healthbar: null,
  healthct: null 
};

export default gui;

export const initGui = () => {
  initHealthBar();
};

export const initHealthBar = () => {
  const barColor = new Phaser.Display.Color.HexStringToColor('#00ace6');
  gui.healthbar = game.scene.add.rectangle(110, 32, 200, 30, barColor.color);
  console.log(game.scene.add);
  gui.healthct = game.scene.add.text(30, 22, '100', {
    fontFamily: `'Archivo Black', sans-serif`,
    fontSize: '1.25rem'
  });
  console.log(gui.healthct.style);
};

export const refreshHealthBar = () => {

};