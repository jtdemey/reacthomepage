import React from 'react';
import { connect } from 'react-redux';
import { viewConstants } from '../../app/imposterConstants';
import {
  getFadeState,
  getThemeColors
} from '../../app/imposterUtilities';

const mapStateToProps = (state, ownProps) => {
  return {
    isFadingIn: state.ui.isFadingIn,
    isFadingOut: state.ui.isFadingOut,
    theme: state.ui.theme
  };
};

class LoadingView extends React.Component {
  constructor(props) {
    super(props);
  }

  getLook() {
    const look = getThemeColors(this.props.theme);
    return {
      borderTop: `2px solid ${look.highlight}`
    };
  }

  render() {
    const fade = getFadeState(this.props.isFadingIn, this.props.isFadingOut, viewConstants.LOADING) || '';
    return (
      <div className={`loading-view${fade}`}>
        <button className="spinny-wheel" style={this.getLook()}></button>
      </div>
    );
  }
}

const LoadingViewCon = connect(mapStateToProps)(LoadingView);

export default LoadingViewCon;
