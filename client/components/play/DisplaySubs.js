import React from 'react';
import onClickOutside from 'react-onclickoutside';
import socket from '../../socket';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class DisplaySubs extends React.Component {
  constructor() {
    super();
    this.insert = this.insert.bind(this);
  }

  handleClickOutside() {
    this.props.display('displayBench', false)
    this.props.display('displayBullpen', false)
  }

  insert(player) {
    const { isBench, display } = this.props;
    const { bench, bullpen, currentOrder, homeTeam } = this.props.gameState;
    if (isBench) {
      currentOrder[0] = player;
      const newBench = bench.filter(reserve => reserve.id !== player.id);
      socket.emit('update game state', { batter: player, currentOrder, bench: newBench }, homeTeam)
      display('displayBench', false);
    } else {
      const newBullpen = bullpen.filter(reliever => reliever.id !== player.id);
      socket.emit('update game state', { pitcher: player, bullpen: newBullpen }, homeTeam);
      display('displayBullpen', false);
    }
  }

  render() {
    const { display, isBench } = this.props;
    const { bench, bullpen } = this.props.gameState;
    const title = isBench ? 'Bench' : 'Bullpen';
    const subType = isBench ? bench : bullpen;

    return (
      <div className="sub animated fadeIn">
        <h3>{title} <button className="sub-button" onClick={() => display(`display${title}`, false)}>Hide {title}</button></h3>
        {subType.map((player, idx) => {
          return (
            <p key={player.id}>{player.name}, {player.position}
              <button className="sub-button" onClick={() => this.insert(player)}>Insert</button>
            </p>
          )
        })}
      </div>
    )
  }
}

const mapState = state => {
  return {
    gameState: state.play
  }
}

export default withRouter(connect(mapState)(onClickOutside(DisplaySubs)));
