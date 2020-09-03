import React from 'react';
import { animated, useSpring } from 'react-spring';
import PropTypes from 'prop-types';

const yTrans = x => `translateY(${x}px)`;

const TextTile = props => {
  const [bgAnim, setBgAnim] = useSpring(() => ({
    xy: [0, 800],
    y: 400,
    background: props.background || '',
    fontSize: props.fontSize ? `${props.fontSize}rem` : '',
    opacity: 0.0,
    config: {
      mass: 1,
      tension: 1020,
      friction: 200
    }
  }));
  setBgAnim({
    y: 0,
    delay: props.delay || 0,
    opacity: 1
  });
  const [textAnim, setTextAnim] = useSpring(() => ({
    fontSize: props.fontSize ? `${props.fontSize}rem` : '',
    opacity: 0,
    y: 300,
    config: {
      mass: 3,
      tension: 820,
      friction: 30
    }
  }));
  setTextAnim({
    delay: (props.delay || 0) + 100,
    opacity: 1,
    y: 0
  });
  return (
    <div className="text-tile">
      <animated.div style={{...bgAnim, transform: bgAnim.y.interpolate(yTrans)}}>
        <animated.h3 style={{...textAnim, transform: textAnim.y.interpolate(yTrans)}}>{props.text}</animated.h3>
      </animated.div>
    </div>
  );
};

TextTile.propTypes = {
  background: PropTypes.string,
  delay: PropTypes.number,
  fontSize: PropTypes.number,
  text: PropTypes.string
};

export default TextTile;