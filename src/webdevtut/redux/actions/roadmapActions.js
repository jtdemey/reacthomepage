import roadmaps from "../../parts/roadmaps";

export const loadRoadmap = (part, chapter) => {
  const roadmap = roadmaps[`${part}-${chapter}`];
  return {
    type: 'LOAD_ROADMAP',
    items: roadmap
  };
};

export const nextRoadmapInd = () => ({
  type: 'NEXT_ROADMAP_IND'
});

export const prevRoadmapInd = () => ({
  type: 'PREV_ROADMAP_IND'
});

export const updateRoadmap = (part, chapter, page) => {


};