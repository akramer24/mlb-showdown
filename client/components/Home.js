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
      this.setState({ challenge: nextProps.challenges[nextProps.challenges.length - 1], displayNewChallenge: true})
    }
  }

  render() {
    const { isLoggedIn } = this.props;
    const { displayNewChallenge, challenge } = this.state;
    return (
      <div id="home-page">
      {
        isLoggedIn ? <OnlineUsers />
        :
        <Login />
      }
      {
        displayNewChallenge && <NewChallenge teamName={challenge.teamName} socketId={challenge.socketId} />
      }
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