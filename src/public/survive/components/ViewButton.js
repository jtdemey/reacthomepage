import React from 'react';
import { connect } from 'react-redux';
import { changeView } from '../actions/surviveActions';

const mapDispatchToProps = (dispatch) => {
  return {
    changeView: (nv) => {
      dispatch(changeView(nv));
    }
  };
};

class ViewButton extends React.Component {
  constructor(props) {
    super(props);
  }

  switchView(vi) {
    this.props.changeView(vi);
  }

  render() {
    return (
      <div className={this.props.look} onClick={() => { this.switchView(this.props.viewIndex) } }>
        <img className="view-btn-icon" src={this.props.svgdir} />
      </div>
    );
  }
}

const ViewButtonCon = connect(null, mapDispatchToProps)(ViewButton);

export default ViewButtonCon;