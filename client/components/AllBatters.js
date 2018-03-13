import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUserBatters, deleteUserBatter } from '../store';
// import AddToTeam from './AddToTeam';
import SingleBatter from './SingleBatter';
// import DisplayTeam from './DisplayTeam';
// import RemoveFromTeam from './RemoveFromTeam';

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
    deleteBatter(activeUser.id, batterId)
  }

  render() {
    const { isUserPage, activeUser, activeUserBatters, inactiveUserBatters, allBatters, match } = this.props;
    let batters;

    if (isUserPage) {
      if (activeUser.id === Number(match.params.userId)) {
        batters = activeUserBatters;
      } else {
        batters = inactiveUserBatters;
      }
    } else {
      batters = allBatters;
    }
    if (batters && batters.length > 1) {
      return (
        <div className='display-players'>
          <h1 className='page-header'>Batters</h1>
          <div id='all-batters'>
            {/*
            this.props.isAllDisplayed || this.props.match.path.indexOf('team') > -1
              ?
              null
              :
              <DisplayTeam />
          */}
            {
              batters && batters.map((batter, idx) => {
                return (
                  <div key={idx} className='batter'>
                    <h3>{batter.name}</h3>
                    <button onClick={
                      () => this.setState({
                        displayAttributes: !this.state.displayAttributes,
                        displayPlayer: batter.id
                      })
                    }> {
                        this.state.displayAttributes && batter.id === this.state.displayPlayer
                          ?
                          <h3>See less</h3>
                          :
                          <h3>See all attributes</h3>
                      }
                    </button>
                    <div>
                      <div className='attributes-list'>
                        <p>Position: {batter.position}</p>
                        <p>On-Base: {batter.onBase}</p>


                        {
                          this.state.displayAttributes && batter.id === this.state.displayPlayer
                            ?
                            <SingleBatter playerId={this.state.displayPlayer} />
                            :
                            null
                        }
                      </div>
                      {
                        this.state.displayAttributes && batter.id === this.state.displayPlayer
                          ?
                          null
                          :
                          <img src={batter.image} className='player-img' />
                      }
                    </div>
                    {
                      isUserPage && (activeUser.id === Number(match.params.userId)) &&
                      <button onClick={() => this.handleDelete(batter.id)}>Drop</button>
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