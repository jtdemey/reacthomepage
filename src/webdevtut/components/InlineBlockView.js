import React from 'react';
import PropTypes from 'prop-types';

const InlineBlockView = props => {
  return (
    <ul>
      {props.items.map((item, i) => (
        <li key={i}>{item.content}</li>
      ))}
    </ul>
  );
};

InlineBlockView.propTypes = {
  items: PropTypes.array
};

export default InlineBlockView;