import React from 'react';
import { connect } from 'react-redux';
import ConsoleLine from './ConsoleLine';
import { setListAnchors } from '../actions/surviveActions';

const mapStateToProps = (state, ownProps) => {
  return {
    areaAnchor: state.ui.consoleAreaAnchor,
    listAnchor: state.ui.consoleListAnchor
  };
};

class ConsoleList extends React.Component {
  constructor(props) {
    super(props);
    this.areaRef = React.createRef();
    this.listRef = React.createRef();
  }

  render() {
    const listLook = {
      width: this.props.clientWidth + 'px',
      height: this.props.clientHeight + 'px',
      bottom: this.props.consoleYpos + 'px'
    };
    return (
      <div  className="line-list-area"
            style={{ width: this.props.clientWidth + 'px', height: (this.props.clientHeight - 32) + 'px' }}
            ref={this.areaRef}>
        <ul className="line-list" style={listLook} ref={this.listRef}>
          {this.props.consoleLines.map((line) => (
            <ConsoleLine key={line.id} text={line.text} color={line.color} ypos={line.ypos} opacity={line.opacity} />
          ))}
        </ul>
      </div>
    );
  }
}

const ConsoleListCon = connect(mapStateToProps)(ConsoleList);

export default ConsoleListCon;