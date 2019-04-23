import surviveStore from '../store/surviveStore';
import {
  getTimeFromTick
} from '../app/surviveUtilities';

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
