import surviveStore from '../store/surviveStore';

export const beginPickUpItem = (btnIndex) => {
  return {
    type: 'BEGIN_PICK_UP_ITEM',
    btnIndex: btnIndex
  };
};

export const takeItemFromLocale = (id) => {
	const currentState = Object.assign({}, surviveStore.getState());
  const currentInventory = Object.assign([], currentState.player.items);
  const currentLocaleItems = Object.assign([], currentState.gameMap[currentState.player.locale].items);
  let itemFound = false;
  let hadItem = false;
  for(let i = 0; i < currentLocaleItems.length; i++) {
  	let thisItem = currentLocaleItems[i];
  	if(thisItem.itemId === id) {
  		itemFound = true;
      if(thisItem.stackable === true) {
        for(let j = 0; j < currentInventory.length; j++) {
          let thisPlayerItem = currentInventory[j];
          if(thisPlayerItem.itemId === id) {
            hadItem = true;
            currentInventory[j].quantity += thisItem.quantity;
          }
        }
      } else {
        currentInventory.push(currentLocaleItems[i]);
      }
  	}
  }
  if(!itemFound) {
  	console.log(`Error in takeItemFromLocale: unable to find item with id ${id}`);
  }
  return {
  	type: 'TAKE_ITEM_FROM_LOCALE',
  	playerItems: currentInventory,
    hadItem: hadItem
  };
};