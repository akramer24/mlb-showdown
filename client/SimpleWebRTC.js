import SimpleWebRTC from 'simplewebrtc';
import socket from './socket';

const webrtc = new SimpleWebRTC({
  localVideoEl: 'localVideo',
  remoteVideosEl: 'remoteVideos'
});

webrtc.on('connectionReady', sessionId => {
  // webrtc.on('connect video feed to room', homeTeam => {
  //   webrtc.startLocalVideo();
  //   webrtc.joinRoom(homeTeam, (err, roomDescription) => {
  //     console.log('pre', roomDescription, err)
  //     for (let client in roomDescription.clients) {
  //       roomDescription.clients[client].audio = true;
  //       roomDescription.clients[client].video = true;
  //     }
  //     console.log('post', roomDescription)
  //     console.log(`${sessionId} has joined room ${homeTeam}`)
  //   });
  // });

  // webrtc.on('createdPeer', (peer) => {
  //   // console.log(peer);
  //   console.log(webrtc.getPeers(sessionId));
  // })

  webrtc.on('video chat requested', homeTeam => socket.emit('video chat requested', homeTeam));
  webrtc.on('create video room', homeTeam => {
    webrtc.createRoom(homeTeam);
    socket.emit('created video room', homeTeam);
  });
  webrtc.on('join video room', homeTeam => {
    webrtc.joinRoom(homeTeam, () => webrtc.startLocalVideo());
  })
  webrtc.on('pause stream', () => webrtc.pause());

  webrtc.on('resume stream', () => webrtc.resume());

  webrtc.on('stop stream', () => {
    webrtc.stopLocalVideo();
  })
})

export default webrtc;