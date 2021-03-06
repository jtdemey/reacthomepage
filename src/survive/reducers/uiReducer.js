import { modalModeConstants } from '../app/surviveConstants';

const uiReducer = (state = {}, action) => {
  switch(action.type) {
    case 'ADD_ITEM_TO_LIST':
      return {
        ...state,
        localeItemButtons: action.localeItemButtons,
        inventoryItemButtons: action.inventoryItemButtons
      };
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
    case 'CLOSE_MODALS':
      return {
        ...state,
        isModalVisible: false
      };
    case 'FOCUS_COMMAND_BAR':
      return {
        ...state,
        commandBarFocus: true
      };
    case 'POPULATE_ITEM_INFO_MODAL':
      return {
        ...state,
        iimTitle: action.itemInfo.display,
        iimDesc: action.itemInfo.description,
        iimBtns: action.itemBtns
      };
    case 'REMOVE_ENTITY_TRANSITIONING_IN':
      return {
        ...state,
        entitiesTransitioningIn: action.entitiesTransitioningIn
      };
    case 'REMOVE_ENTITY_TRANSITIONING_OUT':
      return {
        ...state,
        entitiesTransitioningOut: action.entitiesTransitioningOut
      };
    case 'REMOVE_TRANSITION_IN_ENTITY':
      return {
        ...state,
        entitiesTransitioningIn: [...state.entitiesTransitioningIn, action.entityName]
      };
    case 'REMOVE_TRANSITION_OUT_ENTITY':
      return {
        ...state,
        entitiesTransitioningOut: [...state.entitiesTransitioningOut, action.entityName]
      };
    case 'REMOVE_ITEM_FROM_LIST':
      return {
        ...state,
        localeItemButtons: action.localeItems,
        inventoryItemButtons: action.inventoryItems
      };
    case 'SET_CLIENT_DIMENSIONS':
      return {
        ...state,
        clientWidth: action.clientWidth,
        clientHeight: action.clientHeight
      };
    case 'SET_PARTICLE_MODE':
      return {
        ...state,
        particleMode: action.mode
      };
    case 'SHOW_ITEM_INFO_MODAL':
      return {
        ...state,
        isModalVisible: true,
        modalMode: modalModeConstants.ITEM_INFO
      };
    case 'SUBMIT_COMMAND':
      return {
        ...state,
        lastInput: action.input
      };
    case 'TRANSITION_ENTITY_IN':
      return {
        ...state,
        entitiesTransitioningIn: [...state.entitiesTransitioningIn, action.entityName]
      };
    case 'TRANSITION_ENTITY_OUT':
      return {
        ...state,
        entitiesTransitioningOut: [...state.entitiesTransitioningOut, action.entityName]
      };
    case 'TRANSITION_ITEM_OUT':
      return {
        ...state,
        localeItemButtons: action.localeItemButtons,
        inventoryItemButtons: action.inventoryItemButtons
      };
    case 'TRANSITION_VIEW_OUT':
      return {
        ...state,
        viewTransitioningOut: state.currentView
      };
    case 'UPDATE_ITEM_VIEW':
      return {
        ...state,
        localeItemButtons: action.localeItems,
        inventoryItemButtons: action.inventoryItems
      };
    case 'UPDATE_LOCALE_NAME_GRID':
    return {
      ...state,
      localeNameGrid: action.localeNameGrid
    };
    case 'UPDATE_MAP_GRID_ITEMS':
      return {
        ...state,
        mapGridItems: action.mapGridItems
      };
    default:
      return state;
  }
};

export default uiReducer;
