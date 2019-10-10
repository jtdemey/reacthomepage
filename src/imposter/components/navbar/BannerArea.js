import React from 'react';
import { connect } from 'react-redux';
import { getThemeColors } from '../../app/imposterUtilities';

const mapStateToProps = (state, ownProps) => {
  return {
    theme: state.ui.theme
  };
};

const BannerArea = props => {
  const look = getThemeColors(props.theme);
  return (
    <div className="banner-area" style={{background:look.primary}}>
      <h1 className="banner-text" style={{color:look.highlight}}>IMPOSTER</h1>
    </div>
  );
};

const BannerAreaCon = connect(mapStateToProps)(BannerArea);

export default BannerAreaCon;