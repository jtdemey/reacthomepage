import React from 'react';
import { connect } from 'react-redux';
import { viewConstants } from '../app/imposterConstants';
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
      case viewConstants.IMPOSTER_VICTORY:
        return <EndgameView title="The Imposter Wins!" />;
      case viewConstants.BYSTANDER_VICTORY:
        return <EndgameView title="The Bystanders Win!" />;
      case viewConstants.LOADING:
        return <LoadingView />;
      default:
        return null; //loading wheel?
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