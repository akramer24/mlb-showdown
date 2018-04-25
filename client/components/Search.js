import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { SingleBatter } from './index';
import store, { searchForUserBatter, getSearchedBatter } from '../store';

class Search extends Component {
  state = { searchInput: '' };
  handleChange(evt) {
    const search = evt.target.value;
    this.setState({ searchInput: search })
    store.dispatch(searchForUserBatter(search));
    // store.dispatch(searchForBatter(search))
  }

  handleClick(name) {
    store.dispatch(getSearchedBatter(name));
    store.dispatch(searchForUserBatter(''));
    this.setState({ searchInput: '' });
  }

  render() {
    const {searchResults} = this.props;
    return (
      <div id="search-container">
        <input id="search-input" name="search" value={this.state.searchInput} placeholder="Search for player" onChange={(evt) => this.handleChange(evt)} />
        {searchResults.length > 0 && <div id="autocomplete">
          {searchResults.map(name => <p key={name} onClick={() => this.handleClick(name)}>{name}</p>)}
        </div>}
      </div>
    )
  }
}

const mapState = state => {
  return {
    searchResults: state.user.activeUser.trieSearchResults
  }
}

export default withRouter(connect(mapState)(Search));
