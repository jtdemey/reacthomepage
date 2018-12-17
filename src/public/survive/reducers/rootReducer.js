import initialState from '../creators/stateCreator';
import clockReducer from './clockReducer';
import uiReducer from './uiReducer';
import {
  getTimeFromTick
} from '../app/surviveUtilities';

const rootReducer = (state = initialState, action) => {
  switch(action.type) {
    //state.clock
    case 'MASTER_TICK':
      return {
        ...state,
        clock: clockReducer(state.clock, action)
      };
    //state.ui
    case 'APPEND_LINE':
    case 'ELEVATE_LINES':
    case 'CHANGE_VIEW':
    case 'FOCUS_COMMAND_BAR':
    case 'SET_VIEW_HEIGHT':
    case 'SUBMIT_COMMAND':
      return {
        ...state,
        ui: uiReducer(state.ui, action)
      };
    default:
      return state;
  }
};

export default rootReducer;