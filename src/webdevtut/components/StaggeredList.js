import React from 'react';
import { animated, useSprings } from "react-spring";
import PropTypes from 'prop-types';

const StaggeredList = props => {
  const [springs, set] = useSprings(props.listItems.length, () => ({
    opacity: 0,
    marginLeft: '-2rem'
  }));
  set(i => ({opacity: 1, marginLeft: '2rem', delay: i * 50}));
  return (
    <ul className="staggered-list">
      {springs.map((anim, i) => (
        <animated.li key={i} style={anim}>{props.listItems[i]}</animated.li>
      ))}
    </ul>
  );
};

StaggeredList.propTypes = {
  listItems: PropTypes.array
};

export default StaggeredList;