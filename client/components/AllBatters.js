import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchBatters, fetchUserBatters /*fetchUsers*/ } from '../store';
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
  }

  componentDidMount() {
    this.props.isUserPage && this.props.loadBatters(this.props.match.params.userId);
  }

  render() {
    const { isUserPage, userBatters, allBatters } = this.props;
    const batters = isUserPage ? userBatters : allBatters;

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
            batters.map(batter => {
              return (
                <div key={batter.id} className='batter'>
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
                  {/*
                    this.props.location.pathname.includes('team')
                      ?
                      <RemoveFromTeam userId={this.props.location.pathname.slice(6)} player={batter} playerId={batter.id} isBatter={this.state.isBatter} />
                      :
                      <AddToTeam users={this.props.users} playerId={batter.id} isBatter={this.state.isBatter} />
                  */}
                </div>
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
    userBatters: state.user.batters,
    users: state.users
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadBatters(id) {
      dispatch(fetchUserBatters(id));
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllBatters));