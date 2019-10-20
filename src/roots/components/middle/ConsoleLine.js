import React from 'react';

const ConsoleLine = (props) => (
  <li className="console-line" style={{ bottom: `${props.ypos}px`, opacity: props.opacity }}>
    {props.text}
  </li>
);

export default ConsoleLine;