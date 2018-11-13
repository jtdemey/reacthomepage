import React from 'react';

const mapDispatchToProps = dispatch => {
  return 
};

const ViewButton = (props) => {
  let c = 'view-btn console-btn';
  let s = '../media/tabicon1.svg';
  if(props.type === 'inventory') {
    c = 'view-btn inventory-btn';
    s = '../media/tabicon2.svg';
  } else if(props.type === 'map') {
    c = 'view-btn map-btn';
    s = '../media/tabicon3.svg';
  } else if(props.type === 'status') {
    c = 'view-btn status-btn';
    s = '../media/tabicon4.svg';
  }
  return (
    <div className={c}>
      <img className="view-btn-icon" src={s} />
    </div>
  );
};

export default ViewButton;