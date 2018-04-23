import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const Dice = props => (
  <div id="dice">{props.roll}</div>
)

const mapState = state => {
  return {
    roll: state.play.roll
  }
}

export default withRouter(connect(mapState)(Dice));
