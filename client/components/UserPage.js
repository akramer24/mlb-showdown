import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { AllBatters, AllPitchers, NewPack } from './index';
import { fetchInactiveUser, userBuyPack, removePack } from '../store';

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
    let team;

    if (Number(match.params.userId) === activeUser.userInfo.id) {
      active = true;
      team = activeUser.userInfo.teamName;
    } else {
      active = false;
      team = inactiveUser.userInfo.teamName;
    }


    return (
      <div id="user-page">
        <h3>{team}</h3>
        {
          this.state.displayPack
          && activeUser.newPack
          && activeUser.newPack.length > 1
          && <NewPack displayPack={this.displayPack} />
        }
        {
          activeUser.userInfo.id === Number(match.params.userId) &&
          <button onClick={() => {
            buyPack(activeUser.userInfo.id)
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
    buyPack(id) {
      dispatch(userBuyPack(id));
    },
    clearPack() {
      dispatch(removePack());
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(UserPage));