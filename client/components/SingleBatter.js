import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchBatter, /*fetchUsers*/ } from '../store';
import onClickOutside from 'react-onclickoutside';

class SingleBatter extends Component {
  constructor() {
    super();
    this.convertArray = this.convertArray.bind(this);
  }

  componentDidMount() {
    const { isLineup, thisBatter, playerId } = this.props;
    let id;
    isLineup ? id = thisBatter.id : id = playerId;
    this.props.loadBatter(id);
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
    const targetClass = evt.target.classList.value;
    if (targetClass.startsWith('lineup-full-card-button')) {
      const id = Number(targetClass.slice(24))
      this.props.clickStats(id, true)
    } else {
      this.props.clickStats(null, false)
    }
  };

  render() {
    const { singleBatter, thisBatter, isLineup, playerId } = this.props;
    let batter;
    let id;
    let lineupClass;
    if (isLineup) {
      batter = thisBatter;
      id = thisBatter.id;
      lineupClass = 'lineup-single-player animated zoomIn';
    } else {
      batter = singleBatter;
      id = playerId;
    }

    if (batter.id === id) {

      return (
        <div className={lineupClass}>
          <div className="single-batter-column-container">
            {
              isLineup && <h2>{batter.name}</h2>
            }
            <div className="single-batter-info">
              <div className="single-batter-column">
                {
                  isLineup && <p>On-Base: {batter.onBase}</p>
                }
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(onClickOutside(SingleBatter)));
