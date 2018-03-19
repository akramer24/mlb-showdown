import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUserBatters, setLineup, setRotation, fetchInactiveUser, fetchUserPitchers } from '../store';

class QuickGame extends React.Component {

  constructor() {
    super();
    this.saveComputerLineup = this.saveComputerLineup.bind(this);
  }
  componentDidMount() {
    this.props.loadComputer(3, false);
  }

  saveComputerLineup(lineup, rotation, isHome, bool, isComputer, userTeam) {
    this.props.setLineup(lineup, isHome, bool, isComputer, userTeam);
    this.props.setRotation(rotation, isHome);
  }

  render() {
    const { activeUser, inactiveUser } = this.props;
    console.log(activeUser.userInfo.teamName)
    return (
      <NavLink to="/game/choose-lineup" onClick={() => this.saveComputerLineup(inactiveUser.batters, inactiveUser.pitchers, false, false, false, activeUser.userInfo.teamName)}>Play the computer</NavLink>
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
    setLineup(lineup, isHome, bool, isComputer, userTeam) {
      dispatch(setLineup(lineup, isHome, bool, isComputer, userTeam));
    },
    setRotation(rotation, isHome) {
      dispatch(setRotation(rotation, isHome));
    },
    loadComputer(id, active) {
      dispatch(fetchInactiveUser(id));
      dispatch(fetchUserBatters(id, active));
      dispatch(fetchUserPitchers(id, active));
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(QuickGame));