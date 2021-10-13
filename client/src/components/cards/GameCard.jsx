import React, { useContext } from 'react';
import { Box, Image, Flex } from '@chakra-ui/react';
import './cards.scss';
import { MainContext } from '../../contexts/mainContext';
import { SocketContext } from '../../contexts/socketContext';

const GameCard = ({ scoreType, image, isRestarted }) => {
  const socket = useContext(SocketContext);
  const { room } = useContext(MainContext);

  const handleCardChoose = (e) => {
    const card = e.currentTarget;
    const activeImage = document.createElement('div');
    activeImage.classList.add('active-card-arrow');
    deleteActiveClasses();
    card.classList.add('active-card');
    card.append(activeImage);
    socket.emit('editUser', { room, image });
  };

  const deleteActiveClasses = () => {
    const gameCards = document.querySelectorAll('.game-card');
    const image = document.querySelector('.active-card-arrow');
    if (image) {
      image.remove();
    }
    gameCards.forEach((card) => {
      card.classList.remove('active-card');
    });
  };

  if (isRestarted) {
    deleteActiveClasses();
  }

  return (
    <Box
      onClick={handleCardChoose}
      w={100}
      h={160}
      boxShadow="dark-lg"
      rounded="md"
      p="10px"
      m="5px"
      _hover={{ cursor: 'pointer' }}
      className="game-card"
    >
      <Box fontSize={20} fontWeight="bold" h="20px">
        {scoreType}
      </Box>
      <Flex align="center" justify="center" h="100px">
        {image.length < 10 ? (
          <Box fontSize={40} fontWeight="bold">
            {image}
          </Box>
        ) : (
          <Image
            src={image}
            alt="Card-image"
            boxSize="60px"
            objectFit="cover"
          />
        )}
      </Flex>
      <Box fontSize={20} fontWeight="bold" transform="rotate(180deg)" h="20px">
        {scoreType}
      </Box>
    </Box>
  );
};

export default GameCard;
