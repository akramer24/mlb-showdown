import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { AllBatters, AllPitchers, NewPack, NewChallenge, Search } from './index';
import { fetchInactiveUser, userBuyPack, removePack, fetchUserBatters, fetchUserPitchers } from '../store';

class UserPage extends React.Component {

  constructor() {
    super();
    this.state = {
      displayPack: false
    }
    this.displayPack = this.displayPack.bind(this);
  }

  componentDidMount() {
    this.props.loadInactiveUser(Number(this.props.match.params.userId))
  }

  displayPack(bool) {
    this.setState({ displayPack: bool })
    if (bool === false) this.props.clearPack();
  }

  render() {
    const { match, activeUser, inactiveUser, buyPack, challenges } = this.props;

    let active;
    let user;

    if (Number(match.params.userId) === activeUser.userInfo.id) {
      active = true;
      user = activeUser.userInfo;
    } else {
      active = false;
      user = inactiveUser.userInfo;
    }

    return (
      <div id="user-page">
        <div id="user-page-header">
          <h3 id="user-page-team-name" className="user-page-header-item">{user.teamName}</h3>
          <p className="user-page-header-item"><span className="bold">Record:</span> {user.wins}-{user.losses}</p>
          {
            activeUser.userInfo.id === Number(match.params.userId) && <p className="user-page-header-item"><span className="bold">Cash:</span> ${user.cash}</p>
          }
          {
            this.state.displayPack
            && activeUser.newPack
            && activeUser.newPack.length > 1
            && <NewPack displayPack={this.displayPack} />
          }
          {
            activeUser.userInfo.id === Number(match.params.userId) && activeUser.userInfo.cash >= 5 &&
              <button
                id="buy-pack-button"
                className="user-page-header-item"
                onClick={() => {
                buyPack(activeUser.userInfo.id, activeUser.userInfo.cash, true)
                this.displayPack(true)
              }
              }>Buy a pack</button>
            }
            {
              activeUser.userInfo.id === Number(match.params.userId) && activeUser.userInfo.cash < 5 &&
              <p className="user-page-header-item">Packs cost $5. Play a game to earn money so you can buy one.</p>
            }
        </div>
        {
          challenges.map(challengeObj => <NewChallenge key={challengeObj.to.teamName} teamName={challengeObj.teamName} socketId={challengeObj.socketId} timeRemaining={challengeObj.timeRemaining} />)
        }
        {
          activeUser.userInfo.id &&
          [
            <AllBatters key={1} isUserPage={true} isActive={active} />,
            <AllPitchers key={2} isUserPage={true} isActive={active} />
          ]
        }
      </div>
    )
  }
}

const mapState = state => {
  return {
    activeUser: state.user.activeUser,
    inactiveUser: state.user.inactiveUser,
    challenges: state.challenges.received
  }
}

const mapDispatch = dispatch => {
  return {
    loadInactiveUser(id) {
      dispatch(fetchInactiveUser(id))
    },
    buyPack: async (id, cash, active) => {
      await dispatch(userBuyPack(id, cash));
      await dispatch(fetchUserBatters(id, active));
      await dispatch(fetchUserPitchers(id, active));
    },
    clearPack() {
      dispatch(removePack());
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(UserPage));