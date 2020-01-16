import React from 'react';
import { connect } from 'react-redux';
import { viewConstants } from '../../app/imposterConstants';
import {
  changeGameView,
  toggleModal
} from '../../actions/uiActions';
import {
  exitToMainMenu,
  getThemeColors
} from '../../app/imposterUtilities';

const mapStateToProps = state => {
  return {
    gameInSession: state.game.gameInSession,
    socketId: state.game.socketId,
    theme: state.ui.theme
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeGameView: viewInd => {
      dispatch(changeGameView(viewInd));
    },
    toggleModal: modalInd => {
      dispatch(toggleModal(modalInd));
    }
  };
};

class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const look = getThemeColors(this.props.theme);
    return (
      <div className="nav-area" style={{background:look.secondary}}>
        <ul className="nav-list">
          <li onClick={this.props.gameInSession ? () => exitToMainMenu()
                                                : () => this.props.changeGameView(viewConstants.MAIN_MENU)}>Home</li>
          <li id="rules-link" onClick={() => this.props.toggleModal(1)}>Rules</li>
          <li id="settings-link" onClick={() => this.props.toggleModal(2)}>Settings</li>
          <li onClick={() => exitToMainMenu()}>Exit</li>
        </ul>
      </div>
    );
  }
}

const NavBarCon = connect(mapStateToProps, mapDispatchToProps)(NavBar);

export default NavBarCon;
