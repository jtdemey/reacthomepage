import initialState from '../creators/stateCreator';
import gameReducer from './gameReducer';
import mapReducer from './mapReducer';
import playerReducer from './playerReducer';
import uiReducer from './uiReducer';
import {
  getTimeFromTick
} from '../app/surviveUtilities';

const rootReducer = (state = initialState, action) => {
  switch(action.type) {
    //state.game
    case 'ENTER_LOCALE':
    case 'MASTER_TICK':
    case 'PICK_UP_ITEM':
    case 'START_GAME':
    case 'TAKE_EXIT':
      return {
        ...state,
        game: gameReducer(state.game, action)
      };
    //state.player
    case 'ADD_ITEM_TO_INVENTORY':
    case 'TAKE_EXIT':
    case 'TAKE_ITEM_FROM_LOCALE':
    case 'UPDATE_PLAYER_LOCALE':
      return {
        ...state,
        player: playerReducer(state.player, action)
      };
    //state.ui
    case 'ADD_ITEM_TO_LIST':
    case 'APPEND_LINE':
    case 'ELEVATE_LINES':
    case 'CHANGE_VIEW':
    case 'CLOSE_MODALS':
    case 'CLOSE_MODALS_DELAYED':
    case 'FOCUS_COMMAND_BAR':
    case 'PICK_UP_ITEM':
    case 'POPULATE_ITEM_INFO_MODAL':
    case 'REMOVE_ENTITY_TRANSITIONING_IN':
    case 'REMOVE_ENTITY_TRANSITIONING_OUT':
    case 'REMOVE_ITEM_FROM_LIST':
    case 'SET_CLIENT_DIMENSIONS':
    case 'SHOW_ITEM_INFO_MODAL':
    case 'SUBMIT_COMMAND':
    case 'TRANSITION_ENTITY_IN':
    case 'TRANSITION_ENTITY_OUT':
    case 'TRANSITION_ITEM_OUT':
    case 'TRANSITION_VIEW_OUT':
    case 'UPDATE_ITEM_VIEW':
    case 'UPDATE_LOCALE_NAME_GRID':
    case 'UPDATE_MAP_GRID_ITEMS':
      return {
        ...state,
        ui: uiReducer(state.ui, action)
      };
    //state.gameMap
    case 'LOAD_GAME_MAP':
    case 'REMOVE_ITEM_FROM_LOCALE':
    case 'VISIT_LOCALE':
      return {
        ...state,
        gameMap: mapReducer(state.gameMap, action)
      };
    default:
      return state;
  }
};

export default rootReducer;
