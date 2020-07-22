import React from 'react';
import { useSprings } from "react-spring";
import PropTypes from 'prop-types';

const StaggeredList = props => {
  const springs = useSprings(props.listItems.length, index => ({
    delay: index * 200,
    opacity: 1
  }));
  return (
    <ul className="staggered-list">
      {props.listItems.map((listItem, i) => (
        <li key={i} style={{opacity: springs[i].opacity}}>{listItem}</li>
      ))}
    </ul>
  );
};

StaggeredList.propTypes = {
  listItems: PropTypes.array
};

export default StaggeredList;