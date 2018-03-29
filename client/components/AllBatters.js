import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUserBatters, deleteUserBatter } from '../store';
import SingleBatter from './SingleBatter';

class AllBatters extends Component {

  constructor() {
    super();
    this.state = {
      isBatter: true,
      displayAttributes: false,
      displayPlayer: null
    }
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    const { isUserPage, loadBatters, match, isActive } = this.props
    isUserPage && loadBatters(Number(match.params.userId), isActive);
  }

  handleDelete(batterId) {
    const { deleteBatter, activeUser } = this.props;
    deleteBatter(activeUser.userInfo.id, batterId)
  }

  render() {
    const { isUserPage, activeUser, activeUserBatters, inactiveUserBatters, allBatters, match } = this.props;
    let batters;

    if (isUserPage) {
      if (activeUser.userInfo.id === Number(match.params.userId)) {
        batters = activeUserBatters;
      } else {
        batters = inactiveUserBatters;
      }
    } else {
      batters = allBatters;
    }
    return (
      batters && batters.length > 1 &&
      <div className='display-players'>
        <h1 className='page-header'>Batters</h1>
        <div id='all-batters'>
          {
            batters && batters.map((batter, idx) => {
              return (
                <SingleBatter key={batter.id} isLineup={false} thisBatter={batter} />
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
    allBatters: state.batters.batters,
    activeUserBatters: state.user.activeUser.batters,
    inactiveUserBatters: state.user.inactiveUser.batters,
    activeUser: state.user.activeUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadBatters(id, method) {
      dispatch(fetchUserBatters(id, method));
    },
    deleteBatter(userId, batterId) {
      dispatch(deleteUserBatter(userId, batterId))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllBatters));

//  {/*
//                     isUserPage && (activeUser.userInfo.id === Number(match.params.userId)) &&
//                       <button onClick={() => this.handleDelete(batter.id)}>Drop</button>
//                   */}