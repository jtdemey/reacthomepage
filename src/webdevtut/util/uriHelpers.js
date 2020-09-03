import { setIndices } from "../redux/actions/pageActions";

const isValidDigit = token => token && !isNaN(token) && (token.length === 1 || token.length === 2);

const isPart = x => ['web', 'js', 'node', 'react'].some(y => y === x);

export const getIndicesFromHref = () => {
  let partIndex, part, chapter, page;
  const href = location.href.split('/');
  href.forEach((x, i) => {
    if(isPart(x)) {
      partIndex = i;
      part = getPartIndex(x);
    }
  });
  if(isValidDigit(href[partIndex + 1])) {
    chapter = href[partIndex + 1];
  }
  if(isValidDigit(href[partIndex + 2])) {
    page = href[partIndex + 2];
  }
  return { part, chapter, page };
};

export const getPartIndex = partName => ['web', 'js', 'node', 'react'].indexOf(partName) + 1;

export const setIndicesFromHref = dispatch => {
  const i = getIndicesFromHref();
  dispatch(setIndices(i.part, i.chapter, i.page));
};