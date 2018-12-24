const uiReducer = (state = {}, action) => {
  switch(action.type) {
    case 'APPEND_LINE':
      return {
        ...state,
        consoleLines: action.lines,
        lineIndex: action.lineIndex
      };
    case 'ELEVATE_LINES':
      return {
        ...state,
        consoleLines: action.lines
      };
    case 'CHANGE_VIEW':
      return {
        ...state,
        currentView: action.currentView,
        viewTransitioningIn: action.currentView,
        viewTransitioningOut: null
      };
    case 'FOCUS_COMMAND_BAR':
      return {
        ...state,
        commandBarFocus: true
      };
    case 'SET_VIEW_HEIGHT':
      return {
        ...state,
        viewHeight: action.amount
      };
    case 'SUBMIT_COMMAND':
      return {
        ...state,
        lastInput: action.input
      };
    case 'TRANSITION_VIEW_OUT':
      return {
        ...state,
        viewTransitioningOut: state.currentView
      };
    default:
      return state;
  }
};

export default uiReducer;