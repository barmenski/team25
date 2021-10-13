import React from 'react';
import { Text, Flex } from "@chakra-ui/react";

export const YouAreDeletedModal = ({isSession}) => {
  return (
    <Flex
      minH='100px'
      justify='center'
      alignItems='center'
    >
      <Text
        fontSize='30px'
        fontWeight='800'
        align='center'
      > 
      {
        isSession
          ? 'You are removed from the session'
          : 'Session is finished by scram master'
      }
      </Text>
    </Flex>
  );
};
