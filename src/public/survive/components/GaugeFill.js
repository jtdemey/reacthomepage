import React from 'react';

const GaugeFill = (props) => {
  //Determine fill color
  let look = 'gauge-fill ';
  if(props.type === 'health') {
    look = look + 'health-fill';
  } else if(props.type === 'sanity') {
    look = look + 'sanity-fill';
  } else if(props.type === 'energy') {
    look = look + 'energy-fill';
  }
  return (
    <div className={look}></div>
  );
};

export default GaugeFill;