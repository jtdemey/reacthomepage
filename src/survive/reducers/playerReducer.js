const playerReducer = (state = {}, action) => {
  switch(action.type) {
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