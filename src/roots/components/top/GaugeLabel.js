import React from 'react';

const GaugeLabel = (props) => {
  return (
    <div className="gauge-label-area">
      <h4 className="gauge-label">{props.text}</h4>
    </div>
  );
};

export default GaugeLabel;