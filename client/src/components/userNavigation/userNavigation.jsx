import { Fragment, useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
} from '@chakra-ui/react';
import OneMember from '../members/OneMember';
import { UsersContext } from '../../contexts/usersContext';
import { SocketContext } from '../../contexts/socketContext';
import { MainContext } from '../../contexts/mainContext';
import { IssuesListLine } from './IssuesListLine';
import { FinishSessionModal } from '../modals/FinishSessionModal';
import { Modal } from '../modal/modal';
import { ErrorBoundary } from '../errorBoundary/errorBoundary';

export const UserNav = () => {
  const history = useHistory();
  const [modalActive, setModalActive] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const { users } = useContext(UsersContext);
  const master = users.filter((user) => user.isMaster === true)[0];
  const socket = useContext(SocketContext);
  const { room } = useContext(MainContext);
  const { minutes, seconds } = useSelector((state) => state.timer);

  const handleCopy = () => {
    const copyText = document.getElementById('URL-Input');
    copyText.select();
    document.execCommand('copy');
    alert('Copied the text: ' + copyText.value);
  };

  const handleStartGame = () => {
    const link = '/game-master';
    const isGame = true;
    const currentCount = Number(minutes * 60 + Number(seconds));
    socket.emit('addTimer', { currentCount, room });
    socket.emit('changePage', { room, isGame });
    history.push(link);
  };

  const handleCancelGameClick = () => {
    socket.emit('finishSession', { room }, (error) => {
      if (error) {
        console.log(error);
      } else console.log(`Session is finished`);
    });
  };

  useEffect(() => {
    socket.on('endOfSession', () => {
      setModalActive(true);
      setTimeout(() => {
        setModalActive(false);
        history.push('/');
      }, 3000);
    });
  }, []);

  return (
    <Fragment>
      <IssuesListLine />
      <Box>
        <Text fontSize='16px'>Scram master:</Text>
        <ErrorBoundary>
          <OneMember member={master} />
        </ErrorBoundary>
      </Box>
      <Box mt="10px" mb="20px">
        <FormControl>
          <FormLabel>ID to join the lobby:</FormLabel>
          <Flex>
            <Input
              w={276}
              h={47}
              defaultValue={master ? master.room : ''}
              id="URL-Input"
              onChange={(e) => setSessionId(e.value)}
            ></Input>
            <Button
              w={189}
              h={47}
              colorScheme={'facebook'}
              onClick={handleCopy}
            >
              Copy
            </Button>
          </Flex>
        </FormControl>
      </Box>
      <Flex justifyContent={'space-between'} maxW="464px">
        <Button onClick={handleStartGame} colorScheme={'facebook'}>
          Start Game
        </Button>
        <Button
          variant={'outline'}
          colorScheme={'facebook'}
          onClick={handleCancelGameClick}
        >
          Cancel game
        </Button>
      </Flex>
      <Modal active={modalActive} setActive={setModalActive}>
        <FinishSessionModal />
      </Modal>
    </Fragment>
  );
};
