// import React, { useEffect, useRef } from 'react';
// import {
//   VStack,
//   Flex,
//   Box,
//   Button,
//   Text, // Import Text component for sender
//   Textarea, // Import Textarea component for multiline input
// } from '@chakra-ui/react';
// import { ChatProps } from '../../Commons';
// import LocalStorageHandler from '../../handlers/LocalStorageHandler';
// import { SECONDARY_COLOR } from '../../CommonStyles';


// const Chat: React.FC<ChatProps> = ({ messages, newMessage, onNewMessageChange, onSendMessage }) => {
//   const chatBoxRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     if (chatBoxRef.current) {
//       chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
//     }
//   }, [messages]);


//   return (
//     <VStack spacing={4} width="100%" height="100%">
//       <Box
//         className="chat-messages"
//         padding={4}
//         borderRadius="md"
//         overflowY="auto"
//         flex="1"
//         minWidth="300px"
//       >
//         {messages.map((message, index) => (
//           <div key={index}>
//             <Text fontWeight="bold" color={message.sender === LocalStorageHandler.getUserData()?.username ? 'yellow' : 'white'}>
//               {message.sender}:
//             </Text>
//             <Textarea
//               value={message.text}
//               readOnly
//               size="sm"
//               resize="vertical"
//               onChange={onNewMessageChange}
//               bgColor={SECONDARY_COLOR}
//               style={{
//                 borderRadius: '8px',
//                 minHeight: '32px', // Set a minimum height
//                 height: 'auto', // Allow the textarea to grow based on content
//               }}
//             />
//           </div>
//         ))}
//       </Box>
//       <Flex align="center" width="100%">
//         <Textarea
//           placeholder="Type your message..."
//           value={newMessage}
//           onChange={onNewMessageChange}
//           size="sm"
//           resize="none"
//           style={{
//             borderRadius: '8px',
//             width: '100%',
//             flex: 1,
//             minHeight: '24px', // Set a smaller minHeight
//             height: 'auto',
//           }}
//         />
//         <Button colorScheme="blue" size="sm" onClick={onSendMessage}>
//           Send
//         </Button>
//       </Flex>
//     </VStack>
//   );
// };

// export default Chat;


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
        // borderRadius="md"
        overflowY="auto"
        flex="1"
        // minWidth="300px"
        bg={bg}
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
        <Box px={4}
        >
          {messages.map((message, index) => {
            const isSelf = message.sender === currentUser;
            return (
              <Flex
                key={index}
                align="flex-end"
                direction={isSelf ? 'row-reverse' : 'row'}
                mb={2}
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
};

export default Chat;
