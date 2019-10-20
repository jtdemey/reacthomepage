import React from 'react';

const GaugeAmount = (props) => {
  return (
    <div className="gauge-amount-area">
      <h4 className="gauge-amount">{props.amount}</h4><br />
    </div>
  );
};

export default GaugeAmount;