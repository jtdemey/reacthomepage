const mapReducer = (state = {}, action) => {
  switch(action.type) {
    case 'LOAD_GAME_MAP':
      return action.gameMap;
    case 'REMOVE_ITEM_FROM_LOCALE':
      return {
        ...state,
        [action.localeName]: {
          ...[action.localeName],
          items: action.localeItems
        }
      };
    default:
      return state;
  }
};

export default mapReducer;