import React, { useState } from 'react';
import Roadmap from './Roadmap';
import TitleSplash from './TitleSplash';

const getView = view => {
  if(view === undefined) {
    console.error('no view ' + view);
    return;
  }
  const p = view.props ? {...view.props} : false;
  switch(view.viewName) {
    case 'TitleSplash':
      return <TitleSplash {...p} />;
    default:
      return <div></div>;
  }
};

const iterateView = (e, currView, setView) => {
  if(e.keyCode === 39 || e.keyCode === 32) {
    setView(currView + 1);
  } else if(e.keyCode === 37) {
    setView(currView - 1);
  }
  return false;
};

const TutApp = props => {
  const [viewIndex, setViewIndex] = useState(0);
  return (
    <div id="content-area" tabIndex="0" onKeyDown={e => iterateView(e, viewIndex, setViewIndex)}>
      <Roadmap roadmap={props.scene.roadmap} viewIndex={viewIndex} />
      {getView(props.scene.views[viewIndex])}
    </div>
  );
};

export default TutApp;