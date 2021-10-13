import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { MainLayout } from '../../components/mainLayout/mainLayout';
import { Flex, Button, Box, Image } from '@chakra-ui/react';
import { SocketContext } from '../../contexts/socketContext';
import { IssuesContext } from '../../contexts/issuesContext';
import IssueItem from '../../components/issues/IssueItem';
import NoIssuesCard from '../../components/issues/NoIssuesCard';
import { IssuesListLine } from '../../components/userNavigation/IssuesListLine';
import { Modal } from '../../components/modal/modal';
import { YouAreDeletedModal } from '../../components/modals/YouAreDeletedModal';

export const ResultPage = () => {
  const [modalActive, setModalActive] = useState(false);
  const { issues } = useContext(IssuesContext);
  const [isSession, setIsSession] = useState(true);
  const socket = useContext(SocketContext);
  const history = useHistory();

  const modalShowFunc = () => {
    setModalActive(true);
    setTimeout(() => {
      setModalActive(false);
      history.push('/');
    }, 3000);
  };

  const handleExitClick = () => {
    console.log('socket.id', socket.id)
    socket.emit('leaveSession', socket.id);
    modalShowFunc();
  };

  useEffect(() => {
    socket.on('endOfSession', () => {
      setIsSession(false);
      modalShowFunc();
    });
  }, []);

  const countResult = (count, votes) => {
    return ((count / votes) * 100).toFixed(1) + '%';
  };

  return (
    <MainLayout>
      <Flex direction='column' justify='space-around' h='100%'>
        <Flex justifyContent={'space-between'} alignItems={'center'}>
          <IssuesListLine />
          <Button
            variant={'outline'}
            colorScheme={'facebook'}
            w='160px'
            onClick={handleExitClick}
          >
            Leave session
          </Button>
        </Flex>

        <Flex justify='space-around' h='100%'>
          <Flex direction='column' justify='space-around'>
            <Flex maxW='1200px' wrap='wrap' flexDirection='column'>
              {issues.length ? (
                issues.map((item) => (
                  <div key={item.id}>
                    <IssueItem
                      key={item.id}
                      issue={item}
                      onClick={() => false}
                    />
                    <Flex justify='center' flexWrap='wrap' className='test'>
                      {item.statistic.map(({ score, count }) =>
                        score.length < 10 ? (
                        <Flex 
                          direction='column' 
                          justify='center' 
                          textAlign='center'
                          marginRight='10px' 
                          key={score}
                        >
                            <Box
                              fontSize={40}
                              fontWeight='bold'
                              justify='center'
                            >
                              {score}
                            </Box>
                            <Box
                              fontWeight='700'
                              fontSize='30px'
                              justify='center'
                            >
                              {countResult(count, item.votes)}
                            </Box>
                          </Flex>
                        ) : (
                          <Flex direction='column' alignItems='center' p='10px' key={score}>
                            <Image
                              src={score}
                              alt='Card-image'
                              boxSize='60px'
                              objectFit='cover'
                            />
                            <Box fontWeight='700' fontSize='30px'>
                              {countResult(count, item.votes)}
                            </Box>
                          </Flex>
                        )
                      )}
                    </Flex>
                  </div>
                ))
              ) : (
                <NoIssuesCard />
              )}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Modal active={modalActive} setActive={setModalActive}>
        <YouAreDeletedModal isSession={isSession} />
      </Modal>
    </MainLayout>
  );
};
