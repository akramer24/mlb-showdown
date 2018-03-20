import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { sendChallenge } from '../store';

class OnlineUsers extends React.Component {
  handleChallenge(team) {
    this.props.challenge(team);
  }

  render() {
    const { onlineUsers, challenge } = this.props;
    return (
      <div>
        <h3>These users are online</h3>
        {
          onlineUsers && onlineUsers.map(team => <p key={team}>{team} <button onClick={() => challenge(team)}>vs.</button></p>)
        }
      </div>
    )
  }
}

const mapState = state => {
  return {
    onlineUsers: state.user.onlineUsers
  }
}

const mapDispatch = dispatch => {
  return {
    challenge(team) {
      dispatch(sendChallenge(team))
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(OnlineUsers));