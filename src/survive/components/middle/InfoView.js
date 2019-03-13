import React from 'react';
import { connect } from 'react-redux';
import StatInfoArea from './StatInfoArea';

const mapStateToProps = (state, ownProps) => {
  return {
    clientWidth: state.ui.clientWidth,
    clientHeight: state.ui.clientHeight,
    health: state.player.health,
    sanity: state.player.sanity,
    energy: state.player.energy
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateItemView: () => {
      dispatch(updateItemView())
    }
  };
};

class InfoView extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //this.props.updateItemView();
  }

  render() {
    const look = {
      display: this.props.isCurrentView ? 'block' : 'none',
      width: this.props.clientWidth + 'px',
      height: this.props.clientHeight + 'px'
    };
    const cssClass = this.props.isTransitioningOut === true ? 'info-view fadeout-slideout' : 'info-view fadein-slidein';

    return (
      <div className={cssClass} style={look}>
        <StatInfoArea   clientWidth={this.props.clientWidth}
                        clientHeight={this.props.clientHeight}
                        playerHealth={this.props.health}
                        playerSanity={this.props.sanity}
                        playerEnergy={this.props.energy} />
      </div>
    );
  }
}

const InfoViewCon = connect(mapStateToProps, mapDispatchToProps)(InfoView);

export default InfoViewCon;