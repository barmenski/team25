import React, { useContext, useState } from 'react';
import { VStack, Flex } from '@chakra-ui/react';
import Issues from '../components/issues/Issues';
import '../App';
import { UserNavGame } from '../components/userNavigation/userNavigationGame';

import { RoundControl } from '../components/roundControl/RoundControl';
import { ScoreTable } from '../components/score/ScoreTable';
import { MainLayout } from '../components/mainLayout/mainLayout';

import GameCard from '../components/cards/GameCard';
import cup from '../assets/icons/Cup.png';
import J from '../assets/icons/J.png';
import Q from '../assets/icons/Q.png';
import K from '../assets/icons/K.png';
import A from '../assets/icons/A.png';
import { useSelector } from 'react-redux';
import { Statistics } from '../components/statistics/Statistics';
import { SocketContext } from '../contexts/socketContext';
import { MainContext } from '../contexts/mainContext';
import { useHistory } from 'react-router';
import styles from './game.module.scss';

const fibonacciCards = ['0', '1', '2', '3', '5', '8', cup];

const TshirtsCards = ['XS', 'S', 'M', 'L', 'XL', cup];

const PlayingCards = ['6', '7', J, Q, K, A, cup];

function GameMasterPage() {
  const [timerStatus, setTimerStatus] = useState(false);
  const [isRestarted, setIsRestarted] = useState(false);
  const socket = useContext(SocketContext);
  const { room } = useContext(MainContext);
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const [endGame, setEndGame] = useState(false);
  const { settings } = useContext(MainContext);

  socket.on('getTimerStatus', ({ currentStatus }) => {
    setTimerStatus(currentStatus);
  });

  socket.on('link', () => {
    history.push('/game-result');
  });

  const image = '';
  socket.on('restarted', (status) => {
    setEndGame(false);
    setIsRestarted(status);
    socket.emit('editUser', { room, image });
  });

  socket.on('endGame', () => {
    setEndGame(true);
  });

  let cards =
    settings.scoreType === 'FN'
      ? fibonacciCards
      : settings.scoreType === 'TS'
      ? TshirtsCards
      : settings.scoreType === 'PC'
      ? PlayingCards
      : PlayingCards;

  return (
    <MainLayout>
      <Flex className={styles.mastersFlexBlock}>
        <VStack className={styles.mastersBlock}>
          <UserNavGame />
          <Flex className={styles.issues_timer_block}>
            <Issues />
            <RoundControl mt={85} />
          </Flex>
          <Flex
            w="90%"
            direction="row"
            justify="space-between"
            align="flex-start"
            flexWrap="wrap"
            className={
              timerStatus === true ||
              !settings.isTimer ||
              (timerStatus === 'stopped' && settings.isChanging)
                ? 'active'
                : 'inActive'
            }
          >
            {!user.isObserver
              ? cards.map((card) => (
                  <GameCard
                    key={card}
                    scoreType={settings.scoreType}
                    image={card}
                    isRestarted={isRestarted}
                  />
                ))
              : null}
          </Flex>
          {timerStatus === 'stopped' || endGame ? (
            <Flex direction="column" paddingTop="20px">
              <Statistics />
            </Flex>
          ) : null}
        </VStack>
        <Flex className={styles.scoreTableBlock}>
          <ScoreTable />
        </Flex>
      </Flex>
    </MainLayout>
  );
}

export default GameMasterPage;
