import surviveStore from '../store/surviveStore';
import {
  getTimeFromTick
} from '../app/surviveUtilities';

export const enterLocale = (localeName) => {
  const currentState = Object.assign({}, surviveStore.getState());
  let currentPlayer = currentState.player;
  let destination = currentState.gameMap[localeName];
  if(!destination) {
    console.log(`Error in enterLocale: ${localename} not found.`);
  }
  return {
    type: 'ENTER_LOCALE',
    destination: destination
  };
};

export const masterTick = (t) => {
	const currentState = Object.assign({}, surviveStore.getState().game);
	if(currentState.paused) {
		return;
	}
  let nt = t + 1;
  return {
    type: 'MASTER_TICK',
    tick: nt,
    gameTime: getTimeFromTick(nt)
  };
};

export const startGame = () => {
	return {
		type: 'START_GAME'
	};
};
