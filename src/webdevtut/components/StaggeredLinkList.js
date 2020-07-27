import React from 'react';
import { animated, useSprings } from "react-spring";
import { Link } from '@reach/router';
import PropTypes from 'prop-types';
import HoverSpan from './HoverSpan';

const StaggeredLinkList = props => {
  const [springs, set] = useSprings(props.listItems.length, () => ({
    opacity: 0,
    marginLeft: '-2rem'
  }));
  set(i => ({opacity: 1, marginLeft: '2rem', delay: i * 50}));
  return (
    <ul className="staggered-list">
      {springs.map((anim, i) => (
        <animated.li key={i} style={anim}>
          <animated.span style={anim}>{i + 1}.</animated.span>
          <Link to={`${props.baseUri}/${i + 1}`}>
            <HoverSpan clickFunc={props.linkClickFunc ? () => props.linkClickFunc() : () => { return false; }} fromColor="#cececc" toColor={props.spanColor} text={props.listItems[i]} />
          </Link>
        </animated.li>
      ))}
    </ul>
  );
};

StaggeredLinkList.propTypes = {
  baseUri: PropTypes.string,
  linkClickFunc: PropTypes.func,
  listItems: PropTypes.array,
  spanColor: PropTypes.string
};

export default StaggeredLinkList;