import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { AllBatters, AllPitchers, BuyPack } from './index';
import { fetchInactiveUser, userBuyPack } from '../store';

class UserPage extends React.Component {

  componentDidMount() {
    this.props.loadInactiveUser(Number(this.props.match.params.userId))
  }

  render() {
    const { match, activeUser, inactiveUser, buyPack } = this.props;


    let active;
    let team;

    if (Number(match.params.userId) === activeUser.id) {
      active = true;
      team = activeUser.teamName;
    } else {
      active = false;
      team = inactiveUser.userInfo.teamName;
    }

    return (
      <div id="user-page">
        <h3>{team}</h3>
        <BuyPack />
        {
          activeUser.id === Number(match.params.userId) &&
          <button onClick={() => buyPack(activeUser.id)}>Buy a pack</button>
        }
        {
          activeUser.id &&
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
    buyPack(id) {
      dispatch(userBuyPack(id));
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(UserPage));