import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchBatters, /*fetchUsers*/ } from '../store';
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
    this.props.loadBatters();
    // this.props.loadUsers();
  }

  render() {
    const batters = this.props.batters;

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
                    <ul className='attributes-list'>
                      <li>Position: {batter.position}</li>
                      <li>On-Base: {batter.onBase}</li>


                      {
                        this.state.displayAttributes && batter.id === this.state.displayPlayer
                          ?
                          <SingleBatter playerId={this.state.displayPlayer} />
                          :
                          null
                      }
                    </ul>
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
    batters: state.batters,
    users: state.users
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadBatters() {
      dispatch(fetchBatters());
    },

    // loadUsers() {
    //   dispatch(fetchUsers())
    // }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllBatters));