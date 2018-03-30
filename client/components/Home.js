import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Login, Signup, OnlineUsers, NewChallenge } from './index';

class Home extends React.Component {

  constructor() {
    super();
    this.state = {
      challenge: {},
      displayNewChallenge: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.challenges.length > this.props.challenges.length) {
      this.setState({ challenge: nextProps.challenges[nextProps.challenges.length - 1], displayNewChallenge: true })
    } else if (nextProps.challenges.length < this.props.challenges.length) {
      this.setState({ displayNewChallenge: false })
    }
  }

  render() {
    const { isLoggedIn } = this.props;
    const { displayNewChallenge, challenge } = this.state;
    return (
      <div id="home-page">
        <div id="home-page-welcome-container">
          <h3 id="home-page-welcome">Welcome to MLB SHOWDOWN</h3>
          <p>Challenge another online user to a showdown by clicking the "vs." button next to their name.</p>
          <p>They will have one minute to respond, and if they choose to play ball, you will be taken directly to the lineup page.</p>
        </div>
        <div id="home-page-users-and-challenge-container">
          {
            isLoggedIn
              ? <OnlineUsers />
              : <Login />
          }
          {
            displayNewChallenge && <NewChallenge teamName={challenge.teamName} socketId={challenge.socketId} timeRemaining={challenge.timeRemaining} />
          }
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.activeUser.userInfo.id,
    challenges: state.user.activeUser.challenges
  }
}

export default withRouter(connect(mapState)(Home));