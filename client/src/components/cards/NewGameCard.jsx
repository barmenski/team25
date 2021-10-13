import React, {useState} from 'react';
import  {
  Box, 
  Flex, 
  FormLabel,
  Input, 
  Spacer 
} from '@chakra-ui/react';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';

const NewGameCard = ({scoreType, addClick, deleteClick}) => {
  const [inputVal, setInputVal] = useState('');
  return (
    <Box w={100} h={160} boxShadow="dark-lg" rounded="md" p="10px" m="5px" _hover={{cursor:'pointer'}}>
      <Flex>
        <Box fontSize={20} fontWeight="bold"  h="20px">{scoreType}</Box>
        <Spacer />
        <CheckIcon w="20px" h="20px" color="green" onClick={() => addClick(inputVal)}/>
      </Flex>
      <Flex align="center" justify="center" h="100px">
         <Box textAlign="center">
            <FormLabel mb="0" fontSize="10.5px">Input number</FormLabel>
            <Input 
              fontSize={24} 
              fontWeight="bold" 
              bg="gray.300" 
              p={3} 
              onChange={(e) => setInputVal(e.target.value)}
            />
          </Box>
      </Flex>
      <Flex transform="rotate(180deg)">
        <Box fontSize={20} fontWeight="bold" h="20px">{scoreType}</Box>
        <Spacer />
        <CloseIcon w="20px" h="20px" color="red" onClick={deleteClick}/>
      </Flex>
    </Box>
  );
}

export default NewGameCard;