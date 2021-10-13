import React, { useContext, useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import OneMember from '../members/OneMember';
import OneScore from './OneScore';
import { Modal } from '../modal/modal';
import { KickPlayerModal } from '../modals/KickPlayerModal';
import { DeletePlayerModal } from '../modals/DeletePlayerModal';
import { UsersContext } from '../../contexts/usersContext';
import styles from '../../pages/game.module.scss';
import { MainContext } from '../../contexts/mainContext';
import { SocketContext } from '../../contexts/socketContext';

const Players = () => {
  const { users } = useContext(UsersContext);
  const [modalActive, setModalActive] = useState(false);
  const [deletedUser, setDeletedUser] = useState('');
  const [deletedMember, setDeletedMember] = useState('');
  const [kicker, setKicker] = useState('');
  const [voteSet, setVoteSet] = useState('');
  const { settings } = useContext(MainContext);
  const socket = useContext(SocketContext);

  let arrayMembers = users.filter((user) => user.isMaster === false);

  let players = users.filter(
    (player) => player.isMaster !== true && player.isObserver !== true
  );

  const gamePlayers = users.filter((player) => player.isObserver !== true);
  let currentPlayers = null;

  if (settings.isMaster === true) {
    currentPlayers = gamePlayers;
  } else {
    currentPlayers = players;
  }

  socket.on('willPlayerKick', ({deletedUser, kicker, voteSet}) => {
    setDeletedUser(deletedUser);
    setKicker(kicker);
    setVoteSet(voteSet);
    setModalActive(true);
  });

  const getDeletedUser = (idd) => {
    return (users.filter((user) => user.idd === idd))[0];
  }

  const handleDelClick = (idd, openModal) => {
    setDeletedUser(getDeletedUser(idd));
    setKicker('');
    openModal && setModalActive(true);
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

  const handleDeleteMember = (id) => {
    players = players.filter((member) => member.id !== id);
  };

  const getMemberFirstName = () => {
    let memberFirstName = '';

    players.forEach((member) => {
      if (member.id === deletedMember) {
        memberFirstName = member.firstName;
      }
    });
    return memberFirstName;
  };

  return (
    <>
      <Box maxW="1200px" mt="20px">
        <Flex maxW="1200px" wrap="wrap">
          {currentPlayers.map((member) => (
            <Flex key={member.fullName}>
              <OneScore key={member.idd} member={member} />
              <OneMember
                blockClass={styles.memberCard}
                nameBoxClass={styles.nameBox}
                key={member.id}
                member={member}
                deleteClick={handleDelClick}
              />
            </Flex>
          ))}
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

export default Players;
