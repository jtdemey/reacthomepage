import React from 'react';
import ConsoleLine from './ConsoleLine';

const ConsoleList = (props) => {
  const look = {
    width: props.clientWidth + 'px',
    height: '3000px',
    top: (props.consoleYpos + props.clientHeight - 32) + 'px'
  };
  return (
    <div className="line-list-area" style={{ width: props.clientWidth + 'px', height: (props.clientHeight - 32) + 'px' }}>
      <ul className="line-list" style={look} >
        {props.consoleLines.map((line) => (
          <ConsoleLine key={line.id} text={line.text} color={line.color} />
        ))}
      </ul>
    </div>
  );
};

export default ConsoleList;