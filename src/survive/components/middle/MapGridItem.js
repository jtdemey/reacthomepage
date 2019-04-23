import React from 'react';

const MapGridItem = (props) => {
  const css = {
    color: props.color
  };
  return (
    <div className="map-grid-item" style={{css}}>
      {props.display}
    </div>
  );
};

export default MapGridItem;