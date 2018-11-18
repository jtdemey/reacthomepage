const uiReducer = (state = {}, action) => {
  switch(action.type) {
    case 'CHANGE_VIEW':
      return {
        ...state,
        currentView: action.view
      };
    default:
      return state;
  }
};

export default uiReducer;