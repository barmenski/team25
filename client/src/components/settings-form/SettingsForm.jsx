import React, { useState, useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { MainContext } from '../../contexts/mainContext';
import { SocketContext } from '../../contexts/socketContext';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Switch,
  Flex,
  Spacer,
  Select,
} from '@chakra-ui/react';
import { NumberInputElem } from './NumberInput';
import GameCard from '../cards/GameCard';
import AddCard from '../cards/AddCard';
import NewGameCard from '../cards/NewGameCard';
import cup from '../../assets/icons/Cup.png';
import J from '../../assets/icons/J.png';
import Q from '../../assets/icons/Q.png';
import K from '../../assets/icons/K.png';
import A from '../../assets/icons/A.png';
import styles from '../../pages/lobby.module.scss';

const fibonacciCards = ['0', '1', '2', '3', '5', '8', cup];

const TshirtsCards = ['XS', 'S', 'M', 'L', 'XL', cup];

const PlayingCards = ['6', '7', J, Q, K, A, cup];

const SettingsForm = () => {
  const socket = useContext(SocketContext);
  const { settings, setSettings } = useContext(MainContext);

  let cards =
    settings.scoreType === 'FN'
      ? fibonacciCards
      : settings.scoreType === 'TS'
      ? TshirtsCards
      : settings.scoreType === 'PC'
      ? PlayingCards
      : null;

  socket.on('getSettings', (settings) => {
    setSettings(settings);
  });

  const dispatch = useDispatch();

  const [isNewCard, setIsNewCard] = useState(false);

  const handleIsMasterSelect = () => {
    const currentSettings = { ...settings, isMaster: !settings.isMaster };
    socket.emit('setSettings', { currentSettings });
  };

  useEffect(() => {
    if (settings.isMaster) {
      dispatch({ type: 'SET_IS_OBSERVER', payload: false });
    } else {
      dispatch({ type: 'SET_IS_OBSERVER', payload: true });
    }
  });

  const handleChangigngSelect = () => {
    const currentSettings = {
      ...settings,
      isChanging: !settings.isChanging,
    };
    socket.emit('setSettings', { currentSettings });
  };

  const handleIsTimerSelect = () => {
    const currentSettings = {
      ...settings,
      isTimer: !settings.isTimer,
    };
    socket.emit('setSettings', { currentSettings });
  };

  const handleTypesSelect = (e) => {
    const currentSettings = {
      ...settings,
      scoreType: e.target.value,
    };
    socket.emit('setSettings', { currentSettings });
  };

  const handleMinutesChange = (e) => {
    const currentSettings = {
      ...settings,
      minutes: e,
    };
    socket.emit('setSettings', { currentSettings });
  };

  const handleSecondsChange = (e) => {
    const currentSettings = {
      ...settings,
      seconds: e,
    };
    socket.emit('setSettings', { currentSettings });
  };

  const handleAddClick = (e) => {
    setIsNewCard(true);
  };

  const handleNewCardClick = (value) => {
    cards.push(value);
    setIsNewCard(false);
  };

  const handleDelCardClick = (e) => {
    setIsNewCard(false);
  };

  return (
    <>
      <Heading className={styles.blocksTitle}>Game settings:</Heading>
      <Box maxW='550px' ml='36px' mr='36px'>
        <FormControl id='settings'>
          <Flex mb='20px'>
            <FormLabel mb='0' fontSize='lg'>
              Scram master as player:
            </FormLabel>
            <Spacer />
            <Switch colorScheme={'facebook'} onChange={handleIsMasterSelect} />
          </Flex>
          <Flex mb='20px'>
            <FormLabel mb='0' fontSize='lg'>
              Changing card in round end:
            </FormLabel>
            <Spacer />
            <Switch colorScheme={'facebook'} onChange={handleChangigngSelect} />
          </Flex>
          <Flex mb='20px'>
            <FormLabel mb='0' fontSize='lg'>
              Is timer needed:
            </FormLabel>
            <Spacer />
            <Switch colorScheme={'facebook'} onChange={handleIsTimerSelect} />
          </Flex>
          <Flex mb='20px'>
            <FormLabel mb='0' fontSize='lg'>
              Score type:
            </FormLabel>
            <Spacer />
            <Select
              placeholder='Select score type'
              w='50%'
              onChange={handleTypesSelect}
            >
              <option value='FN'>Fibonacci Numbers</option>
              <option value='TS'>T-shirts Size</option>
              <option value='PC'>Playing Cards</option>
            </Select>
          </Flex>
          <Flex mb='20px'>
            <FormLabel mb='0' fontSize='lg'>
              Score type (Short):
            </FormLabel>
            <Spacer />
            <Box fontSize={30} fontWeight='bold' h='30px'>
              {settings.scoreType}
            </Box>
          </Flex>
          {settings.isTimer ? (
            <Flex mb='20px'>
              <FormLabel mb='0' fontSize='lg'>
                Round time:
              </FormLabel>
              <Spacer />
              <Flex>
                <Box>
                  <FormLabel mb='0' fontSize='sm'>
                    Minutes
                  </FormLabel>
                  <NumberInputElem
                    minVal={0}
                    maxVal={5}
                    onChangeFn={handleMinutesChange}
                  />
                </Box>
                <Box fontSize={28} fontWeight='bold' lineHeight='80px'>
                  :
                </Box>
                <Box>
                  <FormLabel mb='0' fontSize='sm'>
                    Seconds
                  </FormLabel>
                  <NumberInputElem
                    minVal={0}
                    maxVal={60}
                    onChangeFn={handleSecondsChange}
                  />
                </Box>
              </Flex>
            </Flex>
          ) : null}
        </FormControl>
        {cards === null ? (
          <Box h='180px'></Box>
        ) : (
          <>
            <FormLabel mb='0' fontSize='lg'>
              Add card values:
            </FormLabel>
            <Flex wrap='wrap'>
              {cards.map((card) => (
                <GameCard
                  key={card}
                  scoreType={settings.scoreType}
                  image={card}
                />
              ))}
              {!isNewCard ? (
                <AddCard addClick={handleAddClick} />
              ) : (
                <NewGameCard
                  scoreType={settings.scoreType}
                  addClick={handleNewCardClick}
                  deleteClick={handleDelCardClick}
                />
              )}
            </Flex>
          </>
        )}
      </Box>
    </>
  );
};

export default SettingsForm;
