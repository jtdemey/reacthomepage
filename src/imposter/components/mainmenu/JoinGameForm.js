import React from 'react';
import { connect } from 'react-redux';
import { submitJoinGameForm } from '../../actions/gameActions';
import { viewConstants } from '../../app/imposterConstants';
import {
  getFadeState,
  getThemeColors
} from '../../app/imposterUtilities';

const mapStateToProps = (state, ownProps) => {
  return {
    socketId: state.game.socketId,
    isFadingIn: state.ui.isFadingIn,
    isFadingOut: state.ui.isFadingOut,
    theme: state.ui.theme
  };
};

const mapDispatchToProps = dispatch => {
  return {
    submitJoinGameForm: (sockId, name, gameCode) => {
      dispatch(submitJoinGameForm(sockId, name, gameCode));
    }
  };
};

class JoinGameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameVal: '',
      gcVal: ''
    };
  }

  updateNameVal(e) {
    this.setState({
      nameVal: e
    });
  }

  updateGcVal(e) {
    this.setState({
      gcVal: e
    });
  }

  submitJoinGameForm(e) {
    e.preventDefault();
    this.props.submitJoinGameForm(this.props.socketId, this.state.nameVal, this.state.gcVal);
  }

  getLook() {
    const look = getThemeColors(this.props.theme);
    return {
      background: look.highlight
    };
  }

  render() {
    const fade = getFadeState(this.props.isFadingIn, this.props.isFadingOut, viewConstants.JOIN_GAME_FORM) || '';
    return (
      <div className={`mm-form-area join-game-form${fade}`}>
        <form name="form-join" className="mm-form form-join" onSubmit={e => this.submitJoinGameForm(e)}>
          <h4>Join Game</h4>
          <input  type="text"
                  value={this.state.value}
                  onChange={i => this.updateNameVal(i.target.value)}
                  className="mm-form-text-input"
                  placeholder="&nbsp;&nbsp;Your name" />
          <input  type="text"
                  value={this.state.value}
                  onChange={i => this.updateGcVal(i.target.value)}
                  className={this.state.gcVal.length > 0 ? 'mm-form-text-input gc-form-input' : 'mm-form-text-input'}
                  placeholder="&nbsp;&nbsp;Game code" />
          <input  type="submit"
                  value="Start"
                  className="mm-form-submit"
                  style={this.getLook()} />
        </form>
      </div>
    );
  }
}

const JoinGameFormCon = connect(mapStateToProps, mapDispatchToProps)(JoinGameForm);

export default JoinGameFormCon;