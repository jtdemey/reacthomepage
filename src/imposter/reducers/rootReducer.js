import initialState from '../creators/stateCreator';
import gameReducer from './gameReducer';
import uiReducer from './uiReducer';
import {
  gameActionTypes,
  uiActionTypes
} from '../actions/actionConstants';
import { anyChildEquals } from '../app/imposterUtilities';

const rootReducer = (state = initialState, action) => {
  if(anyChildEquals(gameActionTypes, action.type)) {
    return {
      ...state,
      game: gameReducer(state.game, action)
    };
  } else if(anyChildEquals(uiActionTypes, action.type)) {
    return {
      ...state,
      ui: uiReducer(state.ui, action)
    };
  }
  return state;
};

export default rootReducer;