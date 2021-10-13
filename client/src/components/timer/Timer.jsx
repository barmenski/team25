import React, { useContext, useEffect, useRef } from 'react';
import { Flex, Box, Spacer, Text } from '@chakra-ui/react';
import { SocketContext } from '../../contexts/socketContext';
import { MainContext } from '../../contexts/mainContext';

export default function CountdownApp({
  initCount,
  setStatus,
  status,
  setSecondsRemaining,
  secondsRemaining
}) {
  const socket = useContext(SocketContext);
  const { room } = useContext(MainContext);
  const secondsToDisplay = secondsRemaining % 60;
  const minutesRemaining = (secondsRemaining - secondsToDisplay) / 60;
  const minutesToDisplay = minutesRemaining % 60;

  useInterval(
    () => {
      if (secondsRemaining > 0) {
        setSecondsRemaining(secondsRemaining - 1);
      } else {
        setStatus(false);
        socket.emit('setTimerStatus', 'stopped', room);
      }
    },
    status === true ? 1000 : null
    // passing null stops the interval
  );

  function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  const twoDigits = (num) => String(num).padStart(2, '0');

  return (
    <div className="App">
      <Box w={200} h={75} boxShadow="dark-lg" rounded="md" p="6px" m="5px">
        <Flex direction="column" justify="center" align="center">
          <Flex direction="row" justify="center" align="center">
            <Text
              fontSize={15}
              fontWeight="normal"
              h="20px"
              mb="10px"
              maxW="120px"
              lineHeight="20px"
            >
              minutes
            </Text>
            <Spacer w="20px" />
            <Text
              fontSize={15}
              fontWeight="normal"
              h="20px"
              mb="10px"
              maxW="120px"
              lineHeight="20px"
            >
              seconds
            </Text>
          </Flex>
          <Text
            fontSize={45}
            fontWeight="bold"
            h="20px"
            maxW="120px"
            lineHeight="20px"
          >
            {twoDigits(minutesToDisplay)}:{twoDigits(secondsToDisplay)}
          </Text>
        </Flex>
      </Box>
    </div>
  );
}
