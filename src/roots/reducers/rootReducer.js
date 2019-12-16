import initialState from '../creators/stateCreator';
import gameReducer from './gameReducer';
import uiReducer from './uiReducer';

const rootReducer = (state = initialState, action) => {
  switch(action.type) {
    //state.game
    //state.ui
    default:
      return state;
  }
};

export default rootReducer;
