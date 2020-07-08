import game, { unpauseGame } from '../game/game';
import { getPhaserColorFromHex } from "../pwUtils";

const pauseMenu = {
  background: null,
  header: null,
  resumeText: null,
  optionsText: null,
  quitText: null,
  tweens: {}
};

export default pauseMenu;

export const hidePauseMenu = () => {
  pauseMenu.background.visible = false;
  pauseMenu.background.scaleY = 1;
  pauseMenu.header.visible = false;
  pauseMenu.resumeText.visible = false;
  pauseMenu.optionsText.visible = false;
  pauseMenu.quitText.visible = false;
};

const addMenuItem = (x, y, key, hoverInteraction, clickFunc = undefined) => {
  const menuItem = game.scene.add.image(x, y, key);
  menuItem.setInteractive();
  if(hoverInteraction) {
    let xOrigin = menuItem.x;
    let yOrigin = menuItem.y;
    menuItem.on('pointerover', () => {
      pauseMenu.tweens[key] = game.scene.tweens.add({
        targets: menuItem,
        x: menuItem.x + 3,
        y: menuItem.y - 8,
        ease: 'Sine.easeOut',
        duration: 200,
        repeat: 0
      });
    });
    menuItem.on('pointerout', () => {
      menuItem.alpha = 1;
      pauseMenu.tweens[key].stop();
      menuItem.x = xOrigin;
      menuItem.y = yOrigin;
    });
  }
  if(clickFunc !== undefined) {
    menuItem.on('pointerdown', clickFunc);
  }
  menuItem.angle = 350;
  return menuItem;
};

const animateMenuItems = () => {
  const anim = (menuBtn, delay) => {
    const destX = menuBtn.x;
    const destY = menuBtn.y;
    menuBtn.x = destX - 400;
    menuBtn.y = destY + 100;
    menuBtn.alpha = 0;
    game.scene.tweens.add({
      targets: menuBtn,
      alpha: 1,
      x: destX,
      y: destY,
      delay: delay,
      ease: 'Sine.easeInOut',
      duration: 100,
      repeat: 0
    });
  };
  anim(pauseMenu.header, 0);
  anim(pauseMenu.resumeText, 35);
  anim(pauseMenu.optionsText, 70);
  anim(pauseMenu.quitText, 105);
};

export const showPauseMenu = () => {
  if(pauseMenu.background !== null) {
    pauseMenu.background.visible = true;
    pauseMenu.header.visible = true;
    pauseMenu.resumeText.visible = true;
    pauseMenu.optionsText.visible = true;
    pauseMenu.quitText.visible = true;
  } else {
    pauseMenu.background = game.scene.add.rectangle(game.width / 2, game.height / 2, game.width * 2, game.height / 7, getPhaserColorFromHex('#333'));
    pauseMenu.background.angle = 350;
    pauseMenu.background.alpha = 0.9;
    pauseMenu.header = addMenuItem(game.width / 2, game.height / 2 - 160, 'pausedHeader', false);
    pauseMenu.resumeText = addMenuItem(game.width / 2, game.height / 2 - 20, 'resumeBtn', true, () => unpauseGame());
    pauseMenu.optionsText = addMenuItem(game.width / 2, game.height / 2 + 60, 'optionsBtn', true);
    pauseMenu.quitText = addMenuItem(game.width / 2, game.height / 2 + 140, 'quitBtn', true);
  }
  animateMenuItems();
  game.scene.tweens.add({
    targets: pauseMenu.background,
    scaleY: 4,
    t: 1,
    ease: 'Sine.easeInOut',
    duration: 100,
    repeat: 0
  });
};