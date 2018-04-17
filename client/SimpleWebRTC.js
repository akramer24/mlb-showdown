import SimpleWebRTC from 'simplewebrtc';

const webrtc = new SimpleWebRTC({
  localVideoEl: 'localVideo',
  remoteVideosEl: 'remoteVideos'
});

webrtc.on('connectionReady', sessionId => {
  webrtc.on('connect video feed to room', homeTeam => {
    webrtc.startLocalVideo();
    webrtc.joinRoom(homeTeam);
  });

  webrtc.on('pause stream', () => webrtc.pause());

  webrtc.on('resume stream', () => webrtc.resume());

  webrtc.on('stop stream', () => {
    webrtc.stopLocalVideo();
  })
})

export default webrtc;