import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';
import { fetchUserBatters } from '../store';
import { SingleBatter } from './index';

const Batter = SortableElement(({ value, spot, clickStats, idx }) => {
  const { firstName, lastName, image, position } = value;
  let place;
  !isNaN(Number(spot)) ? place = ((Number(spot) + 1) + '.') : place = '';
  return (
    <tr className="lineup-name">
      <td className="lineup-table-column">{place}</td>
      <td className="lineup-table-column">{firstName + ' ' + lastName}</td>
      <td className="lineup-table-column">{position}</td>
      <td className="lineup-table-column"><button className={`lineup-full-card-button-${idx}`} onClick={() => clickStats(idx, true)}>Stats</button></td>
    </tr>
  )
}
);

const Lineup = SortableContainer((props) => {
  const { batters, clickStats } = props;
  return (
    <table id="choose-lineup-lineup">
      <tbody>
        <tr>
          <th className="lineup-table-column">Order</th>
          <th className="lineup-table-column">Player</th>
          <th className="lineup-table-column">Position</th>
          <th className="lineup-table-column">Stats</th>
        </tr>
        {batters.map((batter, index) => {
          let spot;
          index < 9 ? spot = index : spot = 'Bench: '
          return (
            <Batter key={`item-${index}`} index={index} spot={spot} idx={index} value={batter} clickStats={clickStats} />
          )
        })}
      </tbody>
    </table>
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
        <div id="lineup-button-and-card">
          <button id="lineup-select-rotation">Select your pitching rotation</button>
          {
            this.state.displayStats &&
            <SingleBatter
              isLineup={true}
              thisBatter={this.state.playerToDisplay}
              clickStats={this.clickStats} />
          }
        </div>
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