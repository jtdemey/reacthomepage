import surviveStore from '../store/surviveStore';
import { getListButtonItemFromIndex } from '../app/surviveUtilities';

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
  if(itemTarget.listName === 'locale') {
    console.log(localeItems);
    delete localeItems[ind];
    console.log(localeItems);
  } else if(itemTarget.listName === 'inventory') {
    inventoryItems = inventoryItems.splice(ind, 1);
  }
  return {
    type: 'REMOVE_ITEM_FROM_LIST',
    localeItems: localeItems,
    inventoryItems: inventoryItems
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

//export transitionItemIn

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
  const currentPlayer = Object.assign({}, surviveStore.getState().player);
  let localeItems = [];
  let lbiIndex = 0;
  for(let i = 0; i < currentPlayer.locale.items.length; i++) {
    let thisItem = currentPlayer.locale.items[i];
    let newLbi = {
      index: lbiIndex,
      display: thisItem.display,
      transitioning: null,
      listName: 'locale'
    };
    lbiIndex += 1;
    localeItems.push(newLbi);
  }
  let inventoryItems = [];
  for(let i = 0; i < currentPlayer.items.length; i++) {
    let thisItem = currentPlayer.items[i];
    let newLbi = {
      index: lbiIndex,
      display: thisItem.display,
      transitioning: null,
      listName: 'inventory'
    };
    lbiIndex += 1;
    inventoryItems.push(newLbi);
  }
  return {
    type: 'UPDATE_ITEM_VIEW',
    localeItems: localeItems,
    inventoryItems: inventoryItems
  };
};