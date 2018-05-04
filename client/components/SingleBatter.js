import React, { Component } from 'react';
import onClickOutside from 'react-onclickoutside';
import store, {clearBatter} from '../store';

class SingleBatter extends Component {
  constructor() {
    super();
    this.convertArray = this.convertArray.bind(this);
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

  handleClickOutside(evt) {
    const {clickStats, isSearch} = this.props
    if (clickStats) {
      const targetClass = evt.target.classList.value;
      if (targetClass.startsWith('lineup-full-card-button')) {
        const id = Number(targetClass.slice(24, 25))
        clickStats(id, true)
      } else {
        clickStats(null, false)
      }
    } else if (isSearch) {
      store.dispatch(clearBatter())
    }
  };

  render() {
    const { thisBatter, isLineup, isSearch } = this.props;
    let batter = thisBatter;
    let lineupClass;
    if (isLineup) {
      lineupClass = 'lineup-single-player animated zoomIn';
    } else if (!isLineup && !isSearch) {
      lineupClass = 'lineup-single-player';
    } else if (isSearch) {
      lineupClass = 'lineup-single-player search-card animated zoomIn';
    }

    return (
      <div className={lineupClass}>
        <div className="single-batter-column-container">
          <h2 className="single-batter-name">{batter.name}</h2>
          {
            !isLineup && <small>Quantity: {batter.quantity} {isSearch && <button onClick={() => this.handleClickOutside()}>Hide</button>}</small>
          }
          <div className="single-batter-info">
            <div className="single-batter-column">
              <p>On-Base: {batter.onBase}</p>
              <p>Strikeout: {this.convertArray(batter.SO)}</p>
              <p>Groundout: {this.convertArray(batter.GB)}</p>
              <p>Flyout: {this.convertArray(batter.FB)}</p>
              <p>Walk: {this.convertArray(batter.BB)}</p>
            </div>
            <div className="single-batter-column">
              <p>Single: {this.convertArray(batter.single)}</p>
              <p>Single-Plus: {this.convertArray(batter.singlePlus)}</p>
              <p>Double: {this.convertArray(batter.double)}</p>
              <p>Triple: {this.convertArray(batter.triple)}</p>
              <p>Home Run: {this.convertArray(batter.homeRun)}</p>
            </div>
          </div>
        </div>
        <div className="single-batter-column">
          <img src={batter.image} className="player-img" />
        </div>

      </div>

    )
  }
}

export default (onClickOutside(SingleBatter));
