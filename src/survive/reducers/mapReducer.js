const mapReducer = (state = {}, action) => {
  switch(action.type) {
    case 'LOAD_GAME_MAP':
      return {
        ...action.gameMap
      };
    case 'REMOVE_ITEM_FROM_LOCALE':
      return {
        ...state,
        [action.localeName]: {
          ...state[action.localeName],
          items: action.localeItems
        }
      };
    case 'VISIT_LOCALE':
      return {
        ...state,
        [action.locale.name]: {
          ...action.locale
        }
      };
    default:
      return state;
  }
};

export default mapReducer;