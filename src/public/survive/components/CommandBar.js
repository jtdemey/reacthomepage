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
    setUserInput: (inp) => {
      dispatch(setUserInput(inp));
    }
  };
};

class CommandBar extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.getFocused = this.getFocused.bind(this);
  }

  componentDidMount() {
    this.getFocused();
  }

  getFocused() {
    this.textInput.current.focus();
  }

  onKeyPress(key) {
    if(key.key === 'Enter') {
      console.log(this.textInput);
      //setUserInput(this.textInput.value);
      this.textInput.value = '';
    }
  }

  render() {
    return (
      <div className="command-bar">
          <input  type="text"
                  ref={this.textInput}
                  value={this.props.userInput}
                  className="user-input"
                  placeholder=">>"
                  onKeyPress={(e) => this.onKeyPress(e)}
                  onClick={this.getFocused} />
      </div>
    );
  }
}

const CommandBarCon = connect(mapStateToProps, mapDispatchToProps)(CommandBar);

export default CommandBarCon;