import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const Challenges = (props) => {

  const { challenges } = props;
  return (
    <div>
      <h3>These are my challenges</h3>
      {
        challenges && challenges.map(challenge => <p key={challenge.teamName}>{challenge.teamName}</p>)
      }
    </div>
  )
}

const mapState = state => {
  return {
    onlineUsers: state.user.onlineUsers,
    challenges: state.user.activeUser.challenges
  }
}

export default withRouter(connect(mapState)(Challenges));