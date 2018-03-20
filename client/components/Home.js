import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Login, Signup, OnlineUsers } from './index';

const Home = (props) => {
  const { isLoggedIn } = props;
  return (
    <div id="home-page">
    {
      isLoggedIn ? <OnlineUsers />
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