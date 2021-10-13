import React from 'react';
import {Box, Image, Flex } from '@chakra-ui/react';
import addCardLogo from '../../assets/icons/addCardLogo.png';

const AddCard = ({addClick}) => {
  return (
    <Box w={100} h={160} boxShadow="dark-lg" rounded="md" p="10px" m="5px" >
      <Flex align="center" justify="center" h="100%">
        <Image 
          src={addCardLogo} 
          alt="Card-image"
          boxSize="60px"
          objectFit="cover"
          onClick={addClick}
          _hover={{cursor:'pointer'}}
        />
      </Flex>
    </Box>
  );
}

export default AddCard;