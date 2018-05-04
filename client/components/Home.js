import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Login, Signup, OnlineUsers, NewChallenge, Search } from './index';

class Home extends React.Component {

  render() {
    const { isLoggedIn, challenges } = this.props;
    return (
      <div id="home-page">
        <div className="layer"></div>
        <div id="home-page-users-and-challenge-container">
          {
            isLoggedIn
              ? 
              <div id="home-page-welcome-container">
                <h3 id="home-page-welcome">Welcome to MLB SHOWDOWN</h3>
                <p>Challenge another online user to a showdown by clicking the "vs." button next to their name.</p>
                <p>They will have one minute to respond, and if they choose to play ball, you will be taken directly to the lineup page.</p>
                <OnlineUsers />
              </div>
              : 
              <Login />
          }
          {
            challenges.received.map(challengeObj => <NewChallenge key={challengeObj.to.teamName} teamName={challengeObj.teamName} socketId={challengeObj.socketId} timeRemaining={challengeObj.timeRemaining} />)
          }
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.activeUser.userInfo.id,
    challenges: state.challenges
  }
}

export default withRouter(connect(mapState)(Home));