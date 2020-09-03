const initialState = {
  part: 1,
  chapter: 1,
  page: 1
};

export default function(state = initialState, action) {
  switch(action.type) {
    case 'SET_CHAPTER':
      return {
        ...state,
        chapter: action.chapter
      };
    case 'SET_INDICES':
      return {
        ...state,
        part: action.part,
        chapter: action.chapter,
        page: action.page
      };
    case 'SET_PAGE':
      return {
        ...state,
        page: action.page
      };
    case 'SET_PART':
      return {
        ...state,
        part: action.part
      };
    default:
      return { ...state };
  }
}