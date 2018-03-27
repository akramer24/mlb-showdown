import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUserPitchers, deleteUserPitcher } from '../store';
// import AddToTeam from './AddToTeam';
import SinglePitcher from './SinglePitcher';
// import DisplayTeam from './DisplayTeam';
// import RemoveFromTeam from './RemoveFromTeam';

class AllPitchers extends Component {

  constructor() {
    super();
    this.state = {
      displayAttributes: false,
      displayPlayer: null
    }
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    const { isUserPage, loadPitchers, match, isActive } = this.props;
    isUserPage && loadPitchers(Number(match.params.userId), isActive);
  }

  handleDelete(pitcherId) {
    const { deletePitcher, activeUser } = this.props;
    deletePitcher(activeUser.userInfo.id, pitcherId)
  }

  render() {
    const { isUserPage, activeUser, activeUserPitchers, inactiveUserPitchers, allPitchers, match } = this.props;
    let pitchers;

    if (isUserPage) {
      if (activeUser.userInfo.id === Number(match.params.userId)) {
        pitchers = activeUserPitchers;
      } else {
        pitchers = inactiveUserPitchers;
      }
    } else {
      pitchers = allPitchers;
    }
    if (pitchers && pitchers.length > 0) {
      return (
        <div className='display-players'>
          <h1 className='page-header'>Pitchers</h1>
          <div id='all-pitchers'>
            {/*
            this.props.isAllDisplayed || this.props.match.path.indexOf('team') > -1
              ?
              null
              :
              <DisplayTeam />
          */}
            {
              pitchers && pitchers.map((pitcher, idx) => {
                return (
                  <div key={idx} className='pitcher'>
                    <h3>{pitcher.name}</h3>
                    <p>Quantity: {pitcher.quantity}</p>
                    <button onClick={
                      () => this.setState({
                        displayAttributes: !this.state.displayAttributes,
                        displayPlayer: pitcher.id
                      })
                    }> {
                        this.state.displayAttributes && pitcher.id === this.state.displayPlayer
                          ?
                          <h3>See less</h3>
                          :
                          <h3>See all attributes</h3>
                      }
                    </button>
                    <div>
                      <div className='attributes-list'>
                        <p>Position: {pitcher.position}</p>
                        <p>Control: {pitcher.control}</p>

                        {
                          this.state.displayAttributes && pitcher.id === this.state.displayPlayer
                            ?
                            <SinglePitcher playerId={this.state.displayPlayer} />
                            :
                            null
                        }
                      </div>
                      {
                        this.state.displayAttributes && pitcher.id === this.state.displayPlayer
                          ?
                          null
                          :
                          <img src={pitcher.image} className='player-img' />
                      }
                    </div>
                    {
                      isUserPage && (activeUser.userInfo.id === Number(match.params.userId)) &&
                      <button onClick={() => this.handleDelete(pitcher.id)}>Drop</button>
                    }
                  </div>
                )
              })
            }
          </div>
        </div>
      )
    } else {
      return null;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    allPitchers: state.pitchers.pitchers,
    activeUserPitchers: state.user.activeUser.pitchers,
    inactiveUserPitchers: state.user.inactiveUser.pitchers,
    activeUser: state.user.activeUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadPitchers(id, method) {
      dispatch(fetchUserPitchers(id, method));
    },
    deletePitcher(userId, pitcherId) {
      dispatch(deleteUserPitcher(userId, pitcherId));
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllPitchers));