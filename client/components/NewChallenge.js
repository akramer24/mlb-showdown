import React from 'react';
import socket from '../socket';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import store, { removeChallenge } from '../store';

const NewChallenge = props => {
  const { teamName, socketId, timeRemaining, activeUser } = props;
  const challenger = { teamName, socketId };
  const user = { teamName: activeUser.userInfo.teamName, socketId: activeUser.socketId}

  return (
    <div id="new-challenge" className="animated zoomIn">
      <h3>{teamName} has sent you a challenge!</h3>
      <p>You have {timeRemaining} to make a decision.</p>
      <div id="new-challenge-buttons">
        <button onClick={() => socket.emit('play ball', challenger, user)}>Play ball!</button>
        <button onClick={() => store.dispatch(removeChallenge())}>Reject</button>
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