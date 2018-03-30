import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { sendChallenge } from '../store';
import socket from '../socket';

class OnlineUsers extends React.Component {
  state = {
    sentChallenge: false
  }

  handleChallenge(userObj) {
    socket.emit('send challenge', userObj)
    this.setState({ sentChallenge: true })
  }

  render() {
    const { onlineUsers, activeUser } = this.props;
    const { sentChallenge } = this.state;
    return (
      <div id="online-users">
        <h3>Online Users</h3>
        {
          onlineUsers && onlineUsers.map(userObj => {
            if (userObj.teamName !== activeUser.userInfo.teamName) {
              return (
                <p key={userObj.teamName}>{userObj.teamName} <button onClick={() => this.handleChallenge(userObj)}>vs.</button> {sentChallenge && <span>Active</span>}</p>
                
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