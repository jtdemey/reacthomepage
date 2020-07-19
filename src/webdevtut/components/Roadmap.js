import React from 'react';
import { animated, useSpring } from 'react-spring';

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
  const { left, shadowLength } = useSpring({
    left: props.isVisible ? 0 : -20,
    shadowLength: props.isVisible ? 1 : 0
  });
  return (
    <animated.nav style={{
      left: left.interpolate(l => `${l}rem`),
      boxShadow: shadowLength.interpolate(s => `#111 ${s}rem ${s}rem ${s}rem`)
    }}>
      {renderRoadmap(props.roadmapIndex, props.roadmap)}
    </animated.nav>
  );
};

export default Roadmap;