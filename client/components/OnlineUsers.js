import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import store, { sendChallenge } from '../store';
import socket from '../socket';

export class OnlineUsers extends React.Component {

  state = { error: false };

  componentWillUnmount() {
    this.setState({ error: false });
  }

  handleChallenge(userObj) {
    const { teamName } = this.props.activeUser.userInfo;
    const { socketId, batters, pitchers } = this.props.activeUser
    const challenge = { to: userObj, from: { teamName, socketId }, timeRemaining: 60 };
    if (batters.length > 8 && pitchers.length > 1) {
      socket.emit('send challenge', challenge);
      store.dispatch(sendChallenge(challenge));
    } else {
      this.setState({ error: true });
    }
  }

  render() {
    const { onlineUsers, activeUser, sentChallenges } = this.props;
    const { error } = this.state;

    return (
      <div id="online-users">
        {
          error &&
          <div id="not-enough-players-error-box">
            <h3>You need more players!</h3>
            <p>You must have at least 9 batters and 2 pitchers to play a game.</p>
            <p>Visit your <NavLink className="navlink" to={`/users/${activeUser.userInfo.id}`}>team page</NavLink> to buy more cards!</p>
          </div>
        }
        {
          onlineUsers.length > 0 && !error &&
          <div id="online-users-list">
            <h3>Online Users</h3>
            {
              onlineUsers && onlineUsers.map(userObj => {
                if (userObj.teamName !== activeUser.userInfo.teamName) {
                  return (
                    <p key={userObj.teamName} className="online-user">{userObj.teamName} <button className="vs-button" onClick={() => this.handleChallenge(userObj)}>vs.</button>
                      {
                        sentChallenges.find(challenge => challenge.to.teamName === userObj.teamName) && <span>Active</span>
                      }</p>

                  )
                }
              })
            }
          </div>
        }
        {
          !onlineUsers.length && !error &&
          <div id="no-online-users">
            <h3>No users online</h3>
            <p>While you wait, you can visit your <NavLink className="navlink" to={`/users/${activeUser.userInfo.id}`}>team page.</NavLink></p>
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