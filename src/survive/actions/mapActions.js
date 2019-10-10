import surviveStore from '../store/surviveStore';
import {
  createGameMap
} from '../creators/mapCreator';

export const loadGameMap = () => {
  let gameMap = {};
  const gtgMap = createGameMap(gameMap);
  return {
    type: 'LOAD_GAME_MAP',
    gameMap: gtgMap
  };
};

export const removeItemFromLocale = id => {
	const currentState = Object.assign({}, surviveStore.getState());
  let currentLocItems = Object.assign([], currentState.gameMap[currentState.player.locale].items);
  if(!currentLocItems.some(i => i.itemId === id)) {
    console.log(`Error in removeItemFromLocale: unable to find item with id ${id}`);
  }
  currentLocItems = currentLocItems.filter(i => i.itemId !== id);
  return {
    type: 'REMOVE_ITEM_FROM_LOCALE',
    localeItems: currentLocItems,
    localeName: currentState.player.locale
  };
};

export const visitLocale = loc => {
  const currentLocale = Object.assign({}, surviveStore.getState().gameMap[loc]);
  if(!currentLocale) {
    console.log(`Error in visitLocale: unable to retrieve locale ${loc}`);
  }
  currentLocale.visits += 1;
  return {
    type: 'VISIT_LOCALE',
    locale: currentLocale
  };
};