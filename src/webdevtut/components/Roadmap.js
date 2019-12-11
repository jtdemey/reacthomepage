import React from 'react';

const renderRoadmap = roadmap => {
  const getCss = r => r.level > 0 ? `roadmap-item nested-${r.level}` : 'roadmap-item';
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
      {renderRoadmap(props.roadmap)}
    </nav>
  );
};

export default Roadmap;