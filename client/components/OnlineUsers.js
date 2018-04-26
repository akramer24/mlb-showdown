import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import store, { sendChallenge } from '../store';
import socket from '../socket';

class OnlineUsers extends React.Component {

  handleChallenge(userObj) {
    const { teamName } = this.props.activeUser.userInfo;
    const { socketId } = this.props.activeUser
    const challenge = { to: userObj, from: { teamName, socketId }, timeRemaining: 60 };
    socket.emit('send challenge', challenge)
    store.dispatch(sendChallenge(challenge))
  }

  render() {
    const { onlineUsers, activeUser, sentChallenges } = this.props;

    return (
      <div id="online-users">
        {
          onlineUsers.length > 0
            ?
            <div>
              <h3>Online Users</h3>
              {
                onlineUsers && onlineUsers.map(userObj => {
                  if (userObj.teamName !== activeUser.userInfo.teamName) {
                    return (
                      <p key={userObj.teamName}>{userObj.teamName} <button className="vs-button" onClick={() => this.handleChallenge(userObj)}>vs.</button>
                        {
                          sentChallenges.find(challenge => challenge.to.teamName === userObj.teamName) && <span>Active</span>
                        }</p>

                    )
                  }
                })
              }
            </div>
            :
            <div>
              <h3>No users online</h3>
              <p>While you wait, you can visit your <NavLink to={`/users/${activeUser.userInfo.id}`}>team page.</NavLink></p>
            </div>
        }
      </div>
    )
  }
}

const mapState = state => {
  return {
    onlineUsers: state.user.onlineUsers,
    sentChallenges: state.challenges.sent,
    activeUser: state.user.activeUser
  }
}

export default withRouter(connect(mapState)(OnlineUsers));