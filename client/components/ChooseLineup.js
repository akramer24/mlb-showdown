import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';
import { fetchUserBatters, setLineup, fetchUserPitchers, setRotation } from '../store';
import { SingleBatter, SinglePitcher } from './index';
import socket from '../socket';

const Player = SortableElement(({ player, spot, clickStats, idx, isBatter }) => {
  const { firstName, lastName, position } = player;
  let place;
  if (isBatter) {
    !isNaN(Number(spot)) ? place = ((Number(spot) + 1) + '.') : place = '';
  } else {
    place = spot;
  }
  return (
    <tr className="lineup-name">
      <td className="lineup-table-column">{place}</td>
      <td className="lineup-table-column">{firstName + ' ' + lastName}</td>
      <td className="lineup-table-column">{position}</td>
      <td className="lineup-table-column"><button className={`lineup-full-card-button-${idx} lineup-full-card-button`} onClick={() => clickStats(idx, true)}>Stats</button></td>
    </tr>
  )
}
);

const Lineup = SortableContainer((props) => {
  const { players, clickStats, isBatter } = props;
  const firstCol = isBatter ? 'Order' : 'Role';
  return (
    <div id="clipboard" className="animated slideInLeft">
      <table id="choose-lineup-lineup">
        <tbody>
          <tr>
            <th className="lineup-table-column">{firstCol}</th>
            <th className="lineup-table-column">Player</th>
            <th className="lineup-table-column">Position</th>
            <th className="lineup-table-column">Stats</th>
          </tr>
          {players.map((player, index) => {
            let spot;
            if (isBatter) {
              if (index < 9) spot = index
              if (index >= 9 && index <= 13) spot = 'Bench: '
              if (index > 13) spot = 'Inactive';
            } else {
              index === 0 && index < 5 ? spot = 'SP' : spot = 'RP'
              if (index >= 5) spot = 'Inactive'
            }
            return (
              isBatter
                ? <Player key={`item-${index}`} index={index} spot={spot} idx={index} player={player} clickStats={clickStats} isBatter={true} />
                : <Player key={`item-${index}`} index={index} spot={spot} idx={index} player={player} clickStats={clickStats} isBatter={false} />
            )
          })}
        </tbody>
      </table>
    </div>
  );
});

class ChooseLineup extends Component {
  constructor() {
    super();
    this.state = {
      batters: [],
      pitchers: [],
      displayStats: false,
      playerToDisplay: {}
    };
    this.clickStats = this.clickStats.bind(this);
    this.saveLineup = this.saveLineup.bind(this);
    this.saveRotation = this.saveRotation.bind(this);
  }

  componentDidMount() {
    const { activeUser } = this.props;
    this.setState({ batters: activeUser.batters, pitchers: activeUser.pitchers })
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    const battersOrPitchers = this.props.gameSetUp.isLineupSet ? 'pitchers' : 'batters';
    this.setState({
      [battersOrPitchers]: arrayMove(this.state[battersOrPitchers], oldIndex, newIndex),
    });
  };

  clickStats(idx, bool) {
    const battersOrPitchers = this.props.gameSetUp.isLineupSet ? 'pitchers' : 'batters';
    this.setState({ displayStats: bool, playerToDisplay: this.state[battersOrPitchers][idx] })
  }

  saveLineup(lineup, isHome, bool, isComputer) {
    this.props.setLineup(lineup, isHome, bool, isComputer);
    const { awayTeam, homeTeam } = this.props.gameSetUp;
    socket.emit('lineup saved', lineup, isHome, awayTeam, homeTeam);
  }

  saveRotation(rotation, isHome) {
    this.props.setRotation(rotation, isHome);
    const { awayTeam, homeTeam } = this.props.gameSetUp;
    socket.emit('rotation saved', rotation, isHome, awayTeam, homeTeam);
  }

  render() {
    const { gameSetUp, activeUser } = this.props;
    let isComputer = activeUser.userInfo.id === 3;
    let isBatter = !gameSetUp.isLineupSet;
    let isHome = gameSetUp.homeTeam === activeUser.userInfo.teamName;
    // console.log(this.state)
    return (
      <div id="choose-lineup">
        {
          gameSetUp.isLineupSet
            ? [
              <Lineup key={1} players={this.state.pitchers} onSortEnd={this.onSortEnd} axis={'xy'} clickStats={this.clickStats} isBatter={isBatter} />,
              <div key={2} id="lineup-button-and-card">
                <div>
                  <NavLink to="/game/play" onClick={() => this.saveRotation(this.state.pitchers, isHome)}><button className="lineup-advance-button">All set? Play ball!</button></NavLink>
                  <NavLink to="/game/choose-lineup" onClick={() => this.saveLineup(this.state.batters, isHome, false, isComputer)}><button id="back-to-lineup-button">Back to lineup</button></NavLink>
                </div>
                {
                  this.state.displayStats &&
                  <SinglePitcher
                    isLineup={true}
                    thisPitcher={this.state.playerToDisplay}
                    clickStats={this.clickStats} />
                }
              </div>
            ]
            : [
              <Lineup key={1} players={this.state.batters} onSortEnd={this.onSortEnd} axis={'xy'} clickStats={this.clickStats} isBatter={isBatter} />,
              <div key={2} id="lineup-button-and-card">
                <NavLink to="/game/choose-rotation" className="animated zoomIn" onClick={() => this.saveLineup(this.state.batters, isHome, true, isComputer)}><button className="lineup-advance-button">Select your pitching rotation</button></NavLink>
                {
                  this.state.displayStats &&
                  <SingleBatter
                    isLineup={true}
                    thisBatter={this.state.playerToDisplay}
                    clickStats={this.clickStats} />
                }
              </div>
            ]
        }
      </div>
    )
  }
}

const mapState = state => {
  return {
    activeUser: state.user.activeUser,
    gameSetUp: state.gameSetUp
  }
}

const mapDispatch = dispatch => {
  return {
    loadPlayers(id, active) {
      dispatch(fetchUserBatters(id, active));
      dispatch(fetchUserPitchers(id, active))
    },
    setLineup(lineup, isHome, bool, isComputer) {
      dispatch(setLineup(lineup, isHome, bool, isComputer));
    },
    setRotation(rotation, isHome) {
      dispatch(setRotation(rotation, isHome));
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(ChooseLineup));