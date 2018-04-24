import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { SingleBatter } from './index';
import store, { searchForUserBatter, searchForBatter } from '../store';

class Search extends Component {

  handleChange(evt) {
    const search = evt.target.value;
    store.dispatch(searchForUserBatter(search));
    // store.dispatch(searchForBatter(search))
  }

  render() {
    return (
      <input id="search-input" name="search" placeholder="Search for player" onChange={(evt) => this.handleChange(evt)} />
    )
  }
}

const mapState = state => {
  return {
    searchResults: state.batters.trieSearchResults
  }
}

export default withRouter(connect(mapState)(Search));
