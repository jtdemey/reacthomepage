import initialState from '../creators/stateCreator';
import gameReducer from './gameReducer';
import mapReducer from './mapReducer';
import playerReducer from './playerReducer';
import uiReducer from './uiReducer';
import * as actionConstants from '../actions/actionConstants';

const rootReducer = (state = initialState, action) => {
  if(actionConstants.gameActionStrings.some(v => v === action.type)) {
    return {
      ...state,
      game: gameReducer(state.game, action)
    };
  } else if(actionConstants.playerActionStrings.some(v => v === action.type)) {
    return {
      ...state,
      player: playerReducer(state.player, action)
    };
  } else if(actionConstants.mapActionStrings.some(v => v === action.type)) {
    return {
      ...state,
      gameMap: mapReducer(state.gameMap, action)
    };
  } else if(actionConstants.uiActionStrings.some(v => v === action.type)) {
    return {
      ...state,
      ui: uiReducer(state.ui, action)
    };
  } else {
    return state;
  }
};

export default rootReducer;