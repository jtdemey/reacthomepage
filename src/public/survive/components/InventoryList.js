import React from 'react';
import { connect } from 'react-redux';
import ListButtonItem from './ListButtonItem';
import { showItemInfoModal } from '../actions/uiActions';

const mapDispatchToProps = (dispatch) => {
  return {
    showItemInfoModal: () => {
      dispatch(showItemInfoModal());
    }
  };
};

const InventoryList = (props) => {
  return (
    <div className="inventory-list-area">
      <h5 className="item-list-header inventory-header">INVENTORY</h5>
      <ul className="item-list inventory-list">
        {props.itemList.map((itemButton) => (
          <ListButtonItem   key={itemButton.index}
                            index={itemButton.index}
                            text={itemButton.display}
                            quantity={itemButton.quantity}
                            transitioning={itemButton.transitioning}
                            isPlaceholder={itemButton.isPlaceholder}
                            clickFunc={() => props.showItemInfoModal()} />
        ))}
      </ul>
    </div>
  );
};

const InventoryListCon = connect(null, mapDispatchToProps)(InventoryList);

export default InventoryListCon;