const gameReducer = (state = {}, action) => {
  switch(action.type) {
    case 'MASTER_TICK':
      return {
        ...state,
        tick: action.tick,
        gameTime: action.gameTime
      };
    case 'STOP_PICK_UP_ITEM':
      return {
        ...state,
        activeSagas: action.activeSagas
      };
    case 'START_GAME':
      return {
        ...state,
        paused: false
      };
    default:
      return state;
  }
};

export default gameReducer;