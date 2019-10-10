import { uiActionTypes } from '../actions/actionConstants';

const uiReducer = (state = {}, action) => {
  switch(action.type) {
    case 'APPEND_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.concat(action.notification)
      };
    case 'CHANGE_GAME_VIEW':
      return {
        ...state
      };
    case 'CHANGE_THEME':
      return {
        ...state,
        theme: action.theme
      };
    case 'CHANGE_VIEW_VALUE':
      return {
        ...state,
        view: action.view
      };
    case uiActionTypes.CLEAR_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.notifications
      };
    case 'FADE_ENTITY_IN':
    case 'REMOVE_FADE_IN_ENTITY':
      return {
        ...state,
        isFadingIn: action.isFadingIn
      };
    case 'FADE_ENTITY_OUT':
    case 'REMOVE_FADE_OUT_ENTITY':
      return {
        ...state,
        isFadingOut: action.isFadingOut
      };
    case uiActionTypes.TOGGLE_ACCUSING:
        return {
          ...state,
          isAccusing: action.isAccusing
        };
    case 'TOGGLE_MODAL':
        return {
          ...state,
          modal: action.modal
        };
    default:
      return state;
  }
};

export default uiReducer;
