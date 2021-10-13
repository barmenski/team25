import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { MainContext } from '../../contexts/mainContext';
import { SocketContext } from '../../contexts/socketContext';
import {
  Box,
  Flex,
  Heading,
  IconButton,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { FiList } from 'react-icons/fi';
import { BiMessageDetail } from 'react-icons/bi';
import { RiSendPlaneFill } from 'react-icons/ri';
import ScrollToBottom from 'react-scroll-to-bottom';
import './Chat.scss';
import { UsersContext } from '../../contexts/usersContext';

const Chat = ({ active }) => {
  const { name, room, setName, setRoom } = useContext(MainContext);
  const socket = useContext(SocketContext);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const { users } = useContext(UsersContext);
  const history = useHistory();

  window.onpopstate = (e) => logout();
  //Checks to see if there's a user present
  useEffect(() => {
    if (!name) return history.push('/');
  }, [history, name]);

  useEffect(() => {
    const updateMessage = (msg) => {
      setMessages((messages) => [...messages, msg]);
    };
    socket.on('message', updateMessage);
    return () => socket.removeListener('message', updateMessage);
  }, [socket]);

  const handleSendMessage = () => {
    socket.emit('sendMessage', message, () => setMessage(''));
    setMessage('');
  };

  const logout = () => {
    setName('');
    setRoom('');
    history.push('/');
    history.go(0);
  };

  return (
    <div className={active ? 'chat' : 'chat hidden'}>
      <Flex className='room'>
        <Heading
          className='heading'
          as='h4'
          bg='white'
          p='1rem 1.5rem'
          borderRadius='10px 10px 0 0'
        >
          <Flex alignItems='center' justifyContent='space-between'>
            <Menu>
              <MenuButton
                as={IconButton}
                icon={<FiList />}
                isRound='true'
                bg='blue.300'
                color='white'
              />
              <MenuList>
                {users &&
                  users.map((user) => {
                    return (
                      <MenuItem minH='40px' key={user.idd}>
                        <Text fontSize='sm'>{user.fullName}</Text>
                      </MenuItem>
                    );
                  })}
              </MenuList>
            </Menu>
            <Flex
              alignItems='center'
              flexDirection='column'
              flex={{ base: '1', sm: 'auto' }}
            >
              <Heading fontSize='lg'>{room}</Heading>
              <Flex alignItems='center'>
                <Text
                  mr='1'
                  fontWeight='400'
                  fontSize='md'
                  opacity='.7'
                  letterSpacing='0'
                >
                  {name}
                </Text>
                <Box h={2} w={2} borderRadius='100px' bg='green.300'></Box>
              </Flex>
            </Flex>
          </Flex>
        </Heading>

        <ScrollToBottom className='messages' debug={false}>
          {messages.length > 0 ? (
            messages.map((msg, i) => (
              <Box
                key={i}
                className={`message ${msg.user === name ? 'my-message' : ''}`}
                m='.2rem 0'
              >
                <Text fontSize='xs' opacity='.7' ml='5px' className='user'>
                  {msg.user}
                </Text>
                <Text
                  fontSize='sm'
                  className='msg'
                  p='.4rem .8rem'
                  bg='white'
                  borderRadius='15px'
                  color='white'
                >
                  {msg.text}
                </Text>
              </Box>
            ))
          ) : (
            <Flex
              alignItems='center'
              justifyContent='center'
              mt='.5rem'
              bg='#EAEAEA'
              opacity='.2'
              w='100%'
            >
              <Box mr='2'>-----</Box>
              <BiMessageDetail fontSize='1rem' />
              <Text ml='1' fontWeight='400'>
                No messages
              </Text>
              <Box ml='2'>-----</Box>
            </Flex>
          )}
        </ScrollToBottom>
        <div className='form'>
          <input
            type='text'
            placeholder='Enter Message'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <IconButton
            colorScheme='green'
            isRound='true'
            icon={<RiSendPlaneFill />}
            onClick={handleSendMessage}
            disabled={message === '' ? true : false}
          >
            Send
          </IconButton>
        </div>
      </Flex>
    </div>
  );
};

export default Chat;
