const initialState = {
  part: 0,
  chapter: 0,
  page: 0
};

export default function(state = initialState, action) {
  switch(action.type) {
    case 'SET_PART':
      return {
        ...state,
        part: action.part
      };
    case 'SET_CHAPTER':
      return {
        ...state,
        chapter: action.chapter
      };
    case 'SET_PAGE':
      return {
        ...state,
        page: action.page
      };
    default:
      return { ...state };
  }
}