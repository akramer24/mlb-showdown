import SimpleWebRTC from 'simplewebrtc';

const webrtc = new SimpleWebRTC({
  // the id/element dom element that will hold "our" video
  localVideoEl: 'localVideo',
  // the id/element dom element that will hold remote videos
  remoteVideosEl: 'remoteVideos',
  // immediately ask for camera access
  // autoRequestMedia: true
});

webrtc.on('connectionReady', sessionId => {
  webrtc.on('connect video feed to room', homeTeam => {
    webrtc.joinRoom(homeTeam);
    webrtc.startLocalVideo();
  });

  webrtc.on('disconnect video feed from room', () => {
    // webrtc.leaveRoom();
    webrtc.stopLocalVideo();
  })
})

export default webrtc;
