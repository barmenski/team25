import React, { useContext } from 'react';
import { Box, Flex, Spacer, Avatar } from '@chakra-ui/react';
import { NotAllowedIcon } from '@chakra-ui/icons';
import { SocketContext } from '../../contexts/socketContext';
import { UsersContext } from '../../contexts/usersContext';

const OneMember = ({ member, deleteClick, blockClass, nameBoxClass }) => {
  const {
    fullName,
    jobPosition,
    idd,
    firstName,
    lastName,
    imageSrc,
    id
  } = member;
  const { users } = useContext(UsersContext);
  const socket = useContext(SocketContext);

  const isKickerMaster = () => {
    const currUser = users.filter((user) => user.id === socket.id);
    return currUser[0].isMaster;
  };

  const handleDeleteClick = () => {
    const kickerId = socket.id;
    if (isKickerMaster()) {
      deleteClick(idd, true);
    } else {
      if (users.length < 4) {
        alert(
          'You can`t kick member, while there is less than 3 members in lobby '
        );

        return;
      } else {
        const voteSet = new Date().valueOf();
        socket.emit('kickUser', { id, kickerId, voteSet });
      }
    }
  };

  return (
    <Box
      w={300}
      h={75}
      boxShadow="dark-lg"
      rounded="md"
      p="6px"
      m="5px"
      background={member.isObserver ? '#ccc' : '#fff'}
      className={blockClass}
    >
      <Flex align="center" justify="center">
        <Avatar
          name={firstName ? firstName + ' ' + lastName : null}
          bg="#60DABF"
          src={imageSrc}
          size={'lg'}
        />
        <Spacer />
        <Box className={nameBoxClass}>
          <Box
            fontSize={20}
            fontWeight="bold"
            h="20px"
            mb="20px"
            maxW="120px"
            lineHeight="20px"
          >
            {fullName}
          </Box>
          <Box fontSize={10} fontWeight="bold" h="20px">
            {jobPosition} {member.isObserver ? '(Observer)' : ''}
          </Box>
        </Box>
        <Spacer />

        {member.isMaster ? null : (
          <NotAllowedIcon
            w="30px"
            h="30px"
            color="red"
            onClick={handleDeleteClick}
            _hover={{ cursor: 'pointer' }}
          />
        )}
      </Flex>
    </Box>
  );
};

export default OneMember;
