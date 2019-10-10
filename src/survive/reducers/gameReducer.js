const gameReducer = (state = {}, action) => {
  switch(action.type) {
    case 'ENTER_LOCALE':
      return {
        ...state
      };
    case 'MASTER_TICK':
      return {
        ...state,
        tick: action.tick,
        gameTime: action.gameTime
      };
    case 'PICK_UP_ITEM':
      return {
        ...state
      };
    case 'START_GAME':
      return {
        ...state,
        paused: false
      };
    case 'TAKE_EXIT':
      return {
        ...state
      };
    default:
      return state;
  }
};

export default gameReducer;