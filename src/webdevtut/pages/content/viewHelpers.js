export const makeRoad = (roadmapIndex, level, text) => {
  return {
    roadmapIndex,
    level,
    text
  };
};

export const makeView = (roadmapIndex, viewName, props = {}) => {
  return {
    roadmapIndex,
    viewName,
    props
  };
};