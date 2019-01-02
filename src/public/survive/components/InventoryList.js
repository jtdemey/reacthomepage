import React from 'react';
import ListButtonItem from './ListButtonItem';

const InventoryList = (props) => {
  return (
    <div className="inventory-list-area">
      <h5 className="item-list-header inventory-header">INVENTORY</h5>
      <ul className="item-list inventory-list">
        {props.itemList.map((itemButton) => (
          <ListButtonItem key={itemButton.index} index={itemButton.index} text={itemButton.display} transitioning={itemButton.transitioning} />
        ))}
      </ul>
    </div>
  );
};

export default InventoryList;