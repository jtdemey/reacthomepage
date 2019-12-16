import React from 'react';

const renderRoadmap = (currentInd, roadmap) => {
  const getCss = r => {
    let c = 'roadmap-item';
    if(r.level > 0) {
      c += ` nested-${r.level}`;
    }
    if(r.roadmapIndex === currentInd) {
      c += ' focused';
    } else if(r.roadmapIndex > currentInd) {
      c += ' hidden';
    }
    return c;
  };
  return (
    <ul>
      {roadmap.map((e, ind) => (
        <li key={ind} className={getCss(e)}>{e.text}</li>
      ))}
    </ul>
  );
};

const Roadmap = props => {
  return (
    <nav>
      {renderRoadmap(props.roadmapIndex, props.roadmap)}
    </nav>
  );
};

export default Roadmap;