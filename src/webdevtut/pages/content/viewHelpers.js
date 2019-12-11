export const makeRoad = (level, text) => {
  return {
    level,
    text
  };
};

export const makeView = (index, viewName, props = {}) => {
  return {
    index,
    viewName,
    props
  };
};