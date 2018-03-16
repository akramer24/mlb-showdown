import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPitcher } from '../store';
import onClickOutside from 'react-onclickoutside';

class SinglePitcher extends Component {
  constructor() {
    super();
    this.convertArray = this.convertArray.bind(this);
  }

  componentDidMount() {
    const { isLineup, thisPitcher, playerId } = this.props;
    let id = isLineup ? thisPitcher.id : playerId;
    this.props.loadPitcher(id);
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

  handleClickOutside(evt) {
    const targetClass = evt.target.classList.value;
    if (targetClass.startsWith('lineup-full-card-button')) {
      const id = Number(targetClass.slice(24))
      this.props.clickStats(id, true)
    } else {
      this.props.clickStats(null, false)
    }
  };

  render() {
    const { singlePitcher, thisPitcher, isLineup, playerId } = this.props;

    let pitcher;
    let id;
    let lineupClass;
    if (isLineup) {
      pitcher = thisPitcher;
      id = thisPitcher.id;
      lineupClass = 'lineup-single-player animated zoomIn';
    } else {
      pitcher = singlePitcher;
      id = playerId;
    }

    if (pitcher.id === id) {

      return (
        <div className={lineupClass}>
          <div className="single-pitcher-column-container">
            {
              isLineup && <h2 key={1}>{pitcher.name}</h2>
            }
            <div className="single-pitcher-info">
              <div className="single-pitcher-column">
                <p>Pop-out: {this.convertArray(pitcher.PU)}</p>
                <p>Strikeout: {this.convertArray(pitcher.SO)}</p>
                <p>Groundout: {this.convertArray(pitcher.GB)}</p>
                <p>Flyout: {this.convertArray(pitcher.FB)}</p>
              </div>
              <div className="single-pitcher-column">
                <p>Walk: {this.convertArray(pitcher.BB)}</p>
                <p>Single: {this.convertArray(pitcher.single)}</p>
                <p>Double: {this.convertArray(pitcher.double)}</p>
                <p>Home Run: {this.convertArray(pitcher.homeRun)}</p>
              </div>
            </div>
          </div>
          <div className="single-pitcher-column">
            <img src={pitcher.image} className="player-img" />
          </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(onClickOutside(SinglePitcher)));