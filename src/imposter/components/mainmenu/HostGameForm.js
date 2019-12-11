import React from 'react';
import { connect } from 'react-redux';
import { submitHostGameForm } from '../../actions/gameActions';
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
    submitHostGameForm: (sockId, hostName) => {
      dispatch(submitHostGameForm(sockId, hostName));
    }
  };
};

class HostGameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }
  
  componentDidMount() {
    this.nameInput.focus();
  }

  updateInput(e) {
    this.setState({
      value: e
    });
  }

  submitHostGameForm(e) {
    e.preventDefault();
    this.props.submitHostGameForm(this.props.socketId, this.state.value);
  }

  getLook() {
    const look = getThemeColors(this.props.theme);
    return {
      background: look.highlight
    };
  }

  render() {
    const fade = getFadeState(this.props.isFadingIn, this.props.isFadingOut, viewConstants.HOST_GAME_FORM) || '';
    return (
      <div className={`game-view mm-form-area host-game-form${fade}`}>
        <form name="form-host" className="mm-form form-host" onSubmit={e => this.submitHostGameForm(e)}>
          <h4>Host Game</h4>
          <input  type="text"
                  value={this.state.value}
                  onChange={i => this.updateInput(i.target.value)}
                  className="mm-form-text-input"
                  placeholder="&nbsp;&nbsp;Your name"
                  ref={inp => { this.nameInput = inp; }} />
          <input  type="submit"
                  value="Start"
                  className="mm-form-submit"
                  style={this.getLook()} />
        </form>
      </div>
    );
  }
}

const HostGameFormCon = connect(mapStateToProps, mapDispatchToProps)(HostGameForm);

export default HostGameFormCon;