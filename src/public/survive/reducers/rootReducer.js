import initialState from '../creators/stateCreator';
import clockReducer from './clockReducer';
import mapReducer from './mapReducer';
import playerReducer from './playerReducer';
import uiReducer from './uiReducer';
import {
  getTimeFromTick
} from '../app/surviveUtilities';

const rootReducer = (state = initialState, action) => {
  switch(action.type) {
    //state.game
    case 'MASTER_TICK':
      return {
        ...state,
        clock: clockReducer(state.clock, action)
      };
    //state.player
    case 'TAKE_ITEM_FROM_LOCALE':
      return {
        ...state,
        player: playerReducer(state.player, action)
      };
    //state.ui
    case 'ADD_ITEM_TO_LIST':
    case 'APPEND_LINE':
    case 'ELEVATE_LINES':
    case 'CHANGE_VIEW':
    case 'FOCUS_COMMAND_BAR':
    case 'PICK_UP_ITEM':
    case 'REMOVE_ITEM_FROM_LIST':
    case 'SET_VIEW_HEIGHT':
    case 'SUBMIT_COMMAND':
    case 'TRANSITION_ITEM_OUT':
    case 'TRANSITION_VIEW_OUT':
    case 'UPDATE_ITEM_VIEW':
      return {
        ...state,
        ui: uiReducer(state.ui, action)
      };
    //state.gameMap
    case 'REMOVE_ITEM_FROM_LOCALE':
      return {
        ...state,
        gameMap: mapReducer(state.gameMap, action)
      };
    default:
      return state;
  }
};

export default rootReducer;