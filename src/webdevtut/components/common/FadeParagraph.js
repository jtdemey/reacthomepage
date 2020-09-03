import React from 'react';
import { animated, useSpring } from "react-spring";
import PropTypes from 'prop-types';

const yTrans = y => `translateY(${y}px)`;

const FadeParagraph = props => {
  const [anim, set] = useSpring(() => ({
    background: props.background || '',
    fontSize: props.fontSize ? `${props.fontSize}rem` : '',
    opacity: 0,
    textAlign: props.centered ? 'center' : 'left',
    y: 200,
    config: {
      mass: 1.2,
      tension: 920,
      friction: 180
    }
  }));
  set({
    delay: props.delay || 0,
    opacity: 1,
    y: 0
  });
  return (
    <animated.p className="fade-paragraph" style={{...anim, transform: anim.y.interpolate(yTrans)}}>
      {props.text}
    </animated.p>
  );
};

FadeParagraph.propTypes = {
  centered: PropTypes.bool,
  background: PropTypes.string,
  delay: PropTypes.number,
  fontSize: PropTypes.number,
  text: PropTypes.string
};

export default FadeParagraph;