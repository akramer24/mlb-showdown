import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUserPitchers, deleteUserPitcher } from '../store';
import SinglePitcher from './SinglePitcher';

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
    return (
      pitchers && pitchers.length > 0 &&
      <div className='display-players'>
        <h1 className='page-header'>Pitchers</h1>
        <div id='all-pitchers'>
          {
            pitchers && pitchers.map((pitcher, idx) => {
              return (
                  <SinglePitcher key={pitcher.id} isLineup={false} thisPitcher={pitcher} />
                )
            })
          }
        </div>
      </div>
    )
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