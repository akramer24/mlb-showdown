import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUserBatters, deleteUserBatter } from '../store';
import SingleBatter from './SingleBatter';
import Search from './Search';

export class AllBatters extends Component {

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
    isUserPage && !isActive && loadBatters(Number(match.params.userId), isActive);
  }

  handleDelete(batterId) {
    const { deleteBatter, activeUser } = this.props;
    deleteBatter(activeUser.userInfo.id, batterId)
  }

  render() {
    const { isUserPage, activeUser, activeUserBatters, inactiveUserBatters, allBatters, match, searchResults, isActive, singleBatter } = this.props;
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
      batters && batters.length > 0 &&
      <div className='display-players'>
        <h1 className='page-header'>Batters</h1>
        {isActive && <Search />}
        {isActive && activeUser.singleBatter.name && <SingleBatter isLineup={false} thisBatter={activeUser.singleBatter} isBatter={true} isSearch={true} />}
        <div id='all-batters'>
          {
            batters && batters.map((batter, idx) => {
              return (
                <SingleBatter key={batter.id} isLineup={false} thisBatter={batter} isBatter={true} />
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
    activeUser: state.user.activeUser,
    searchResults: state.user.activeUser.trieSearchResults,
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