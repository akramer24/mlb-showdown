import React from 'react';
import socket from '../socket';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const NewChallenge = props => {
  const { teamName, socketId, activeUser } = props;
  const challenger = { teamName, socketId };
  const user = { teamName: activeUser.userInfo.teamName, socketId: activeUser.socketId}

  return (
    <div id="new-challenge">
      <h3>{teamName} has sent you a challenge!</h3>
      <div id="new-challenge-buttons">
        <button onClick={() => socket.emit('play ball', challenger, user)}>Play ball!</button>
        <button>Reject</button>
      </div>
    </div>
  )
}

const mapState = state => {
  return {
    activeUser: state.user.activeUser
  }
}
export default withRouter(connect(mapState)(NewChallenge));