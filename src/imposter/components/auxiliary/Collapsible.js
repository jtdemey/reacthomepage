import React from 'react';

const Collapsible = props => (
  <div className="collapsible-area">
    <h2 className="collapsible-title">{props.title}</h2>
    <div className="collapsible-content">
      {props.content}
    </div>
  </div>
);

export default Collapsible;