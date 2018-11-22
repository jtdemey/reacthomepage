const uiReducer = (state = {}, action) => {
  switch(action.type) {
    case 'CHANGE_VIEW':
      return {
        ...state,
        currentView: action.view
      };
    case 'SUBMIT_COMMAND':
      return {
        ...state,
        lastInput: action.input
      };
    default:
      return state;
  }
};

export default uiReducer;