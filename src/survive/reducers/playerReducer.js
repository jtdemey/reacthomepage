const playerReducer = (state = {}, action) => {
  switch(action.type) {
    case 'ADD_ITEM_TO_INVENTORY':
      return {
        ...state,
        items: action.inventory
      };
    case 'TAKE_EXIT':
      return {
        ...state,
        isExiting: action.isExiting
      };
    case 'TAKE_ITEM_FROM_LOCALE':
      return {
        ...state,
        items: action.playerItems
      };
    case 'UPDATE_PLAYER_LOCALE':
      return {
        ...state,
        ...action.player
      };
    default:
      return state;
  }
};

export default playerReducer;