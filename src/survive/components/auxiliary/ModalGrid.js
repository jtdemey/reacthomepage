import React from 'react';
import { pickUpItem } from '../../actions/uiActions';

class ModalGrid extends React.Component {
  constructor(props) {
    super(props);
    this.modalRef = null;
    this.animationFrames = null;
  }

  getCss() {
    let css = 'modal-grid';
    if(this.props.modalMode === 1) {
      css += ' item-info-modal';
    } else if(this.props.modalMode === 2) {
      css += ' combat-modal';
    }
    if(this.props.transitioning === 'in') {
      css += ' fadein-slidein';
    } else if(this.props.transitioning === 'out') {
      css += ' fadeout-slideout';
    }
    return css;
  }

  getStyle() {
    const look = {
      'width': `${this.props.clientWidth - 40}px`,
      'height': `${this.props.clientHeight - 40}px`
    };
    return look;
  }

  render() {
    let css = this.getCss();
    const look = this.getStyle();
    return (
      <div className={css} style={look} ref={el => this.modalRef = el} onClick={(e) => { e.stopPropagation(); }}>
        
      </div>
    );
  }
}

export default ModalGrid;