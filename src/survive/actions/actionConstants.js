const spreadStrings = arr => {
  const r = {};
  arr.forEach(v => {
    r[v] = v;
  });
};

//Game
export const gameActionStrings = [
  'ENTER_LOCALE',
  'MASTER_TICK',
  'PICK_UP_ITEM',
  'START_GAME',
  'TAKE_EXIT'
];

export const gameActions = spreadStrings(gameActionStrings);

//Player
export const playerActionStrings = [
  'ADD_ITEM_TO_INVENTORY',
  'TAKE_EXIT',
  'TAKE_ITEM_FROM_LOCALE',
  'UPDATE_PLAYER_LOCALE'
];

export const playerActions = spreadStrings(playerActionStrings);

//Map
export const mapActionStrings = [
  'LOAD_GAME_MAP',
  'REMOVE_ITEM_FROM_LOCALE',
  'VISIT_LOCALE'
];

export const mapActions = spreadStrings(mapActionStrings);

//UI
export const uiActionStrings = [
  'ADD_ITEM_TO_LIST',
  'APPEND_LINE',
  'ELEVATE_LINES',
  'CHANGE_VIEW',
  'CLOSE_MODALS',
  'FOCUS_COMMAND_BAR',
  'POPULATE_ITEM_INFO_MODAL',
  'REMOVE_ENTITY_TRANSITIONING_IN',
  'REMOVE_ENTITY_TRANSITIONING_OUT',
  'REMOVE_ITEM_FROM_LIST',
  'SET_CLIENT_DIMENSIONS',
  'SET_PARTICLE_MODE',
  'SHOW_ITEM_INFO_MODAL',
  'SUBMIT_COMMAND',
  'TRANSITION_ENTITY_IN',
  'TRANSITION_ENTITY_OUT',
  'TRANSITION_ITEM_OUT',
  'TRANSITION_VIEW_OUT',
  'UPDATE_ITEM_VIEW',
  'UPDATE_LOCALE_NAME_GRID',
  'UPDATE_MAP_GRID_ITEMS'
];

export const uiActions = spreadStrings(uiActionStrings);