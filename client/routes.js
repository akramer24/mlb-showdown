import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Login, Signup, AllBatters, SingleBatter, AllPitchers, Home, UserPage } from './components';
import { me, fetchBatters, fetchPitchers } from './store';

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
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
        <Route component={Login} />
      </Switch>
    )
  }
}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.activeUser.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me())
      dispatch(fetchBatters());
      dispatch(fetchPitchers());
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(Routes))

Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
