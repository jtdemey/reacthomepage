import React from 'react';
import { animated, useSpring } from "react-spring";
import { Link } from '@reach/router';
import PropTypes from 'prop-types';
import clientSettings from '../util/clientSettings';

const calc = (x, y) => [-(y - clientSettings.height / 2) / 20, (x - clientSettings.width / 2) / 20, 1.2];
const trans = (x, y, s) => `perspective(800px) rotateX(${x}deg) rotateY(${y / 2}deg) scale(${s})`;
const getClasses = props => props.cssClasses.length ? `link-card` + props.cssClasses.map(c => ` ${c}`) : 'link-card';
const getUnshaded = props => `linear-gradient(135deg, ${props.bgColors[0]}, ${props.bgColors[0]})`;
const getShaded = props => `linear-gradient(135deg, ${props.bgColors[0]}, ${props.bgColors[1]})`;

const LinkCard = props => {
  const [transSpring, set] = useSpring(() => ({
    background: getUnshaded(props),
    xys: [0, 0, 1]
  }));
  return (
    <Link to={props.linkUri}>
      <animated.div
        className={getClasses(props)}
        onClick={props.clickFunc ? () => props.clickFunc() : () => { return false; }}
        onMouseMove={({clientY: y}) => set({background: getShaded(props), xys: calc(clientSettings.width / 2, y)})}
        onMouseLeave={() => set({background: getUnshaded(props), xys: [0, 0, 1]})}
        style={{background: transSpring.background, transform: transSpring.xys.interpolate(trans)}}>
          <h6>{props.header}</h6>
          <h3>{props.text}</h3>
      </animated.div>
    </Link>
  );
};

LinkCard.propTypes = {
  bgColors: PropTypes.array,
  clickFunc: PropTypes.func,
  cssClasses: PropTypes.array,
  header: PropTypes.string,
  linkUri: PropTypes.string,
  text: PropTypes.string
};

export default LinkCard;