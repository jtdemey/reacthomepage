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

const iterateView = (e, viewInd, setView, currView) => {
  if(e.keyCode === 39 || e.keyCode === 32) {
    if(!currView) {
      return false;
    }
    setView(viewInd + 1);
  } else if(e.keyCode === 37) {
    setView(viewInd - 1);
  }
  return false;
};

const TutApp = props => {
  const [viewIndex, setViewIndex] = useState(0);
  return (
    <div id="content-area" tabIndex="0" onKeyDown={e => iterateView(e, viewIndex, setViewIndex, props.scene.views[viewIndex + 1])}>
      <Roadmap roadmap={props.scene.roadmap} roadmapIndex={props.scene.views[viewIndex].roadmapIndex} />
      {getView(props.scene.views[viewIndex])}
    </div>
  );
};

export default TutApp;