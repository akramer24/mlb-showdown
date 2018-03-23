import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { sendChallenge } from '../store';
import socket from '../socket';

class OnlineUsers extends React.Component {
  handleChallenge(userObj) {
    // this.props.challenge(team);
    console.log('challenge clicked')
    socket.emit('send challenge', userObj)
  }

  render() {
    const { onlineUsers, activeUser } = this.props;
    return (
      <div>
        <h3>These users are online</h3>
        {
          onlineUsers && onlineUsers.map(userObj => {
            console.log(userObj)
            if (userObj.teamName !== activeUser.userInfo.teamName) {
              return (
                <p key={userObj.teamName}>{userObj.teamName} <button onClick={() => this.handleChallenge(userObj)}>vs.</button></p>
              )
            }
          })
        }
      </div>
    )
  }
}

const mapState = state => {
  return {
    onlineUsers: state.user.onlineUsers,
    challenges: state.user.activeUser.challenges,
    activeUser: state.user.activeUser
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