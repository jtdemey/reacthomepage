import React from 'react';
import { animated, useSpring } from 'react-spring';

const getCss = (r, ind) => {
  let c = 'roadmap-item';
  if(r.level > 0) {
    c += ` nested-${r.level}`;
  }
  if(r.roadmapIndex === ind) {
    c += ' focused';
  } else if(r.roadmapIndex > ind) {
    c += ' hidden';
  }
  return c;
};

const renderRoadmap = (currentInd, roadmap) => {
  return (
    <ul>
      {roadmap.map((e, ind) => (
        <li key={ind} className={getCss(e, currentInd)}>{e.text}</li>
      ))}
    </ul>
  );
};

const Roadmap = props => {
  const { marginLeft, shadowLength } = useSpring({
    marginLeft: props.isVisible ? 0 : -24,
    shadowLength: props.isVisible ? 1 : 0
  });
  return (
    <animated.nav style={{
      marginLeft: marginLeft.interpolate(l => `${l}rem`),
      boxShadow: shadowLength.interpolate(s => `#111 ${s}rem ${s}rem 8px`)
    }}>
      {renderRoadmap(props.roadmapIndex, props.roadmap)}
      <button id="roadmap-btn"></button>
    </animated.nav>
  );
};

export default Roadmap;