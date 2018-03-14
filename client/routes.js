import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Login, Signup, AllBatters, SingleBatter, AllPitchers, Home, UserPage, QuickGame, ChooseLineup } from './components';
import { me, fetchBatters, fetchPitchers } from './store';

class Routes extends Component {
  componentDidMount() {
    const { loadInitialData } = this.props;
    loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props

    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/players/batters" component={AllBatters} />
        <Route exact path="/players/pitchers" component={AllPitchers} />
        <Route path="/users/:userId" component={UserPage} />
        <Route path="/quick-game" component={QuickGame} />
        <Route path="/game/choose-lineup" component={ChooseLineup} />
        <Route component={Login} />
      </Switch>
    )
  }
}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.activeUser.userInfo.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me())
      dispatch(fetchBatters());
      dispatch(fetchPitchers());
    },
    // loadUserPlayers(id, active) {
    //   dispatch(fetchUserBatters(id, active));
    //   dispatch(fetchUserPitchers(id, active));
    // }
  }
}

export default withRouter(connect(mapState, mapDispatch)(Routes))

Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
