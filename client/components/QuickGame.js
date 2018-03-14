import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUserBatters } from '../store';

class QuickGame extends React.Component {
  // componentDidMount() {
  //   this.props.loadBatters(Number(this.props.activeUser.userInfo.id), true)
  // }

  render() {
    return (
      <NavLink to="/game/choose-lineup">Play the computer</NavLink>
    )
  }
} 

const mapState = state => {
  return {
    activeUser: state.user.activeUser
  }
}

const mapDispatch = dispatch => {
  return {
    loadBatters(id, active) {
      dispatch(fetchUserBatters(id, active));
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(QuickGame));