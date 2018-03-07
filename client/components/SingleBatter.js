import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchBatter, /*fetchUsers*/ } from '../store';
// import AddToTeam from './AddToTeam';
// import AllBatters from './AllBatters';

class SingleBatter extends Component {
  constructor() {
    super();
    this.convertArray = this.convertArray.bind(this);
  }

  componentDidMount() {
    this.props.loadBatter(this.props.playerId);
  }

  convertArray(arr) {
    if (!arr) {
      return '-';
    } else if (arr.length === 1) {
      return arr.join('');
    } else {
      return arr[0] + '-' + arr[arr.length - 1];
    }
  }

  render() {
    const batter = this.props.singleBatter;

    if (batter.id === this.props.playerId) {

      return (
        <div>

          <p>Strikeout: {this.convertArray(batter.SO)}</p>
          <p>Groundout: {this.convertArray(batter.GB)}</p>
          <p>Flyout: {this.convertArray(batter.FB)}</p>
          <p>Walk: {this.convertArray(batter.BB)}</p>
          <p>Single: {this.convertArray(batter.single)}</p>
          <p>Single-Plus: {this.convertArray(batter.singlePlus)}</p>
          <p>Double: {this.convertArray(batter.double)}</p>
          <p>Triple: {this.convertArray(batter.triple)}</p>
          <p>Home Run: {this.convertArray(batter.homeRun)}</p>

        </div>

      )
    } else {
      return null;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    singleBatter: state.batters.singleBatter
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadBatter(id) {
      dispatch(fetchBatter(id));
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleBatter));