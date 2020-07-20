import React, { useState } from 'react';
import { Router } from '@reach/router';
import Roadmap from './Roadmap';
import TitleSplash from './TitleSplash';
import ImageView from './ImageView';
import PartView from './PartView';
import { makeRoad } from '../util/viewHelpers';
import ChapterView from './ChapterView';

// const getView = view => {
//   if(view === undefined) {
//     console.error('no view ' + view);
//     return;
//   }
//   const p = view.props ? {...view.props} : false;
//   switch(view.viewName) {
//     case 'TitleSplash':
//       return <TitleSplash {...p} />;
//     case 'ImageView':
//       return <ImageView images={p.images} />
//     default:
//       return <div></div>;
//   }
// };

const getDefaultRoadmap = () => [makeRoad(0, 0, 'Welcome!')];

const handleClick = (roadmapVisible, setRoadmapVisible) => {
  if(roadmapVisible) {
    setRoadmapVisible(false);
  }
};

const handleKey = (e, roadmapVisible, setRoadmapVisible) => {
  switch(e.keyCode) {
    case 9:
    case 82:
      setRoadmapVisible(!roadmapVisible);
      break;
  }
  return false;
};

const TutApp = () => {
  const [roadmapVisible, setRoadmapVisible] = useState(false);
  const clickFunc = () => handleClick(roadmapVisible, setRoadmapVisible);
  const keyFunc = e => handleKey(e, roadmapVisible, setRoadmapVisible);
  return (
    <div id="content-area" tabIndex="0" onClick={clickFunc} onKeyDown={keyFunc}>
      <Roadmap roadmap={getDefaultRoadmap()} isVisible={roadmapVisible} />
      <Router>
        <PartView path="/" />
        <ChapterView path="/web" chapter="web" />
        <ChapterView path="/js" chapter="js" />
        <ChapterView path="/node" chapter="node" />
        <ChapterView path="/react" chapter="react" />
      </Router>
    </div>
  );
};

export default TutApp;