const uiReducer = (state = {}, action) => {
  switch(action.type) {
    case 'APPEND_LINE':
      return {
        ...state,
        consoleLines: [...state.consoleLines, action.line],
        consoleYpos: action.ypos
      }
    case 'CHANGE_VIEW':
      return {
        ...state,
        currentView: action.view
      };
    case 'FOCUS_COMMAND_BAR':
      return {
        ...state,
        commandBarFocus: true
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