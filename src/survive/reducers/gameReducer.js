const gameReducer = (state = {}, action) => {
  switch(action.type) {
    case 'BEGIN_PICK_UP_ITEM':
      return {
        ...state, 
        activeSagas: action.activeSagas
      };
    case 'STOP_PICK_UP_ITEM':
      return {
        ...state,
        activeSagas: action.activeSagas
      };
    case 'START_GAME':
      return {
        ...state,
        gameClock: action.gameClock,
        paused: false
      };
    default:
      return state;
  }
};

export default gameReducer;