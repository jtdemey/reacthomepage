export const setChapter = chapter => ({
  type: 'SET_CHAPTER',
  chapter: chapter || 1
});

export const setIndices = (part, chapter, page) => ({
  type: 'SET_INDICES',
  part: part || 1,
  chapter: chapter || 1,
  page: page || 1 
});

export const setPage = page => ({
  type: 'SET_PAGE',
  page: page || 1
});

export const setPart = part => ({
  type: 'SET_PART',
  part: part || 1
});