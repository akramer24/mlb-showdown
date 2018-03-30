import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { AllBatters, AllPitchers, NewPack } from './index';
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
    const { match, activeUser, inactiveUser, buyPack } = this.props;

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
        <h3>{user.teamName}</h3>
        <p>Record: {user.wins}-{user.losses}</p>
        {
          activeUser.userInfo.id === Number(match.params.userId) && <p>Cash: ${user.cash}</p>
        }
        {
          this.state.displayPack
          && activeUser.newPack
          && activeUser.newPack.length > 1
          && <NewPack displayPack={this.displayPack} />
        }
        {
          activeUser.userInfo.id === Number(match.params.userId) &&
          <button onClick={() => {
            buyPack(activeUser.userInfo.id, activeUser.userInfo.cash, true)
            this.displayPack(true)
          }
          }>Buy a pack</button>
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
    inactiveUser: state.user.inactiveUser
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