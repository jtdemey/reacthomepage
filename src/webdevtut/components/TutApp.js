import React, { useState } from 'react';
import { Router } from '@reach/router';
import Roadmap from './Roadmap';
import PartView from './PartView';
import { makeRoad } from '../util/viewHelpers';
import ChapterView from './ChapterView';

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
        <ChapterView path="web/*" part={1} header="Part 1: Web Fundamentals" />
        <ChapterView path="js/*" part={2} header="Part 2: JavaScript" />
        <ChapterView path="node/*" part={3} header="Part 3: Node.js" />
        <ChapterView path="react/*" part={4} header="Part 4: React" />
      </Router>
    </div>
  );
};

export default TutApp;