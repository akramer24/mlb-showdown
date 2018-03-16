import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUserBatters, setLineup, fetchInactiveUser, fetchUserPitchers } from '../store';

class QuickGame extends React.Component {

  constructor() {
    super();
    this.saveComputerLineup = this.saveComputerLineup.bind(this);
  }
  componentDidMount() {
    this.props.loadComputer(3, false);
  }

  saveComputerLineup(lineup, isHome, bool, isComputer) {
    this.props.setLineup(lineup, isHome, bool, isComputer);
  }

  render() {
    return (
      <NavLink to="/game/choose-lineup" onClick={() => this.saveComputerLineup(this.props.inactiveUser.batters, false, false, false)}>Play the computer</NavLink>
    )
  }
} 

const mapState = state => {
  return {
    activeUser: state.user.activeUser,
    inactiveUser: state.user.inactiveUser
  }
}

const mapDispatch = dispatch => {
  return {
    loadBatters(id, active) {
      dispatch(fetchUserBatters(id, active));
    },
    setLineup(lineup, isHome, bool, isComputer) {
      dispatch(setLineup(lineup, isHome, bool, isComputer));
    },
    loadComputer(id, active) {
      dispatch(fetchInactiveUser(id));
      dispatch(fetchUserBatters(id, active));
      dispatch(fetchUserPitchers(id, active));
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(QuickGame));