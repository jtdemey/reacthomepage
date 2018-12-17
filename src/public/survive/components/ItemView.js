import React from 'react';
import { connect } from 'react-redux';
import InventoryList from './InventoryList';

const mapStateToProps = (state, ownProps) => {
  return {
    consoleLines: state.ui.consoleLines,
    consoleYpos: state.ui.consoleYpos,
    lineIndex: state.ui.lineIndex
  };
};

const ItemView = (props) => {
  const look = {
    display: props.isCurrentView ? 'block' : 'none',
    width: props.clientWidth + 'px',
    height: props.clientHeight + 'px'
  };
  return (
    <div className="item-view" style={look}>
      <InventoryList />
    </div>
  );
};

const ItemViewCon = connect(mapStateToProps)(ItemView);

export default ItemViewCon;