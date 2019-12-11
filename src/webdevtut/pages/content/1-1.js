import { makeRoad, makeView } from './viewHelpers';

const scene = {
  roadmap: [
    makeRoad(0, 'Intro'),
    makeRoad(1, 'Audience'),
    makeRoad(1, 'Accessibility'),
    makeRoad(1, 'Options')
  ],
  views: [
    makeView(0, 'Blank'),
    makeView(0, 'TitleSplash'),
    makeView(1, 'Blank')
  ]
};

export default scene;