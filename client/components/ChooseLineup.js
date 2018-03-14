import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';
import { fetchUserBatters } from '../store';
import { SingleBatter } from './index';

const Batter = SortableElement(({ value, spot, clickStats, idx }) => {
  const { firstName, lastName, image, position } = value;
  let place;
  !isNaN(Number(spot)) ? place = ((Number(spot) + 1) + '.') : place = spot;
  return (
    <div>
      <p>{place} {firstName + ' ' + lastName}, {position} <button className={`lineup-full-card-button-${idx}`} onClick={() => clickStats(idx, true)}>Full Card</button></p>
      {/*<img src={image} className="player-img" />*/}
    </div>
  )
}
);

const Lineup = SortableContainer((props) => {
  const { batters, clickStats } = props;
  return (
    <div id="choose-lineup-lineup">
      {batters.map((batter, index) => {
        let spot;
        index < 9 ? spot = index : spot = 'Bench:'
        return (
          <Batter key={`item-${index}`} index={index} spot={spot} idx={index} value={batter} clickStats={clickStats} />
        )
      })}
    </div>
  );
});

class ChooseLineup extends Component {
  constructor() {
    super();
    this.state = {
      batters: [],
      displayStats: false,
      playerToDisplay: {}
    };
    this.clickStats = this.clickStats.bind(this);
  }

  componentDidMount() {
    this.setState({ batters: this.props.activeUser.batters })
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState({
      batters: arrayMove(this.state.batters, oldIndex, newIndex),
    });
  };

  clickStats(idx, bool) {
    this.setState({ displayStats: bool, playerToDisplay: this.state.batters[idx] })
  }

  render() {
    // console.log(this.state)
    return (
      <div id="choose-lineup">
        <Lineup batters={this.state.batters} onSortEnd={this.onSortEnd} axis={'xy'} clickStats={this.clickStats} />
        {
          this.state.displayStats && <SingleBatter isLineup={true} thisBatter={this.state.playerToDisplay} clickStats={this.clickStats} />
        }
      </div>
    )
  }
}

const mapState = state => {
  return {
    activeUser: state.user.activeUser
  }
}

const mapDispatch = dispatch => {
  return {
    loadBatters(id, active) {
      dispatch(fetchUserBatters(id, active));
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(ChooseLineup));