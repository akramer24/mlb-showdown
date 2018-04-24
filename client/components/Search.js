import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { SingleBatter } from './index';
import store, { searchForBatter } from '../store';

class Search extends Component {

  handleChange(evt) {
    const search = evt.target.value;
    store.dispatch(searchForBatter(search));
  }

  render() {
    return (
      [
        <input key={1} name="search" onChange={(evt) => this.handleChange(evt)} />,
        <div id="search-results" key={2}>
          {
            this.props.searchResults.map(batter => <SingleBatter key={batter.id} isLineup={false} thisBatter={batter} isBatter={true}  />)
          }
        </div>
      ]
    )
  }
}

const mapState = state => {
  return {
    searchResults: state.batters.trieSearchResults
  }
}

export default withRouter(connect(mapState)(Search));
