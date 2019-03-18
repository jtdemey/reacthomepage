const playerReducer = (state = {}, action) => {
  switch(action.type) {
    case 'BEGIN_PICK_UP_ITEM':
      return {
        ...state, 
        activeSagas: action.activeSagas
      };
    case 'TAKE_ITEM_FROM_LOCALE':
      return {
        ...state,
        items: action.playerItems
      };
    default:
      return state;
  }
};

export default playerReducer;