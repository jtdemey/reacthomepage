import imposterStore from '../store/imposterStore';
import { viewNames } from '../app/imposterConstants';
import { uiActionTypes } from './actionConstants';

export const alertMessage = (text, duration) => {
  return {
    type: uiActionTypes.ALERT_MESSAGE,
    alertText: text,
    delay: duration
  };
};

export const appendNotification = text => {
  const notify = {
    text: text
  };
  return {
    type: uiActionTypes.APPEND_NOTIFICATION,
    notification: notify
  };
};

export const changeGameView = viewInd => {
  const currView = Object.assign({}, imposterStore.getState().ui).view;
  const currViewName = viewNames[currView];
  const destViewName = viewNames[viewInd];
  return {
    type: uiActionTypes.CHANGE_GAME_VIEW,
    currView: currView,
    destView: viewInd,
    currViewName: currViewName,
    destViewName: destViewName
  };
};

export const changeTheme = themeId => {
  return {
    type: uiActionTypes.CHANGE_THEME,
    theme: themeId
  };
};

export const changeViewValue = viewInd => {
  return {
    type: uiActionTypes.CHANGE_VIEW_VALUE,
    view: viewInd
  };
};

export const clearAlertMessage = () => {
  return {
    type: uiActionTypes.CLEAR_ALERT_MESSAGE,
    alertText: null
  };
};

export const clearNotifications = () => {
  return {
    type: uiActionTypes.CLEAR_NOTIFICATIONS,
    notifications: []
  };
};

export const fadeEntityIn = (entityName, delay = 500) => {
  const fadeIns = [...imposterStore.getState().ui.isFadingIn].concat([entityName]);
  return {
    type: uiActionTypes.FADE_ENTITY_IN,
    isFadingIn: fadeIns,
    entityName,
    delay
  };
};

export const fadeEntityOut = (entityName, delay = 500) => {
  const fadeOuts = [...imposterStore.getState().ui.isFadingOut].concat([entityName]);
  return {
    type: uiActionTypes.FADE_ENTITY_OUT,
    isFadingOut: fadeOuts,
    entityName,
    delay
  };
};

export const removeFadeInEntity = entityName => {
  const fadeIns = imposterStore.getState().ui.isFadingIn.filter(e => e !== entityName);
  return {
    type: uiActionTypes.REMOVE_FADE_IN_ENTITY,
    isFadingIn: fadeIns
  };
};

export const removeFadeOutEntity = entityName => {
  const fadeOuts = imposterStore.getState().ui.isFadingOut.filter(e => e !== entityName);
  return {
    type: uiActionTypes.REMOVE_FADE_OUT_ENTITY,
    isFadingOut: fadeOuts
  };
};

export const toggleAccusing = c => {
  return {
    type: uiActionTypes.TOGGLE_ACCUSING,
    isAccusing: !c
  };
};

export const toggleModal = modalInd => {
  return {
    type: uiActionTypes.TOGGLE_MODAL,
    modal: modalInd
  };
};