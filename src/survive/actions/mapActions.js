import surviveStore from '../store/surviveStore';
import {
  createForest,
  overwriteForest
} from '../creators/mapCreator';

export const enterLocale = (localeName) => {
  const currentState = Object.assign({}, surviveStore.getState());
  let currentPlayer = Object.assign({}, currentState.player);
  let currentLocale = Object.assign({}, currentState.gameMap[localeName]);
  currentPlayer.lastLocale = currentPlayer.locale;
};

export const loadGameMap = () => {
  let gameMap = {};
  const gtgMap = createForest(gameMap);
  return {
    type: 'LOAD_GAME_MAP',
    gameMap: gtgMap
  };
};

export const removeItemFromLocale = (id) => {
	const currentState = Object.assign({}, surviveStore.getState());
  let currentLocaleItems = Object.assign([], currentState.gameMap[currentState.player.locale].items);
  let itemFound = false;
  for(let i = 0; i < currentLocaleItems.length; i++) {
  	let thisItem = currentLocaleItems[i];
  	if(thisItem.itemId === id) {
  		itemFound = true;
  		currentLocaleItems = currentLocaleItems.filter((item) => {
	      return item.itemId != id;
	    });
  	}
  }
  if(!itemFound) {
  	console.log(`Error in removeItemFromLocale: unable to find item with id ${id}`);
  }
  return {
  	type: 'REMOVE_ITEM_FROM_LOCALE',
  	localeItems: currentLocaleItems,
  	localeName: currentState.player.locale
  };
};