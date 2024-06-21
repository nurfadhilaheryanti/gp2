import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

const SocketContext = createContext({
    call: {},
  callAccepted: false,
  myVideo: null,
  userVideo: null,
  stream: null,
  callEnded: false,
  name: '',
  me: '',
  callUser: () => {},
  leaveCall: () => {},
  answerCall: () => {},
  setName: () => {},
  setMe: () => {},
  setStream: () => {},
  setCall: () => {}
});

const socket = io('http://localhost:3000');
// const socket = io('https://gp2.nfahilehe.online');

const ContextProvider = ({ children }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState(null);
  const [name, setName] = useState('');
  const [me, setMe] = useState('');
  const [call, setCall] = useState({})


  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();


  const answerCall = () => {
    setCallAccepted(true);
    console.log("callAccepted true");

    const peer = new Peer({ initiator: false, trickle: false, stream });


    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: call.from });
    });

    //tambahin peer untuk set ref dan statenya

    socket.on('callUser', ({ from, name: callerName, signal }) => {
      // Jadinya ini ga bisa kepake ke sebelah !
      setCall({ isReceivingCall: true, from, name: callerName, signal });
      peer.signal(call.signal);
    });

    peer.on('stream', (currentStream) => {
      //ini jadi video yg nelp
      userVideo.current.srcObject = currentStream;
    });


    connectionRef.current = peer;
    console.log('nyampe ga');
  };

  const callUser = (id) => {
    // Create a new Peer object to handle the WebRTC connection.
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('callUser', { userToCall: id, signalData: data, from: me, name });
    });

    peer.on('stream', (currentStream) => {
      //ini video yg ditelp
      userVideo.current.srcObject = currentStream;
    });

    socket.on('callAccepted', (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });
    console.log('call user nymape ga');

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);

    connectionRef.current.destroy();

    window.location.reload();
  };

  return (
    <SocketContext.Provider value={{
      call,
      callAccepted,
      myVideo,
      userVideo,
      stream,
      name,
      setName,
      callEnded,
      me,
      callUser,
      leaveCall,
      answerCall,
      setMe,
      setStream,
      setCall
    }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };