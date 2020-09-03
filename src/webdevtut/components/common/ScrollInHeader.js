import React from 'react';
import { animated, useSpring } from "react-spring";
import PropTypes from 'prop-types';
import clientSettings from '../../util/clientSettings';

const xTrans = x => `translateX(${x}px)`;

const ScrollInHeader = props => {
  const [anim, set] = useSpring(() => ({
    marginLeft: props.extraMargin && !props.fromRight ? `${props.extraMargin}rem` : '',
    marginRight: props.extraMargin && props.fromRight ? `${props.extraMargin}rem` : '',
    background: props.background || '',
    fontSize: props.fontSize ? `${props.fontSize}rem` : '',
    opacity: 0,
    textAlign: props.fromRight ? 'right' : 'left',
    x: props.fromRight ? clientSettings.width + 800 : -800,
    config: {
      mass: 1,
      tension: 820,
      friction: 200
    }
  }));
  set({
    delay: props.delay || 0,
    opacity: 1,
    x: 0
  });
  return (
    <animated.h2 className="scroll-header" style={{...anim, transform: anim.x.interpolate(xTrans)}}>{props.text}</animated.h2>
  );
};

ScrollInHeader.propTypes = {
  background: PropTypes.string,
  delay: PropTypes.number,
  extraMargin: PropTypes.number,
  fromRight: PropTypes.bool,
  fontSize: PropTypes.number,
  text: PropTypes.string
};

export default ScrollInHeader;