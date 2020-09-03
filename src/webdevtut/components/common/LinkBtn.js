import React from 'react';
import { animated, useSpring } from 'react-spring';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';

const yTrans = x => `translateY(${x}px)`;

const LinkBtn = props => {
  const [anim, set] = useSpring(() => ({
    xy: [0, 800],
    y: 200,
    background: props.background || '',
    fontSize: props.fontSize ? `${props.fontSize}rem` : '',
    opacity: 0.0,
    config: {
      mass: 1,
      tension: 500,
      friction: 180 
    }
  }));
  set({
    y: 0,
    delay: props.delay || 0,
    opacity: 1
  });
  const mouseEnter = () => set({opacity: 0.8, y: -3});
  const mouseLeave = () => set({opacity: 1, y: 0});
  return (
    <Link to={props.href}>
      <animated.button className="link-btn"
                       style={{...anim, transform: anim.y.interpolate(yTrans)}}
                       onMouseOver={() => mouseEnter()}
                       onMouseLeave={() => mouseLeave()}>
        {props.text}
      </animated.button>
    </Link>
  );
};

LinkBtn.propTypes = {
  background: PropTypes.string,
  delay: PropTypes.number,
  fontSize: PropTypes.number,
  href: PropTypes.string,
  text: PropTypes.string
};

export default LinkBtn;