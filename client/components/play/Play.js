import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { rollDice, setTurn, pitchAndSwing, handleNextInning } from '../utils/play';
import { BoardButtons, Diamond, Scoreboard, Lineup, Video } from './index';
import store, { updateGameState, gameOverGetCash, resetGameState, resetGameSetup } from '../../store';
import socket from '../../socket';
import history from '../../history';
import webrtc from '../../SimpleWebRTC';

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

  componentWillReceiveProps(nextProps) {
    const { isGameOver, inning, half, currentScore, awayScore, homeScore, homeTeam, awayTeam, userSocketId, challengerSocketId } = nextProps.gameState;
    const { gameOver, userInfo } = this.props;
    const { id, cash, teamName, wins, losses } = userInfo;
    if (!isGameOver && ((inning >= 9 && half === 'bottom' && currentScore > awayScore) || (inning >= 10 && half === 'top' && homeScore < awayScore))) {
      let isWinner;
      if ((inning >= 9 && half === 'bottom' && currentScore > awayScore) && teamName === homeTeam) {
        isWinner = true;
      } else if ((inning >= 10 && half === 'top' && homeScore < awayScore) && teamName === awayTeam) {
        isWinner = true;
      } else {
        isWinner = false;
      }
      gameOver(id, cash, wins, losses, isWinner);
      socket.emit('update game state', { isGameOver: true }, homeTeam);
      setTimeout(() => {
        socket.emit('game over', homeTeam, userSocketId, challengerSocketId, id);
        webrtc.stopLocalVideo();
        webrtc.leaveRoom();
        store.dispatch(resetGameState());
        store.dispatch(resetGameSetup());
        history.push(`/users/${id}`)
      }, 5000)
    }
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
      rollDice.call(this, homeTeam);
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
    const { half, homeTeam, awayTeam, turn, result, totalPAs, isGameOver } = this.props.gameState;
    const { teamName } = this.props.userInfo;

    if (!isGameOver && (e.keyCode === 82) && ((half === 'top' && homeTeam === teamName) || (half === 'bottom' && awayTeam === teamName)) && (result.length > 0 || totalPAs === 0)) this.handleRoll();

    if ((e.keyCode === 80) && ((half === 'top' && homeTeam === teamName && turn === 'pitcher') ||
      (half === 'top' && awayTeam === teamName && turn === 'batter') ||
      (half === 'bottom' && awayTeam === teamName && turn === 'pitcher') ||
      (half === 'bottom' && homeTeam === teamName && turn === 'batter')) &&
      (result.length === 0 && totalPAs !== 0)) pitchAndSwing.call(this);
  }

  render() {
    const {
      half,
      inning,
      awayScore,
      homeScore,
      currentScore,
      awayTeam,
      homeTeam
    } = this.props.gameState;

    const { awayRotation, homeRotation, userInfo } = this.props;

    return (
      <div id="board" autoFocus onKeyDown={this.onKeyPressed} tabIndex="0" >
        {
          (inning >= 9 && half === 'bottom' && currentScore > awayScore) && <h1 className="board-winner-alert animated zoomIn">{homeTeam} wins!</h1>
        }
        {
          (inning >= 10 && half === 'top' && homeScore < awayScore) && <h1 className="board-winner-alert animated zoomIn">{awayTeam} wins!</h1>
        }
        <Video />
        <BoardButtons
          key={'board-buttons'}
          handleNextInning={handleNextInning.bind(this)}
          handleRoll={this.handleRoll}
          pitchAndSwing={pitchAndSwing.bind(this)}
        />
        <Diamond key={'diamond'} display={this.display} />
        <Scoreboard key={'scoreboard'} />
        <Lineup key={'lineup'} />
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
    userInfo: state.user.activeUser.userInfo
  }
}

const mapDispatch = dispatch => {
  return {
    gameOver(userId, userCash, wins, losses, isWinner) {
      dispatch(gameOverGetCash(userId, userCash, wins, losses, isWinner));
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(Play));