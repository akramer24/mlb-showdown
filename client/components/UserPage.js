import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUserBatters } from '../store';
import { AllBatters } from './index';

class UserPage extends React.Component {
  componentDidMount() {
    this.props.loadData(this.props.match.params.userId)
  }
  render() {
    return (
      <div id="user-page">
        <AllBatters isUserPage={true} />
      </div>
    )
  }
}

const mapState = state => {
  return {
    batters: state.user.batters
  }
}

const mapDispatch = dispatch => {
  return {
    loadData(id) {
      dispatch(fetchUserBatters(id))
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(UserPage));