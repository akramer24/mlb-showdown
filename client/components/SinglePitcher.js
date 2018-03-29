import React, { Component } from 'react';
import onClickOutside from 'react-onclickoutside';

class SinglePitcher extends Component {
  constructor() {
    super();
    this.convertArray = this.convertArray.bind(this);
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
    const { clickStats } = this.props;
    if (clickStats) {
      const targetClass = evt.target.classList.value;
      if (targetClass.startsWith('lineup-full-card-button')) {
        const id = Number(targetClass.slice(24))
        clickStats(id, true)
      } else {
        clickStats(null, false)
      }
    }
  }

  render() {
    const { thisPitcher, isLineup } = this.props;

    let pitcher = thisPitcher;
    let id = pitcher.id;
    let lineupClass;
    if (isLineup) {
      lineupClass = 'lineup-single-player animated zoomIn';
    } else {
      lineupClass = 'lineup-single-player';
    }
    return (
      <div className={lineupClass}>
        <div className="single-pitcher-column-container">
          <h2 key={1}>{pitcher.name}</h2>
          {
            !isLineup && <small>Quantity: {pitcher.quantity}</small>
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
  }
}

export default (onClickOutside(SinglePitcher));
