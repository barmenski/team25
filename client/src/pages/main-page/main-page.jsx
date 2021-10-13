import React, { useContext, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Input, Flex, Img } from '@chakra-ui/react';

import { MainLayout } from '../../components/mainLayout/mainLayout';
import { ButtonComponent } from '../../components/button/button';
import { Modal } from '../../components/modal/modal';
import { FormComponent } from '../../components/form/form';
import { SocketContext } from '../../contexts/socketContext';
import { UsersContext } from '../../contexts/usersContext';
import { MainContext } from '../../contexts/mainContext';
import mainLogo from '../../assets/icons/mainLogo.png';
import styles from './main-page.module.scss';

export const MainPage = () => {
  const [modalActive, setModalActive] = useState(false);
  const [urlInputVal, setUrlInputVal] = useState('');
  const [isObserver, setIsObserver] = useState(false);
  const socket = useContext(SocketContext);
  const { setUsers } = useContext(UsersContext);
  const { setName, rooms, setRooms, room, setRoom, setSettings } = useContext(MainContext);
  const USER_ID = new Date().valueOf();
  const dispatch = useDispatch();
  const handleIsObserverSwitch = () => {
    isObserver ? setIsObserver(false) : setIsObserver(true);
    isObserver
      ? dispatch({ type: 'SET_IS_OBSERVER', payload: false })
      : dispatch({ type: 'SET_IS_OBSERVER', payload: true });
  };

  socket.on('users', (users) => {
    setUsers(users);
  });

  socket.on('rooms', (rooms) => {
    setRooms(rooms);
  });

  const handleIsMasterClick = (param) => {
    dispatch({ type: 'SET_IS_MASTER', payload: param });
  };

  useEffect(()=>{
    socket.on('getMemberSettings', (settings) => {
       setSettings(settings);
    });
  },[room])
  

  const handleInputChange = (e) => {
    socket.emit('getRooms');
    setUrlInputVal(e.target.value);
  };

  const handleOpenMasterModalClick = () => {
    handleIsMasterClick(true);
    const currentRoom = new Date().valueOf();

    socket.emit('addRoom', { currentRoom }, (error) => {
      if (error) {
        console.log(error);
      } else console.log(`Add ${currentRoom} room`);
    });

    setRoom(currentRoom);
    setName(`${USER_ID}`);
    setModalActive(true);
  };

  const handleOpenMemberModalClick = () => {
    handleIsMasterClick(false);
    if (urlInputVal === '') {
      setUrlInputVal('Input rooms ID');
      return;
    } else {
      if (!rooms.includes(+urlInputVal)) {
        setUrlInputVal('Input CORRECT rooms ID');
        return;
      } 
    const room = +urlInputVal;
    const id = socket.id;
    socket.emit('getCurrentMemberSettings', ({room, id}))

    setRoom(room);
    setModalActive(true);
    setName(`${USER_ID}`);
    setUrlInputVal('');
    }
  };

  return (
    <MainLayout>
      <div className={styles.wrapperInner}>
        <div className={styles.mainLogo_block}>
          <Img src={mainLogo} alt="mainLogo" className={styles.mainLogo} />
        </div>
        <div className={styles.connect_block}>
          <h2 className={styles.connect_title}>Start your planning:</h2>
          <div className={styles.connect_flex}>
            <h3 className={styles.connect_subtitle}>Create session:</h3>
            <ButtonComponent
              width={241}
              textContent={'Start new game'}
              height={47}
              variant={'solid'}
              colorScheme={'facebook'}
              onClick={handleOpenMasterModalClick}
            />
          </div>
        </div>
        <div className={styles.connect_block}>
          <h2 className={styles.connect_title}>OR:</h2>
          <div
            className={styles.connect_flex}
            style={{ flexDirection: 'column' }}
          >
            <h3 className={styles.connect_subtitle}>
              Connect to lobby by{' '}
              <span style={{ fontWeight: 'bold', color: '#66999b' }}>ID</span>:
            </h3>
            <Flex paddingBottom={'10px'} className={styles.connect_flex}>
              <Input
                value={urlInputVal}
                variant="outline"
                width={276}
                height={47}
                focusBorderColor="black"
                type="text"
                id="urlInput"
                onChange={handleInputChange}
              />
              <ButtonComponent
                variant="solid"
                width={241}
                height={47}
                textContent="Connect"
                colorScheme="facebook"
                onClick={handleOpenMemberModalClick}
              />
            </Flex>
          </div>
        </div>
      </div>
      <Modal active={modalActive} setActive={setModalActive}>
        <div className={styles.registration}>
          <div className={styles.registration__block}>
            <h2 className={styles.modal__title}>Connect to lobby</h2>
            <div>
              <h3>Connect as Observer</h3>
              <Switch size="md" onChange={handleIsObserverSwitch} />
            </div>
          </div>
          <FormComponent>
            <div className={styles.form__control}>
              <ButtonComponent
                width={189}
                height={'60px'}
                textContent={'Confirm'}
                variant="solid"
                colorScheme="facebook"
                type={'submit'}
              />
              <ButtonComponent
                width={189}
                height={'60px'}
                textContent={'Cancel'}
                variant="outline"
                colorScheme="facebook"
                onClick={() => {
                  setModalActive(false);
                  document.body.style.overflowY = 'visible';
                }}
              />
            </div>
          </FormComponent>
        </div>
      </Modal>
    </MainLayout>
  );
};
