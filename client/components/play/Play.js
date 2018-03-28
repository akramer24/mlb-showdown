import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { rollDice, setTurn, pitchAndSwing, handleNextInning } from '../utils/play';
import { BoardButtons, Diamond, Scoreboard, Lineup } from './index';
import store, { updateGameState } from '../../store';
import socket from '../../socket';

class Play extends Component {

  constructor() {
    super();
    this.handleRoll = this.handleRoll.bind(this);
    this.display = this.display.bind(this);
    this.onKeyPressed = this.onKeyPressed.bind(this);
    this.initializeState = this.initializeState.bind(this);
  }

  componentDidMount() {
    this.initializeState();
  }


  initializeState() {
    const { awayLineup, homeLineup, awayRotation, homeRotation, awayTeam, homeTeam } = this.props;
    socket.emit('update game state', {
      awayOrder: awayLineup.slice(0, 9),
      homeOrder: homeLineup.slice(0, 9),
      currentOrder: awayLineup.slice(0, 9),
      awayPitcher: awayRotation[0],
      homePitcher: homeRotation[0],
      batter: awayLineup[0],
      pitcher: homeRotation[0],
      awayTeam: awayTeam,
      homeTeam: homeTeam,
      awayBench: awayLineup.slice(9, 12),
      homeBench: homeLineup.slice(9, 12),
      bench: awayLineup.slice(9, 12),
      awayBullpen: awayRotation.slice(1, 5),
      homeBullpen: homeRotation.slice(1, 5),
      bullpen: homeRotation.slice(1, 5)
    }, homeTeam)
  }

  handleRoll() {
    const { batter, pitcher, totalPAs, homeTeam } = this.props.gameState;
    const int = setInterval(() => {
      rollDice.call(this);
    }, 100);
    setTimeout(() => {
      clearInterval(int);
      setTurn.call(this, this.props.gameState.roll, pitcher.control, batter.onBase, totalPAs, homeTeam)
    }, 650)
  }

  display(displayType, bool) {
    store.dispatch(updateGameState({ [displayType]: bool }))
  }

  onKeyPressed(e) {
    const { half, homeTeam, awayTeam, turn, result, totalPAs } = this.props.gameState;
    const { userTeamName } = this.props;

    if ((e.keyCode === 82) && ((half === 'top' && homeTeam === userTeamName) || (half === 'bottom' && awayTeam === userTeamName)) && (result.length > 0 || totalPAs === 0)) this.handleRoll();

    if ((e.keyCode === 80) && ((half === 'top' && homeTeam === userTeamName && turn === 'pitcher') ||
      (half === 'top' && awayTeam === userTeamName && turn === 'batter') ||
      (half === 'bottom' && awayTeam === userTeamName && turn === 'pitcher') ||
      (half === 'bottom' && homeTeam === userTeamName && turn === 'batter')) &&
      (result.length === 0 && totalPAs !== 0)) pitchAndSwing.call(this);
  }

  render() {
    const {
      turn,
      roll,
      result,
      printResult,
      totalPAs,
      half,
      inning,
      outs,
      awayOrder,
      homeOrder,
      currentOrder,
      awayPitcher,
      homePitcher,
      batter,
      pitcher,
      first,
      second,
      third,
      awayScore,
      homeScore,
      currentScore,
      inningRuns,
      awayHits,
      homeHits,
      currentHits,
      awayTeam,
      homeTeam,
      batterAttributes,
      pitcherAttributes,
      awayBench,
      homeBench,
      bench,
      awayBullpen,
      homeBullpen,
      bullpen,
      displayBench,
      displayBullpen
    } = this.props.gameState;

    const { homeRotation, awayRotation } = this.props;

    return (
      <div id="board" onKeyDown={this.onKeyPressed} tabIndex="0" >
        {
          (inning >= 9 && half == 'bottom' && homeScore > awayScore) && <h1>{homeTeam} wins!</h1>
        }
        {
          (inning >= 10 && half == 'top' && homeScore < awayScore) && <h1>{awayTeam} wins!</h1>
        }
        {
          (!homeRotation.length || !awayRotation.length) && <h1>Waiting for your opponent to submit lineup</h1>
        }
        <BoardButtons
          key={'board-buttons'}
          outs={outs}
          handleNextInning={handleNextInning.bind(this)}
          result={result}
          totalPAs={totalPAs}
          handleRoll={this.handleRoll}
          roll={roll}
          pitchAndSwing={pitchAndSwing.bind(this)}
          pitcher={pitcher}
          batter={batter}
          printResult={printResult}
          turn={turn}
          half={half}
          userTeamName={this.props.userTeamName}
          awayTeam={awayTeam}
          homeTeam={homeTeam}
          homeRotation={homeRotation}
          awayRotation={awayRotation}
        />
        <Diamond
          key={'diamond'}
          display={this.display}
          displayBench={displayBench}
          bench={bench}
          displayBullpen={displayBullpen}
          bullpen={bullpen}
          result={result}
          outs={outs}
          printResult={printResult}
          batterAttributes={batterAttributes}
          batter={batter}
          pitcherAttributes={pitcherAttributes}
          pitcher={pitcher}
          first={first}
          second={second}
          third={third}
          userTeamName={this.props.userTeamName}
          awayTeam={awayTeam}
          homeTeam={homeTeam}
          half={half}
          currentOrder={currentOrder}
        />
        <Scoreboard
          key={'scoreboard'}
          away={awayTeam}
          home={homeTeam}
          half={half}
          inning={inning}
          awayScore={awayScore}
          homeScore={homeScore}
          currentScore={currentScore}
          inningRuns={inningRuns}
          outs={outs}
          awayHits={awayHits}
          homeHits={homeHits}
          currentHits={currentHits}
        />
        <Lineup
          key={'lineup'}
          half={half}
          awayTeam={awayTeam}
          homeTeam={homeTeam}
          currentOrder={currentOrder}
        />
      </div>
    )
  }
}

const mapState = state => {
  return {
    awayLineup: state.gameSetUp.awayLineup,
    homeLineup: state.gameSetUp.homeLineup,
    awayRotation: state.gameSetUp.awayRotation,
    homeRotation: state.gameSetUp.homeRotation,
    awayTeam: state.gameSetUp.awayTeam,
    homeTeam: state.gameSetUp.homeTeam,
    gameState: state.play,
    userTeamName: state.user.activeUser.userInfo.teamName
  }
}

export default withRouter(connect(mapState)(Play));