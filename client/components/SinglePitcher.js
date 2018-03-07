import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPitcher } from '../store';
// import AddToTeam from './AddToTeam';

class SinglePitcher extends Component {
  constructor() {
    super();
    this.convertArray = this.convertArray.bind(this);
  }

  componentDidMount() {
    this.props.loadPitcher(this.props.playerId);
  }

  convertArray(arr) {
    if (!arr) {
      return '-';
    } else if (arr.length === 1 && arr[0] !== 0) {
      return arr.join('');
    } else if (arr[0] === 0) {
      return '-';
    } else {
      return arr[0] + '-' + arr[arr.length - 1];
    }
  }

  render() {
    const pitcher = this.props.singlePitcher;

    if (pitcher.id === this.props.playerId) {

      return (
        <div>
          <p>Position: {pitcher.position}</p>
          <p>Control: {pitcher.control}</p>
          <p>Pop-out: {this.convertArray(pitcher.PU)}</p>
          <p>Strikeout: {this.convertArray(pitcher.SO)}</p>
          <p>Groundout: {this.convertArray(pitcher.GB)}</p>
          <p>Flyout: {this.convertArray(pitcher.FB)}</p>
          <p>Walk: {this.convertArray(pitcher.BB)}</p>
          <p>Single: {this.convertArray(pitcher.single)}</p>
          <p>Double: {this.convertArray(pitcher.double)}</p>
          <p>Home Run: {this.convertArray(pitcher.homeRun)}</p>
        </div>
      )
    } else {
      return null;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    singlePitcher: state.pitchers.singlePitcher
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadPitcher(id) {
      dispatch(fetchPitcher(id));
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SinglePitcher));