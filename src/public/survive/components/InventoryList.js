import React from 'react';
import { connect } from 'react-redux';
import ListButtonItem from './ListButtonItem';

const mapStateToProps = (state, ownProps) => {
  return {
    items: state.player.items
  };
};

const InventoryList = (props) => {
  return (
    <div className="inventory-list-area">
      <h5 className="inventory-header">INVENTORY</h5>
      <ul className="inventory-list">
        {props.items.map((item) => (
          <ListButtonItem key={item.itemId} text={item.display} />
        ))}
      </ul>
    </div>
  );
};

const InventoryListCon = connect(mapStateToProps)(InventoryList);

export default InventoryListCon;