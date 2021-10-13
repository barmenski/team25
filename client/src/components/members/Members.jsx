import React, { useState, useContext } from 'react';
import { Box, Heading, Flex } from '@chakra-ui/react';
import OneMember from './OneMember';
import NoMembersCard from './NoMembersCard';
import { Modal } from '../modal/modal';
import { KickPlayerModal } from '../modals/KickPlayerModal';
import { DeletePlayerModal } from '../modals/DeletePlayerModal';
import { UsersContext } from '../../contexts/usersContext';
import { SocketContext } from '../../contexts/socketContext';
import styles from '../../pages/lobby.module.scss';

const Members = () => {
  const [modalActive, setModalActive] = useState(false);
  const [deletedUser, setDeletedUser] = useState('');
  const [kicker, setKicker] = useState('');
  const [voteSet, setVoteSet] = useState('');
  const { users } = useContext(UsersContext);
  const socket = useContext(SocketContext);

  let arrayMembers = users.filter((user) => user.isMaster === false);

  socket.on('willPlayerKick', ({deletedUser, kicker, voteSet}) => {
    setDeletedUser(deletedUser);
    setKicker(kicker);
    setVoteSet(voteSet);
    setModalActive(true);
  });

  const handleDelClick = (idd, openModal) => {
    setDeletedUser(getDeletedUser(idd));
    setKicker('');
    openModal && setModalActive(true);
  }

  const getDeletedUser = (idd) => {
    return (users.filter((user) => user.idd === idd))[0];
  }

  const getMemberName = () => {
    let memberName = '';
    arrayMembers.forEach((member) => {
      if (member.idd === deletedUser.idd) {
        memberName = member.fullName;
      }
    });
    return memberName;
  };

  return (
    <>
      <Box maxW='1200px' mt='20px' mb='20px'>
        <Heading className={styles.blocksTitle}>
          Members:
        </Heading>
        <Flex maxW='1200px' wrap='wrap'>
          {arrayMembers.length ? (
            arrayMembers.map((member) => (
              <OneMember
                key={member.idd}
                member={member}
                deleteClick={handleDelClick}
              />
            ))
          ) : (
            <NoMembersCard />
          )}
        </Flex>
      </Box>
      <Modal active={modalActive} setActive={setModalActive} closeOnOverlayClick={false} >
        {kicker !== ''
          ? <DeletePlayerModal 
              kicker={kicker} 
              deletedUser={deletedUser} 
              voteSet={voteSet}
              onClose={setModalActive}
            />
          : <KickPlayerModal
              id={deletedUser.idd}
              memberName={getMemberName()}
              onClose={setModalActive}
            />
          }
      </Modal>
    </>
  );
};

export default Members;
