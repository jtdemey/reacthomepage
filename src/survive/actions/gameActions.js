import surviveStore from '../store/surviveStore';
import {
  getTimeFromTick
} from '../app/surviveUtilities';
import {
  appendLine
} from './uiActions';

export const enterLocale = (localeName) => {
  const currentState = Object.assign({}, surviveStore.getState());
  let destination = currentState.gameMap[localeName];
  if(!destination) {
    console.log(`Error in enterLocale: ${localename} not found.`);
  }
  return {
    type: 'ENTER_LOCALE',
    destination: destination
  };
};

export const executeGameCommand = comm => {
  console.log(comm);
  switch(comm.length) {
    case 1:
      break;
    case 2:
      switch(comm[0]) {
        case 'GO':
          console.log('imma do it');
          return takeExit(comm[1]);
      }
  }
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

export const pickUpItem = btnIndex => {
  return {
    type: 'PICK_UP_ITEM',
    btnIndex: btnIndex
  };
};

export const startGame = () => {
	return {
		type: 'START_GAME'
	};
};

export const takeExit = dir => {
	const currentState = Object.assign({}, surviveStore.getState());
  const currentLocale = Object.assign({}, currentState.gameMap[currentState.player.locale]);
  const exitRes = currentLocale.exits.filter(ex => ex[0] === dir);
  if(exitRes.length === 0) {
    return appendLine("You can't go that way.", 'red');
  } else if(exitRes.length > 1) {
    console.log(`Error in takeExit: more than one exit in direction ${dir}`);
  }
  const exit = exitRes[0];
  console.log('ee ' + currentLocale.exitPhrase);
  console.log(exit[3] !== undefined);
  let phrase = exit[3] !== undefined ? currentLocale.exitPhrase : exit[3];
  console.log(phrase);
  return {
    type: 'TAKE_EXIT',
    exit: exit,
    exitPhrase: phrase
  };
};
