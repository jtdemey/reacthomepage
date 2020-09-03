
import React from 'react';
import PropTypes from 'prop-types';
import { animated, useSpring } from 'react-spring';

const HoverSpan = props => {
  const [spring, set] = useSpring(() => ({color: props.fromColor}));
  return (
    <animated.span onClick={props.clickFunc ? () => props.clickFunc() : () => { return false; }} onMouseLeave={() => set({color: props.fromColor})} onMouseOver={() => set({color: props.toColor})} style={spring}>{props.text}</animated.span>
  );
};

HoverSpan.propTypes = {
  clickFunc: PropTypes.func,
  fromColor: PropTypes.string,
  toColor: PropTypes.string,
  text: PropTypes.string
};

export default HoverSpan;