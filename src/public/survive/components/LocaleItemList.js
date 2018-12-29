import React from 'react';
import { connect } from 'react-redux';
import ListButtonItem from './ListButtonItem';

const mapStateToProps = (state, ownProps) => {
  return {
    display: state.player.locale.display,
    items: state.player.locale.items
  };
};

const LocaleItemList = (props) => {
  return (
    <div className="inventory-list-area">
      <h5 className="item-list-header inventory-header">{props.display}</h5>
      <ul className="item-list inventory-list">
        {props.items.map((item) => (
          <ListButtonItem key={item.itemId} text={item.display} />
        ))}
      </ul>
    </div>
  );
};

const LocaleItemListCon = connect(mapStateToProps)(LocaleItemList);

export default LocaleItemListCon;