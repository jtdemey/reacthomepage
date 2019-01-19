import surviveStore from '../store/surviveStore';

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