import React from 'react';

import { Box, Flex, Spacer } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { useSelector } from 'react-redux';

const IssueItem = ({ issue, deleteClick, revise, onClick }) => {
  const user = useSelector((state) => state.user);

  const { id, name, priority, isActive } = issue;
  return (
    <Box
      w={300}
      h={75}
      boxShadow="dark-lg"
      rounded="md"
      p="10px"
      m="5px"
      onClick={user.isMaster ? () => onClick(issue) : null}
      backgroundColor={isActive ? 'rgba(96, 218, 191, 0.33)' : 'none'}
    >
      <Flex align="center" justify="center">
        <Box>
          <Box
            fontSize={20}
            fontWeight="bold"
            h="20px"
            mb="20px"
            maxW="200px"
            lineHeight="20px"
          >
            {name}
          </Box>
          <Box fontSize={12} fontWeight="bold" h="20px">
            {priority}
          </Box>
        </Box>
        <Spacer />
        <EditIcon
          w="30px"
          h="30px"
          color="green.400"
          mr="10px"
          onClick={() => revise(issue)}
          _hover={{ cursor: 'pointer' }}
          visibility={user.isObserver || user.isMaster ? 'visible' : 'hidden'}
        />
        <DeleteIcon
          w="30px"
          h="30px"
          color="red"
          onClick={() => deleteClick(id)}
          _hover={{ cursor: 'pointer' }}
          visibility={user.isObserver || user.isMaster ? 'visible' : 'hidden'}
        />
      </Flex>
    </Box>
  );
};

export default IssueItem;
