import React from 'react';
import { connect } from 'react-redux';
import PopupMessage from './auxiliary/PopupMessage';
import BannerArea from './navbar/BannerArea';
import NavBar from './navbar/NavBar';
import MainMenu from './mainmenu/MainMenu';
import HostGameForm from './mainmenu/HostGameForm';
import JoinGameForm from './mainmenu/JoinGameForm';
import LoadingView from './auxiliary/LoadingView';
import LobbyView from './lobby/LobbyView';
import GameView from './ingame/GameView';
import EndgameView from './ingame/EndgameView';
import ModalArea from './auxiliary/ModalArea';
import { viewConstants } from '../app/imposterConstants';
import { getThemeColors } from '../app/imposterUtilities';

const mapStateToProps = state => {
  return {
    theme: state.ui.theme,
    view: state.ui.view
  };
};

class ImposterApp extends React.Component {
  constructor(props) {
    super(props);
  }

  getGameView() {
    switch(this.props.view) {
      case viewConstants.MAIN_MENU:
        return <MainMenu />;
      case viewConstants.HOST_GAME_FORM:
        return <HostGameForm />;
      case viewConstants.JOIN_GAME_FORM:
        return <JoinGameForm />; 
      case viewConstants.LOBBY:
        return <LobbyView />;
      case viewConstants.IN_GAME:
        return <GameView />;
      case viewConstants.TIME_EXPIRED:
        return <EndgameView title="Time's up!" viewId={this.props.view} />;
      case viewConstants.IMPOSTER_VICTORY:
        return <EndgameView title="The Imposter Wins!" viewId={this.props.view} />;
      case viewConstants.BYSTANDER_VICTORY:
        return <EndgameView title="The Bystanders Win!" viewId={this.props.view} />;
      case viewConstants.LOADING:
        return <LoadingView />;
      default:
        return <div></div>; //loading wheel?
    }
  }

  getLook() {
    const look = getThemeColors(this.props.theme);
    return {
      background: look.primary
    };
  }

  render() {
    return (
      <div className="imposter-gameview" style={this.getLook()}>
        <PopupMessage />
        <BannerArea />
        <ModalArea />
        <NavBar></NavBar>
        {this.getGameView()}
      </div>
    );
  }
}

const ImposterAppCon = connect(mapStateToProps)(ImposterApp);

export default ImposterAppCon;