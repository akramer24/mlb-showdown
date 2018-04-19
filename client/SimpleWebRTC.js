import SimpleWebRTC from 'simplewebrtc';
import socket from './socket';

const webrtc = new SimpleWebRTC({
  localVideoEl: 'localVideo',
  remoteVideosEl: 'remoteVideos'
});

webrtc.on('connectionReady', sessionId => {
  webrtc.on('video chat requested', homeTeam => socket.emit('video chat requested', homeTeam));
  webrtc.on('create video room', homeTeam => {
    webrtc.createRoom(homeTeam);
    socket.emit('created video room', homeTeam);
  });
  webrtc.on('join video room', homeTeam => webrtc.joinRoom(homeTeam, () => webrtc.startLocalVideo()));
  webrtc.on('pause stream', () => webrtc.pause());
  webrtc.on('resume stream', () => webrtc.resume());
  webrtc.on('stop stream', () => webrtc.stopLocalVideo());
})

export default webrtc;