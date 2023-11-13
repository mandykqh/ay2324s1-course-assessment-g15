import React, { useEffect, useRef } from 'react';
import {
  VStack,
  Flex,
  Box,
  Button,
  Text,
  useColorModeValue,
  Textarea,
  Center
} from '@chakra-ui/react';
import { ChatProps } from '../../Commons';
import LocalStorageHandler from '../../handlers/LocalStorageHandler';

const Chat: React.FC<ChatProps> = ({ messages, newMessage, onNewMessageChange, onSendMessage }) => {
  const chatBoxRef = useRef<HTMLDivElement | null>(null);
  const bg = 'transparent';
  const selfMsgBg = useColorModeValue('blue.100', 'blue.600');
  const otherMsgBg = 'primary.boxBorder';
  const selfMsgColor = 'white';
  const otherMsgColor = 'white';

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const currentUser = LocalStorageHandler.getUserData()?.username;

  return (
    <VStack spacing={4} width="100%" height="100%">
      <Box
        ref={chatBoxRef}
        overflowY="auto"
        flex="1" // This line makes the Box expand and fill the VStack
        bg={bg}
        width="100%" // Ensuring full width of the VStack
      >
        <Center
          as='b'
          py='8px'
          mb='20px'
          color='black'
          bg='#90CDF4'
          position="sticky"
          top="0"
          zIndex="sticky"
        >
          Chat
        </Center>
        <Box px={4} width="100%">
          {messages.map((message, index) => {
            const isSelf = message.sender === currentUser;
            return (
              <Flex
                key={index}
                align="flex-end"
                direction={isSelf ? 'row' : 'row-reverse'} // Follow telegram/whatsapp layout
                justify="flex-end"
                mb={2}
                width="100%"
              >
                <Box
                  bg={isSelf ? selfMsgBg : otherMsgBg}
                  color={isSelf ? selfMsgColor : otherMsgColor}
                  borderRadius="lg"
                  padding={2}
                  maxWidth="80%"
                  alignSelf={isSelf ? 'flex-end' : 'flex-start'}
                >
                  <Text fontSize="sm">{message.text}</Text>
                  <Text fontSize="xs" opacity="0.7">
                    {message.sender}
                  </Text>
                </Box>
              </Flex>
            );
          })}
        </Box>
      </Box>
      <Flex align="center" width="100%" paddingX={3} mb='15px'>
        <Textarea
          placeholder="Type your message..."
          value={newMessage}
          onChange={onNewMessageChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              onSendMessage();
            }
          }}
          size="sm"
          resize="none"
          borderRadius="10px"
          width="100%"
          flex={1}
          border='2px solid #244153'
          minHeight="40px"
          mr={3}
        />
        <Button colorScheme="blue" size="sm" onClick={onSendMessage}>
          Send
        </Button>
      </Flex>
    </VStack>
  );
}

export default Chat;