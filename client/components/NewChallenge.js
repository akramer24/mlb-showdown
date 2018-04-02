import React from 'react';
import socket from '../socket';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import store, { removeChallenge } from '../store';

const NewChallenge = props => {
  const { challenges } = props;
  const newChallenge = challenges[challenges.length - 1];
  const challenger = newChallenge.from;
  const user = newChallenge.to;

  return (
    <div id="new-challenge" className="animated zoomIn">
      <h3>{challenger.teamName} has sent you a challenge!</h3>
      <p>You have {newChallenge.timeRemaining} seconds to make a decision.</p>
      <div id="new-challenge-buttons">
        <button id="accept-challenge-button" onClick={() => socket.emit('play ball', challenger, user)}>Play ball!</button>
        <button
          id="reject-challenge-button"
          onClick={() => {
          store.dispatch(removeChallenge(newChallenge))
          socket.emit('challenge rejected', newChallenge)
        }}>Reject</button>
      </div>
    </div>
  )
}

const mapState = state => {
  return {
    activeUser: state.user.activeUser,
    challenges: state.challenges.received
  }
}
export default withRouter(connect(mapState)(NewChallenge));