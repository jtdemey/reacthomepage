import React from 'react';
import { connect } from 'react-redux';
import InventoryList from './InventoryList';
import LocaleItemList from './LocaleItemList';
import { updateItemView } from '../actions/uiActions';

const mapStateToProps = (state, ownProps) => {
  return {
    localeName: state.player.locale,
    localeItemButtons: state.ui.localeItemButtons,
    inventoryItemButtons: state.ui.inventoryItemButtons
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateItemView: () => {
      dispatch(updateItemView())
    }
  };
};

class ItemView extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.updateItemView();
  }

  render() {
    const look = {
      display: this.props.isCurrentView ? 'block' : 'none',
      width: this.props.clientWidth + 'px',
      height: this.props.clientHeight + 'px'
    };
    const cssClass = this.props.isTransitioningOut === true ? 'item-view fadeout-slideout' : 'item-view fadein-slidein';

    return (
      <div className={cssClass} style={look}>
        <LocaleItemList itemList={this.props.localeItemButtons} localeName={this.props.localeName} />
        <InventoryList itemList={this.props.inventoryItemButtons} />
      </div>
    );
  }
}

const ItemViewCon = connect(mapStateToProps, mapDispatchToProps)(ItemView);

export default ItemViewCon;