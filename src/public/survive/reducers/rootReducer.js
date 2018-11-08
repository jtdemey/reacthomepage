import { initialState } from '../creators/stateCreator';
import {
  getTimeFromTick
} from '../app/surviveUtilities';

const rootReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'MASTER_TICK':
      return {
        ...state,
        tick: (state.tick + 1),
        gameTime: getTimeFromTick(state.tick)
      };
    default:
      return state;
  }
};

export default rootReducer;