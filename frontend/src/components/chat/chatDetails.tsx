import React, { useEffect, useRef } from 'react';
import {
  VStack,
  Flex,
  Box,
  Button,
  Text, // Import Text component for sender
  Textarea, // Import Textarea component for multiline input
} from '@chakra-ui/react';
import { ChatProps } from '../../Commons';
import LocalStorageHandler from '../../handlers/LocalStorageHandler';
import { SECONDARY_COLOR } from '../../CommonStyles';


const Chat: React.FC<ChatProps> = ({ messages, newMessage, onNewMessageChange, onSendMessage }) => {
  const chatBoxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);


  return (
    <VStack spacing={4} width="100%" height="100%">
      <Box
        className="chat-messages"
        border="1px solid #ccc"
        padding={4}
        borderRadius="md"
        overflowY="auto"
        flex="1"
        minWidth="300px"
      >
        {messages.map((message, index) => (
          <div key={index}>
            <Text fontWeight="bold" color={message.sender == LocalStorageHandler.getMatchData()?.user_id ? 'yellow' : 'white'}>
              User {message.sender}:
            </Text>
            <Textarea
              value={message.text}
              readOnly
              size="sm"
              resize="vertical"
              onChange={onNewMessageChange}
              bgColor={SECONDARY_COLOR}
              style={{ 
                borderRadius: '8px' ,
                minHeight: '32px', // Set a minimum height
                height: 'auto', // Allow the textarea to grow based on content
              }}
            />
          </div>
        ))}
      </Box>
        <Flex align="center" width="100%">
            <Textarea
            placeholder="Type your message..."
            value={newMessage}
            onChange={onNewMessageChange}
            size="sm"
            resize="none"
            style={{
                borderRadius: '8px',
                width: '100%',
                flex: 1,
                minHeight: '24px', // Set a smaller minHeight
                height: 'auto',
            }}
            />
            <Button colorScheme="blue" size="sm" onClick={onSendMessage}>
                Send
            </Button>
        </Flex>
    </VStack>
  );
};

export default Chat;