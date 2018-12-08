import React from 'react';
import { connect } from 'react-redux';
import { submitCommand } from '../actions/surviveActions';

const mapStateToProps = (state, ownProps) => {
  return {
    lastInput: state.ui.lastInput
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitCommand: (inp) => {
      dispatch(submitCommand(inp));
    }
  };
};

class CommandBar extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.getFocused = this.getFocused.bind(this);
    this.state = {
      currentInput: ''
    };
  }

  componentDidMount() {
    this.getFocused();
  }

  getFocused() {
    this.textInput.current.focus();
  }

  onKeyPress(key) {
    if(key.key === 'Enter') {
      this.props.submitCommand(this.state.currentInput);
      this.setState({
        currentInput: ''
      });
    }
  }

  updateInput(inp) {
    this.setState({
      currentInput: inp
    });
  }

  render() {
    return (
      <div className="command-bar">
          <input  type="text"
                  ref={this.textInput}
                  value={this.state.currentInput}
                  className="user-input"
                  placeholder=">>"
                  onChange={(inp) => this.updateInput(inp.target.value)}
                  onKeyPress={(e) => this.onKeyPress(e)}
                  onClick={this.getFocused} />
      </div>
    );
  }
}

const CommandBarCon = connect(mapStateToProps, mapDispatchToProps)(CommandBar);

export default CommandBarCon;