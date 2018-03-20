import React from 'react';
import { connect } from 'react-redux';
import { logout, fetchUserBatters, fetchUserPitchers } from '../store';
import navTo from './utils/navTo';
import onClickOutside from 'react-onclickoutside';

class NavBar extends React.Component {
  constructor() {
    super();
    this.state = {
      didLoad: false,
      displayRightDropdown: false,
      fade: 'fadeIn'
    }
    this.displayDropdown = this.displayDropdown.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { loadUserPlayers, isLoggedIn, activeUser } = nextProps;
    if (isLoggedIn && !this.state.didLoad) {
      loadUserPlayers(Number(activeUser.userInfo.id), true);
      this.setState({ didLoad: true })
    }
  }

  displayDropdown(dropdown, bool) {
    if (bool) {
      this.setState({ [dropdown]: !this.state.displayRightDropdown, fade: 'fadeIn' })
    }
    else {
      this.setState({ fade: 'fadeOut' })
      setTimeout(() => {
        this.setState({ [dropdown]: !this.state.displayRightDropdown })
      }, 700)
    }
  }

  handleClickOutside = () => {
    this.setState({ fade: 'fadeOut' })
    setTimeout(() => {
      this.setState({ displayRightDropdown: false, fade: 'fadeIn' })
    }, 700)
  };

  render() {
    const { handleLogout, isLoggedIn, activeUser } = this.props;
    return (
      <div id="navbar">
        <div id="navbar-left">
          <div id="navbar-title">
            <h3 id="navbar-title-text" className="navbar-text" onClick={() => navTo('/')}>MLB SHOWDOWN</h3>
          </div>
          <div id="navbar-options">
            {
              isLoggedIn &&
              <p onClick={() => navTo('/quick-game')} className="navbar-text">Quick Game</p>
            }
          </div>
        </div>
        <div id="navbar-right">
          <p className="navbar-text" onClick={() => this.displayDropdown('displayRightDropdown', !this.state.displayRightDropdown)}>{activeUser.userInfo.teamName} <span className="dropdown-carrot">&#9660;</span></p>
          {
            this.state.displayRightDropdown &&
            <div id="navbar-right-dropdown" className={`animated ${this.state.fade}`}>
              <p
                onClick={() => {
                  navTo(`/users/${activeUser.userInfo.id}`)
                  this.displayDropdown('displayRightDropdown', !this.state.displayRightDropdown)
                }
                }
                className="navbar-text">My Team</p>
              <p
                className="navbar-text"
                onClick={() => {
                  handleLogout()
                  this.displayDropdown('displayRightDropdown', !this.state.displayRightDropdown)
                }
                }>Log Out</p>
            </div>
          }
          {
            activeUser.challenges && activeUser.challenges.length > 0 &&
              <p className="navbar-text">vs.</p>
          }
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.activeUser.userInfo.id,
    activeUser: state.user.activeUser
  }
}

const mapDispatch = dispatch => {
  return {
    handleLogout() {
      dispatch(logout())
    },
    loadUserPlayers(id, active) {
      dispatch(fetchUserBatters(id, active));
      dispatch(fetchUserPitchers(id, active));
    }
  }
}

export default connect(mapState, mapDispatch)(onClickOutside(NavBar));
