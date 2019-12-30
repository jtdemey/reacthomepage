import React from 'react';
import { connect } from 'react-redux';
import { pickUpItem } from '../../actions/uiActions';
import ModalButton from './ModalButton';
import SvgSprite from './SvgSprite';

const mapStateToProps = (state, ownProps) => {
  return {
    iimTitle: state.ui.iimTitle, //iim = item info modal
    iimDesc: state.ui.iimDesc,
    iimBtns: state.ui.iimBtns
  };
};

class ItemInfoModal extends React.Component {
  constructor(props) {
    super(props);
    this.modalRef = null;
    this.animationFrames = null;
  }

  getCss() {
    let css = 'modal-grid item-info-modal';
    if(this.props.transitioning === 'in') {
      css += ' fadein-slidein';
    } else if(this.props.transitioning === 'out') {
      css += ' fadeout-slideout';
    }
    return css;
  }

  getStyle() {
    const look = {
      display: this.props.isVisible === true ? `grid` : `none`,
      width: `${this.props.clientWidth - 40}px`,
      height: `${this.props.clientHeight - 40}px`
    };
    return look;
  }

  render() {
    const css = this.getCss();
    const look = this.getStyle();
    return (
      <div className={css} style={look} ref={el => this.modalRef = el} onClick={e => { e.stopPropagation(); }}>
        <div className="iim-title-area">
          <h2 className="iim-title">
            {this.props.iimTitle}
          </h2>
        <SvgSprite fileName="/img/placeholder.svg" />
        </div>
        <div className="iim-desc-area">
          <p className="iim-desc">
            {this.props.iimDesc}
          </p>
        </div>
        <div className="iim-btns-area">
          <div className="iim-btns">
            {this.props.iimBtns.map(btn => (
              <ModalButton
                key={btn.index}
                index={btn.index}
                display={btn.display}
                onClick={btn.onClick} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const ItemInfoModalCon = connect(mapStateToProps)(ItemInfoModal);

export default ItemInfoModalCon;
