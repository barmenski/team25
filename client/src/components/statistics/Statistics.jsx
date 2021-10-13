import { Image } from '@chakra-ui/image';
import { Box, Flex } from '@chakra-ui/layout';
import { useContext } from 'react';
import { MainContext } from '../../contexts/mainContext';
import { SocketContext } from '../../contexts/socketContext';
import { UsersContext } from '../../contexts/usersContext';

export const Statistics = () => {
  const { users } = useContext(UsersContext);
  const socket = useContext(SocketContext);
  const { room } = useContext(MainContext);

  const statObj = {};
  const statCards = [];
  const finalArr = [];

  users.forEach(({ score }) => {
    if (score) {
      statCards.push(score);
    }
  });
  statCards.reduce((acc, el) => {
    acc[el] = (acc[el] || 0) + 1;
    return acc;
  }, statObj);

  for (let key in statObj) {
    finalArr.push({ score: key, count: statObj[key] });
  }

  const countResult = (num) => {
    return ((num / statCards.length) * 100).toFixed(1) + '%';
  };

  socket.emit('addIssueStatistic', { finalArr, room, statCards });

  return (
    <Flex direction="column" minW="100%" justifyContent="space-around">
      <Box fontSize="30px" fontWeight="600" textAlign="center">
        Statistics:
      </Box>
      <Flex justify="space-between" flexWrap="wrap">
        {finalArr.map(({ score, count }) =>
          score.length < 10 ? (
            <Flex direction="column" alignItems="center" p="10px" key={score}>
              <Box fontSize={40} fontWeight="bold">
                {score}
              </Box>
              <Box fontWeight="700" fontSize="30px">
                {countResult(count)}
              </Box>
            </Flex>
          ) : (
            <Flex direction="column" alignItems="center" p="10px" key={score}>
              <Image
                src={score}
                alt="Card-image"
                boxSize="60px"
                objectFit="cover"
              />
              <Box fontWeight="700" fontSize="30px">
                {countResult(count)}
              </Box>
            </Flex>
          )
        )}
      </Flex>
    </Flex>
  );
};
