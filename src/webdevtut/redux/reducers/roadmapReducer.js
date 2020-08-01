const initialState = {
  index: 0,
  tree: {}
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
    default:
      return { ...state };
  }
}