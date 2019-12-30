import React from 'react';
import { useDispatch } from 'react-redux';
import ListButtonItem from '../auxiliary/ListButtonItem';
import { pickUpItem } from '../../actions/gameActions';

const LocaleItemList = (props) => {
  const dispatch = useDispatch();
  const pickUp = ind => dispatch(pickUpItem(ind));
  return (
    <div className="inventory-list-area">
      <h5 className="item-list-header inventory-header">{props.localeName.toUpperCase()}</h5>
      <ul className="item-list inventory-list">
        {props.itemList.map((itemButton) => (
          <ListButtonItem   key={itemButton.index}
                            index={itemButton.index}
                            text={itemButton.display}
                            quantity={itemButton.quantity}
                            transitioning={itemButton.transitioning}
                            isPlaceholder={itemButton.isPlaceholder}
                            clickFunc={(ind) => pickUp(ind)}/>
        ))}
      </ul>
    </div>
  );
};

export default LocaleItemList;