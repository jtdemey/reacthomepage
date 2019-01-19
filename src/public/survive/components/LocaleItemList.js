import React from 'react';
import { connect } from 'react-redux';
import ListButtonItem from './ListButtonItem';
import { pickUpItem } from '../actions/uiActions';

const mapDispatchToProps = (dispatch) => {
  return {
    pickUpItem: (ind) => {
      dispatch(pickUpItem(ind));
    }
  };
};

const LocaleItemList = (props) => {
  return (
    <div className="inventory-list-area">
      <h5 className="item-list-header inventory-header">{props.localeName}</h5>
      <ul className="item-list inventory-list">
        {props.itemList.map((itemButton) => (
          <ListButtonItem   key={itemButton.index}
                            index={itemButton.index}
                            text={itemButton.display}
                            transitioning={itemButton.transitioning}
                            isPlaceholder={itemButton.isPlaceholder}
                            clickFunc={(ind) => props.pickUpItem(ind)}/>
        ))}
      </ul>
    </div>
  );
};

const LocaleItemListCon = connect(null, mapDispatchToProps)(LocaleItemList);

export default LocaleItemListCon;