import React, { useContext } from 'react';
import {
  Text,
  Button,
  Flex,
  Box,
} from "@chakra-ui/react";
import { SocketContext } from '../../contexts/socketContext';
import './KickPlayerModal.scss';

export const KickPlayerModal = ({ id, memberName, onClose }) => {
  const socket = useContext(SocketContext);

  const handleDelelteClick = (id) => {
    socket.emit('deleteUser', id, () => {
      console.log(`${id} deleted from room`);
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
          Are you really want to remove player <span className="deleteName"> {memberName} </span> from game session?
        </Text>
      </Box>
      <Flex justify="space-around">
        <Button
          colorScheme={'facebook'}
          height={47}
          width={189}
          variant="solid"
          mr={3}
          onClick={() => handleDelelteClick(id)}
        >
          Yes
        </Button>
        <Button
          colorScheme={'facebook'}
          height={47}
          width={189}
          variant="outline"
          onClick={() => onClose(false)}>
          No
        </Button>
      </Flex>
    </>
  );
};
