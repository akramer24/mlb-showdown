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

          <li>Strikeout: {this.convertArray(batter.SO)}</li>
          <li>Groundout: {this.convertArray(batter.GB)}</li>
          <li>Flyout: {this.convertArray(batter.FB)}</li>
          <li>Walk: {this.convertArray(batter.BB)}</li>
          <li>Single: {this.convertArray(batter.single)}</li>
          <li>Single-Plus: {this.convertArray(batter.singlePlus)}</li>
          <li>Double: {this.convertArray(batter.double)}</li>
          <li>Triple: {this.convertArray(batter.triple)}</li>
          <li>Home Run: {this.convertArray(batter.homeRun)}</li>

        </div>

      )
    } else {
      return null;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    singleBatter: state.singleBatter
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