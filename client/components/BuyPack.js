import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { userBuyPack } from '../store';

const BuyPack = (props) => {
  const { id, buyPack } = props;
  return (
  <button onClick={() => buyPack(id)}>Buy a pack</button>
  )
}

const mapState = state => {
  return {
    activeUser: state.activeUser
  }
}

const mapDispatch = dispatch => {
  return {
    buyPack(id) {
      dispatch(userBuyPack(id));
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(BuyPack));