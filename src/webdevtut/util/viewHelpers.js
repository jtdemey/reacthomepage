export const makeRoad = (roadmapIndex, level, text) => ({
  roadmapIndex,
  level,
  text
});

export const makeView = (roadmapIndex, viewName, props = {}) => ({
  roadmapIndex,
  viewName,
  props
});