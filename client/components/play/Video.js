import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import socket from '../../socket';
import webrtc from '../../SimpleWebRTC';

class Video extends Component {
  constructor() {
    super();
    this.state = { hideAccept: false };
  }

  updateVideo(gameStateUpdate, homeTeam, shouldJoin) {
    if (shouldJoin) {
      socket.emit('join video room', homeTeam);
      this.setState({ hideAccept: true })
    }
    socket.emit('update game state', gameStateUpdate, homeTeam);
  }

  render() {
    const { teamName, gameState, homeRotation, awayRotation } = this.props;
    const { videoRoomCreated, displayVideo, videoRequestSentBy, videoRequestAcceptedBy, homeTeam } = gameState;
    const { hideAccept } = this.state;

    return (
      <div id="game-video">
        {
          displayVideo &&
          [
            <video id="localVideo" key={1}></video>,
            <div id="remoteVideos" key={2}></div>,
            <button
              key={4}
              id="pause-stream-button"
              onClick={() => {
                webrtc.emit('pause stream', homeTeam);
              }}>Pause</button>,
            <button
              key={5}
              id="resume-stream-button"
              onClick={() => {
                webrtc.emit('resume stream', homeTeam);
              }}>Resume</button>
          ]
        }
        {
          !displayVideo && (homeRotation.length && awayRotation.length) && !videoRoomCreated &&
          <button
            id="connect-video-button"
            onClick={() => this.updateVideo({ videoRequestSentBy: teamName, videoRoomCreated: true }, homeTeam, false)}
          >Send video chat request</button>
        }
        {
          videoRoomCreated && teamName !== null && teamName !== videoRequestSentBy && !hideAccept &&
          <div className="accept-video-buttons">
            <p>Your opponent wants to video chat!</p>
            <div id="accept-reject-video-buttons">
              <button onClick={() => this.updateVideo({ videoRequestAcceptedBy: teamName }, homeTeam, true)}>Accept</button>
              <button onClick={() => this.setState({ hideAccept: true })}>Reject</button>
            </div>
          </div>
        }
        {
          videoRoomCreated && teamName !== null && videoRequestAcceptedBy !== null && teamName !== videoRequestAcceptedBy && !hideAccept &&
          <div className="accept-video-buttons">
            <p>Your opponent has accepted your video chat request!</p>
            <button onClick={() => this.updateVideo({ displayVideo: true }, homeTeam, true)}>Start chatting</button>
          </div>
        }
      </div>
    )
  }
}

const mapState = state => {
  return {
    gameState: state.play,
    teamName: state.user.activeUser.userInfo.teamName,
    awayRotation: state.gameSetUp.awayRotation,
    homeRotation: state.gameSetUp.homeRotation
  }
}

export default withRouter(connect(mapState)(Video));
