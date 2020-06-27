import game, { unpauseGame } from '../game/game';
import { getPhaserColorFromHex } from "../pwUtils";

const pauseMenu = {
  background: null,
  resumeText: null,
  optionsText: null,
  quitText: null,
  tweens: {}
};

export default pauseMenu;

export const hidePauseMenu = () => {
  pauseMenu.background.visible = false;
  pauseMenu.background.scaleY = 1;
  pauseMenu.resumeText.visible = false;
  pauseMenu.optionsText.visible = false;
  pauseMenu.quitText.visible = false;
};

export const showPauseMenu = () => {
  if(pauseMenu.background !== null) {
    pauseMenu.background.visible = true;
    pauseMenu.resumeText.visible = true;
    pauseMenu.optionsText.visible = true;
    pauseMenu.quitText.visible = true;
  } else {
    pauseMenu.background = game.scene.add.rectangle(game.width / 2, game.height / 2, game.width, game.height / 6, getPhaserColorFromHex('#333'));
    pauseMenu.background.alpha = 0.85;
    const addMenuItem = (x, y, key, clickFunc = undefined) => {
      const menuItem = game.scene.add.image(x, y, key);
      menuItem.setInteractive();
      menuItem.on('pointerover', e => {
        pauseMenu.tweens[key] = game.scene.tweens.add({
          targets: menuItem,
          t: 1,
          alpha: 0.5,
          ease: 'linear',
          duration: 200,
          repeat: 0
        });
      });
      menuItem.on('pointerout', e => {
        menuItem.alpha = 1;
        pauseMenu.tweens[key].stop();
      });
      if(clickFunc !== undefined) {
        menuItem.on('pointerdown', clickFunc);
      }
      return menuItem;
    };
    pauseMenu.resumeText = addMenuItem(game.width / 2, game.height / 2 - 80, 'resumeBtn', () => unpauseGame());
    pauseMenu.optionsText = addMenuItem(game.width / 2, game.height / 2, 'optionsBtn');
    pauseMenu.quitText = addMenuItem(game.width / 2, game.height / 2 + 80, 'quitBtn');
  }
  game.scene.tweens.add({
    targets: pauseMenu.background,
    scaleY: 4,
    t: 1,
    ease: 'Sine.easeInOut',
    duration: 100,
    repeat: 0
  });
};