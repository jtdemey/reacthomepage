import surviveStore from '../store/surviveStore';
import {
  createListButtonItem,
  getListButtonItemFromIndex
} from '../app/surviveUtilities';

export const addItemToList = (listBtnItem, destination) => {
  const currentState = Object.assign({}, surviveStore.getState().ui);
  const localeItems = Object.assign([], currentState.localeItemButtons);
  const inventoryItems = Object.assign([], currentState.inventoryItemButtons);
  let newLbi = Object.assign({}, listBtnItem);
  newLbi.transitioning = 'in';
  if(destination === 'locale') {
    localeItems.push(newLbi);
  } else if(destination === 'inventory') {
    inventoryItems.push(newLbi);
  }
  console.log(inventoryItems);
  return {
    type: 'ADD_ITEM_TO_LIST',
    localeItemButtons: localeItems,
    inventoryItemButtons: inventoryItems
  };
};

export const appendLine = (line) => {
  const currentState = Object.assign({}, surviveStore.getState().ui);
  const lineInd = currentState.lineIndex + 1;
  const newLines = Object.assign([], currentState.consoleLines);
  const lineId = lineInd;
  const ypos = currentState.consoleYpos;
  const newLine = {
    id: lineId,
    text: line,
    color: 'white',
    ypos: ypos,
    opacity: 1
  };
  newLines.push(newLine);
  return {
    type: 'APPEND_LINE',
    lines: newLines,
    lineIndex: lineInd
  };
};

export const changeView = (newView) => ({
  type: 'CHANGE_VIEW',
  currentView: newView
});

export const elevateLines = () => {
  const currentState = Object.assign({}, surviveStore.getState().ui);
  const newLines = Object.assign([], currentState.consoleLines);
  if(newLines[0].ypos > currentState.consoleYpos + currentState.viewHeight) {
    newLines.shift();
  }
  if(newLines.length > 0) {
    for(let i = 0; i < newLines.length; i++) {
      let thisLine = newLines[i];
      thisLine.ypos += 28;
      thisLine.opacity -= 0.02;
    }
  }
  return {
    type: 'ELEVATE_LINES',
    lines: newLines
  };
};

export const focusCommandBar = () => ({
  type: 'FOCUS_COMMAND_BAR'
});

export const pickUpItem = (ind) => {
  const transitionedItem = transitionItemOut(ind);
  transitionedItem.type = 'PICK_UP_ITEM';
  return transitionedItem;
};

export const removeItemFromList = (ind) => {
  const currentState = Object.assign({}, surviveStore.getState().ui);
  let localeItems = Object.assign([], currentState.localeItemButtons);
  let inventoryItems = Object.assign([], currentState.inventoryItemButtons);
  const itemTarget = getListButtonItemFromIndex(localeItems, inventoryItems, ind);
  const thisItemId = itemTarget.itemId;
  if(itemTarget.listName === 'locale') {
    localeItems = localeItems.filter((item) => {
      return item.index != ind;
    });
  } else if(itemTarget.listName === 'inventory') {
    inventoryItems = inventoryItems.filter((item) => {
      return item.index != ind;
    });
  }
  return {
    type: 'REMOVE_ITEM_FROM_LIST',
    localeItems: localeItems,
    inventoryItems: inventoryItems,
    removedItem: itemTarget
  };
}

export const setViewHeight = (amt) => {
  return {
    type: 'SET_VIEW_HEIGHT',
    amount: amt
  };
};

export const submitCommand = (txt) => {
  let res = txt.replace(/&/g, '').replace(/</g, '').replace(/"/g, '');
  surviveStore.dispatch(appendLine(Math.random() * 1000 + 'ayyyy'));
  return {
    type: 'SUBMIT_COMMAND',
    input: res
  };
};

export const transitionItemIn = (ind) => {
  const currentState = Object.assign({}, surviveStore.getState().ui);
  const localeItems = Object.assign([], currentState.localeItemButtons);
  const inventoryItems = Object.assign([], currentState.inventoryItemButtons);
  const itemTarget = getListButtonItemFromIndex(localeItems, inventoryItems, ind);
  itemTarget.transitioning = 'in';
  return {
    type: 'TRANSITION_ITEM_IN',
    localeItemButtons: localeItems,
    inventoryItemButtons: inventoryItems,
    indexTransitioned: ind
  };
};

export const transitionItemOut = (ind) => {
  const currentState = Object.assign({}, surviveStore.getState().ui);
  const localeItems = Object.assign([], currentState.localeItemButtons);
  const inventoryItems = Object.assign([], currentState.inventoryItemButtons);
  const itemTarget = getListButtonItemFromIndex(localeItems, inventoryItems, ind);
  itemTarget.transitioning = 'out';
  return {
    type: 'TRANSITION_ITEM_OUT',
    localeItemButtons: localeItems,
    inventoryItemButtons: inventoryItems,
    indexTransitioned: ind
  };
};

export const transitionViewIn = (viewnum) => {
  return {
    type: 'TRANSITION_VIEW_IN',
    view: viewnum
  };
};

export const transitionViewOut = (nextview) => {
  return {
    type: 'TRANSITION_VIEW_OUT',
    nextView: nextview
  };
};

export const updateItemView = () => {
  const currentState = Object.assign({}, surviveStore.getState());
  const currentInventory = Object.assign([], currentState.player.items);
  const currentLocaleItems = Object.assign([], currentState.gameMap[currentState.player.locale].items);
  let localeItems = [];
  let lbiIndex = 0;
  for(let i = 0; i < currentLocaleItems.length; i++) {
    let thisItem = currentLocaleItems[i];
    let newLbi = createListButtonItem(lbiIndex, thisItem.itemId, thisItem.display, thisItem.quantity, false, 'locale');
    lbiIndex += 1;
    localeItems.push(newLbi);
  }
  if(localeItems.length < 1) {
    let newLbi = createListButtonItem(lbiIndex, 999999, '(nothing visible)', 1, true, 'locale');
    lbiIndex += 1;
    localeItems.push(newLbi);
  }
  let inventoryItems = [];
  for(let i = 0; i < currentInventory.length; i++) {
    let thisItem = currentInventory[i];
    let newLbi = createListButtonItem(lbiIndex, thisItem.itemId, thisItem.display, thisItem.quantity, false, 'inventory');
    lbiIndex += 1;
    inventoryItems.push(newLbi);
  }
  if(inventoryItems.length < 1) {
    let newLbi = createListButtonItem(lbiIndex, 999999, '(no items)', 1, true, 'locale');
    lbiIndex += 1;
    localeItems.push(newLbi);
  }
  return {
    type: 'UPDATE_ITEM_VIEW',
    localeItems: localeItems,
    inventoryItems: inventoryItems
  };
};