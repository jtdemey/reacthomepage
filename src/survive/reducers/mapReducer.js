const mapReducer = (state = {}, action) => {
  switch(action.type) {
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