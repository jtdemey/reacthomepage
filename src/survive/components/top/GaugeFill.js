import React from 'react';

const GaugeFill = (props) => {
  const fillAmt = props.amount / 5 + 1;
  return (
    <div className={`gauge-fill-area ${props.type}-fill-area`}>
      <div className={`gauge-fill ${props.type}-fill`} style={{gridColumnEnd: fillAmt}}></div>
    </div>
  );
};

export default GaugeFill;