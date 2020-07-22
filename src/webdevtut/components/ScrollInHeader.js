import React from 'react';
import { animated, useSpring } from "react-spring";
import PropTypes from 'prop-types';

const ScrollInHeader = props => {
  const [anim, set] = useSpring(() => ({
    fontSize: props.fontSize ? `${props.fontSize}rem` : '6rem',
    margin: props.fromRight ? `1rem -20rem 1rem 1rem` : `1rem 1rem 1rem -20rem`,
    opacity: 0,
    textAlign: props.fromRight ? 'right' : 'left',
    config: {
      mass: 1,
      tension: 820,
      friction: 200
    }
  }));
  set({
    margin: props.fromRight ? `1rem ${1 + (props.extraMargin || 0)}rem 1rem 1rem` : `1rem 1rem 1rem ${1 + (props.extraMargin || 0)}rem`, 
    opacity: 1
  });
  return (
    <animated.h2 className="scroll-header" style={anim}>{props.text}</animated.h2>
  );
};

ScrollInHeader.propTypes = {
  extraMargin: PropTypes.number,
  fromRight: PropTypes.bool,
  fontSize: PropTypes.number,
  text: PropTypes.string
};

export default ScrollInHeader;