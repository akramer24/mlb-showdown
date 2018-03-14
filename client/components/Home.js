import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Login, Signup } from './index';

const Home = (props) => {
  const { isLoggedIn } = props;
  return (
    <div id="home-page">
    {
      isLoggedIn ? <h1>you're logged in</h1>
      :
      <Login />
    }
    </div>
  )
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.activeUser.userInfo.id
  }
}

export default withRouter(connect(mapState)(Home));