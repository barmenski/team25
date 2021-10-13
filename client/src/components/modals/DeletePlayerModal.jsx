import React, { useContext } from 'react';
import {
  Text,
  Button,
  Flex,
  Box,
} from "@chakra-ui/react";
import { SocketContext } from '../../contexts/socketContext';
import './KickPlayerModal.scss';

export const DeletePlayerModal = ({ kicker, deletedUser, voteSet , onClose }) => {
  const socket = useContext(SocketContext);

  const handleDelelteClick = (vote) => {
    const kickerId = socket.id;
    socket.emit('voting', {deletedUser, kickerId, vote, voteSet}, () => {
      console.log(`You are deleted ${deletedUser.fullName} from room`);
    });
    onClose(false);
  };

  return (
    <>
      <Text
        fontSize="30px"
        fontWeight="800"
        align="center"
      >
        Kick player?
      </Text>
      <Box mt={20} mb={20} align="center">
        <Text fontSize="20px" fontWeight="bold">
          <span className="deleteName"> {kicker.fullName} </span> want to kick member <span className="deleteName"> {deletedUser.fullName}. </span> Do you agree with it?
        </Text>
      </Box>
      <Flex justify="space-around">
        <Button
          colorScheme={'facebook'}
          height={47}
          width={189}
          variant="solid"
          mr={3}
          onClick={()=>handleDelelteClick(true)}
        >
          Yes
        </Button>
        <Button
          colorScheme={'facebook'}
          height={47}
          width={189}
          variant="outline"
          onClick={()=>handleDelelteClick(false)}>
          No
        </Button>
      </Flex>
    </>
  );
};
