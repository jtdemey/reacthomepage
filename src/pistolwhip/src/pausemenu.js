import game from "./game";

const pauseMenu = {
  background: null,
  resumeText: null,
  quitText: null
};

export default pauseMenu;

export const hidePauseMenu = () => {
  console.log(pauseMenu.resumeText);
};

export const showPauseMenu = () => {
  pauseMenu.resumeText = game.scene.add.text(game.width / 2, game.height / 2, 'Resume', {
    fontFamily: `'Archivo Black', sans-serif`,
    fontSize: '1.25rem'
  });
};