import React from 'react';
import { useSpring, animated } from 'react-spring';

const TitleSplash = props => {
  const anim = useSpring({
    from: {
      height: 0,
      color: 'rgba(206, 206, 204, 0.0)'
    },
    to: {
      height: 560,
      color: 'rgba(206, 206, 204, 1.0)'
    },
    config: {
      mass: 1,
      tension: 320,
      friction: 100
    }
  });
  return (
    <div id="title-splash">
      <animated.h1 style={anim}>WEB<br />DEV<br />2020</animated.h1>
    </div>
  );
};

export default TitleSplash;