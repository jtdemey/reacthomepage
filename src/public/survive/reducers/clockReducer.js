

const clockReducer = (state = {}, action) => {
  switch(action.type) {
    case 'MASTER_TICK':
      return {
        ...state,
        tick: action.tick,
        gameTime: action.gameTime
      };
      return r;
    default:
      return state;
  }
};

export default clockReducer;