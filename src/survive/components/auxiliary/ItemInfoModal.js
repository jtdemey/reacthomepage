import React from 'react';
import { useSelector } from 'react-redux';
import ModalButton from './ModalButton';
import SvgSprite from './SvgSprite';

const getIimCss = props => {
  let css = 'modal-grid item-info-modal';
  if(props.transitioning === 'in') {
    css += ' fadein-slidein';
  } else if(props.transitioning === 'out') {
    css += ' fadeout-slideout';
  }
  return css;
};

const getIimStyle = props => ({
  display: props.isVisible === true ? `grid` : `none`,
  width: `${props.clientWidth - 40}px`,
  height: `${props.clientHeight - 40}px`
});

const ItemInfoModal = props => {
  const state = useSelector(state => {
    return {
      iimTitle: state.ui.iimTitle, 
      iimDesc: state.ui.iimDesc,
      iimBtns: state.ui.iimBtns
    };
  });
  return (
    <div className={getIimCss(props)} style={getIimStyle(props)} onClick={e => { e.stopPropagation(); }}>
      <div className="iim-title-area">
        <h2 className="iim-title">
          {state.iimTitle}
        </h2>
      <SvgSprite fileName="/img/placeholder.svg" />
      </div>
      <div className="iim-desc-area">
        <p className="iim-desc">
          {state.iimDesc}
        </p>
      </div>
      <div className="iim-btns-area">
        <div className="iim-btns">
          {state.iimBtns.map(btn => (
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
};

export default ItemInfoModal;