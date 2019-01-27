import React from 'react';
import TimelineMax from 'gsap/TimelineMax';
import { pickUpItem } from '../actions/uiActions';

class ModalGrid extends React.Component {
  constructor(props) {
    super(props);
    this.modalRef = null;
    this.animationFrames = null;
  }

  render() {
    let css = 'info-modal';
    if(this.props.transitioning === 'in') {
      css = 'info-modal fadein-slidein';
    } else if(this.props.transitioning === 'out') {
      css = 'info-modal fadeout-slideout';
    }
    const look = {
      'width': `${this.props.clientWidth - 40}px`,
      'height': `${this.props.clientHeight - 40}px`
    };
    return (
      <div className={css} style={look} ref={el => this.modalRef = el} onClick={(e) => { e.stopPropagation(); }}>
        
      </div>
    );
  }
}

export default ModalGrid;