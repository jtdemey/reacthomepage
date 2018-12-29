import React from 'react';
import { connect } from 'react-redux';
import InventoryList from './InventoryList';
import LocaleItemList from './LocaleItemList';

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
  const cssClass = props.isTransitioningOut === true ? 'item-view fadeout-slideout' : 'item-view fadein-slidein';

  return (
    <div className={cssClass} style={look}>
      <LocaleItemList />
      <InventoryList />
    </div>
  );
};

const ItemViewCon = connect(mapStateToProps)(ItemView);

export default ItemViewCon;