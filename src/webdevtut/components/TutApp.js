import React, { useState } from 'react';
import Roadmap from './Roadmap';
import TitleSplash from './TitleSplash';
import ImageView from './ImageView';

const getView = view => {
  if(view === undefined) {
    console.error('no view ' + view);
    return;
  }
  const p = view.props ? {...view.props} : false;
  switch(view.viewName) {
    case 'TitleSplash':
      return <TitleSplash {...p} />;
    case 'ImageView':
      return <ImageView images={p.images} />
    default:
      return <div></div>;
  }
};

const handleClick = (roadmapVisible, setRoadmapVisible) => {
  if(roadmapVisible) {
    setRoadmapVisible(false);
  }
};

const handleKey = (e, viewInd, setView, roadmapVisible, setRoadmapVisible, isLast) => {
  console.log(e.keyCode)
  switch(e.keyCode) {
    case 39:
    case 32:
      if(isLast) {
        return false;
      }
      setView(viewInd + 1);
      break;
    case 37:
      setView(viewInd - 1);
      break;
    case 9:
    case 82:
      setRoadmapVisible(!roadmapVisible);
      break;
  }
  return false;
};

const TutApp = props => {
  const [roadmapVisible, setRoadmapVisible] = useState(false);
  const [viewIndex, setViewIndex] = useState(0);
  const isLast = props.scene.views[viewIndex + 1] === undefined;
  const clickFunc = () => handleClick(roadmapVisible, setRoadmapVisible);
  const keyFunc = e => handleKey(e, viewIndex, setViewIndex, roadmapVisible, setRoadmapVisible, isLast);
  return (
    <div id="content-area" tabIndex="0" onClick={clickFunc} onKeyDown={keyFunc}>
      <Roadmap roadmap={props.scene.roadmap} roadmapIndex={props.scene.views[viewIndex].roadmapIndex} isVisible={roadmapVisible} />
      {getView(props.scene.views[viewIndex])}
    </div>
  );
};

export default TutApp;