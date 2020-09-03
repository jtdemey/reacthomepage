const initialState = {
  buttonVisible: false,
  index: 0,
  items: []
};

export default function(state = initialState, action) {
  switch(action.type) {
    case 'NEXT_ROADMAP_IND':
      return {
        ...state,
        index: state.index + 1
      };
    case 'PREV_ROADMAP_IND':
      return {
        ...state,
        index: state.index - 1
      };
    case 'UPDATE_ROADMAP':
      return {
        ...state,
        index: state.index - 1
      };
    default:
      return { ...state };
  }
}