import React from 'react';
import io from 'socket.io-client';

const SocketContext = React.createContext();

const SocketProvider = ({ children }) => {
  //const ENDPOINT = 'http://localhost:5000/';
  const ENDPOINT = 'https://team25.herokuapp.com/';
  const socket = io(ENDPOINT, { transports: ['websocket', 'polling'] });

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export { SocketContext, SocketProvider };
