import React from 'react';
import { Text, Flex } from "@chakra-ui/react";

export const FinishSessionModal = () => {
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
      Session is successfully finished
      </Text>
    </Flex>
  );
};
