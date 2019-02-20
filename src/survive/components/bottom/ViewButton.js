import React from 'react';
import { connect } from 'react-redux';
import { transitionViewOut } from '../../actions/uiActions';

const mapDispatchToProps = (dispatch) => {
  return {
    transitionViewOut: (nextView) => {
      dispatch(transitionViewOut(nextView));
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
      <div className={this.props.look} onClick={() => { this.props.transitionViewOut(this.props.viewIndex) } }>
        <img className="view-btn-icon" src={this.props.svgdir} />
      </div>
    );
  }
}

const ViewButtonCon = connect(null, mapDispatchToProps)(ViewButton);

export default ViewButtonCon;