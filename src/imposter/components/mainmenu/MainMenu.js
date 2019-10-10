import React from 'react';
import { connect } from 'react-redux';
import ListButtonItem from '../auxiliary/ListButtonItem';
import { viewConstants } from '../../app/imposterConstants';
import { changeGameView } from '../../actions/uiActions';
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

const mapDispatchToProps = dispatch => {
  return {
    changeGameView: viewInd => {
      dispatch(changeGameView(viewInd));
    }
  };
};

class MainMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  getLook() {
    const look = getThemeColors(this.props.theme);
    return {
      background: look.highlight
    };
  }

  render() {
    const fade = getFadeState(this.props.isFadingIn, this.props.isFadingOut, viewConstants.MAIN_MENU) || '';
    return (
      <div className={`main-menu${fade}`}>
        <div className="start-game-list">
          <ListButtonItem text="Host Game"
                          otherClasses="mm-lbi"
                          look={this.getLook()}
                          clickFunc={() => this.props.changeGameView(viewConstants.HOST_GAME_FORM)} />
          <ListButtonItem text="Join Game"
                          otherClasses="mm-lbi"
                          look={this.getLook()}
                          clickFunc={() => this.props.changeGameView(viewConstants.JOIN_GAME_FORM)} />
        </div>
      </div>
    );
  }
}

const MainMenuCon = connect(mapStateToProps, mapDispatchToProps)(MainMenu);

export default MainMenuCon;
