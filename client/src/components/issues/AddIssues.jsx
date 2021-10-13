import React from "react";
import { Flex, Spacer, Text } from "@chakra-ui/react";
import { AddIcon } from '@chakra-ui/icons'

const AddIssue = ({addClick}) => {

  return(
    <Flex 
      align="center" 
      justify="center"
      w={300}
      h={75}
      boxShadow="dark-lg"
      rounded="md"
      p="10px"
      m="5px"
    >
      <Text fontSize={20} fontWeight="bold" h="20px" mb="20px" >
        Create new issue
      </Text>
      <Spacer />
      <AddIcon 
        w="30px" 
        h="30px" 
        onClick={addClick} 
        _hover={{ cursor: "pointer" }}
      />
    </Flex>
  );
};

export default AddIssue;