import React from 'react';

const MapGridItem = (props) => {
  const css = {
    color: props.color
  };
  return (
    <div className="map-grid-item" style={{css}}>
      <h5 className="mgi-title">
        {props.display}
      </h5>
    </div>
  );
};

export default MapGridItem;