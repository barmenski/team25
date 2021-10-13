import React, { useState } from 'react';

const MainContext = React.createContext();

const MainProvider = ({ children }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [rooms, setRooms] = useState([]);
  const [settings, setSettings] = useState({});
  const [isGame, setIsGame] = useState(false);

  return (
    <MainContext.Provider value={{ 
      name, 
      rooms, 
      room, 
      settings, 
      isGame,
      setName, 
      setRooms, 
      setRoom, 
      setSettings, 
      setIsGame }}>
      {children}
    </MainContext.Provider>
  );
};

export { MainContext, MainProvider };
