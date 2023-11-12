import React, { useState, useEffect } from 'react';
import {
  Flex,
  Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, IconButton,
  useToast, Box, Button, Grid, VStack, GridItem, HStack, Textarea, Center
} from '@chakra-ui/react';
import { ChatIcon, EditIcon } from '@chakra-ui/icons';
import { io, Socket } from 'socket.io-client';
import NavigationBar from '../components/NavigationBar';
import LocalStorageHandler from '../handlers/LocalStorageHandler';
import { useNavigate } from 'react-router-dom';
import { FRONTEND_URL, COLLABORATION_SERVICE_URL } from '../configs';
import AuthRequestHandler from '../handlers/AuthRequestHandler';
import LoadingPage from './LoadingPage';
import QuestionDetails from '../components/coding/QuestionDetails';
import CodeMirror from '@uiw/react-codemirror';
import { java } from '@codemirror/lang-java';
import { python } from '@codemirror/lang-python';
import { cpp } from '@codemirror/lang-cpp';
import { javascript } from '@codemirror/lang-javascript';
import { okaidia } from '@uiw/codemirror-theme-okaidia';
import HistoryRequestHandler from '../handlers/HistoryRequestHandler';
import Select from 'react-select';
import { selectorStyles, singleSelectStyles } from '../CommonStyles';
import Chat from '../components/chat/chatDetails';
import { ChatMessage } from '../Commons';
import Canvas from '../components/canvas/canvas';

const CodingPage = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [socket, setSocket] = useState<Socket>();
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [question, setQuestion] = useState(LocalStorageHandler.getMatchData()?.question);
  const [complexityFilter, setComplexityFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);
  const [isPreferencesModalVisible, setIsPreferencesModalVisible] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isChatDrawerOpen, setIsChatDrawerOpen] = useState(false);
  const [isCanvasDrawerOpen, setIsCanvasDrawerOpen] = useState(false);

  useEffect(() => {
    AuthRequestHandler.isAuth()
      .then(res => {
        setIsAuthenticated(res.isAuth);
      })
      .catch(e => {
        console.log(e);
      });
    // Redirect to collaboration room if matched
    if (!LocalStorageHandler.isMatched()) {
      navigate('/collaborate');
    }
  }, []);

  useEffect(() => {
    const socket = io(FRONTEND_URL, {
      path: COLLABORATION_SERVICE_URL
    });
    setSocket(socket);
    const matchData = LocalStorageHandler.getMatchData();
    socket.emit('joinRoom', matchData?.room_id);

    // Socket event listeners
    socket.on('codeChange', (newCode) => {
      setCode(newCode);
    });

    socket.on('languageChange', (newLanguage) => {
      setLanguage(newLanguage);
    });

    socket.on('languageChange', (newLanguage) => {
      setLanguage(newLanguage);
    });

    socket.on('newQuestion', (question) => {
      console.log(`new question: ${question.title} | ${question.categories} | ${question.complexity} | ${question.description}`);
      if (!question) {
        toast({
          title: "Error",
          description: `Change question requested: No question found`,
          status: "error",
          duration: 3000,
        });
        return;
      } else {
        toast({
          title: "Question Changed",
          description: "The question has been successfully changed.",
          status: "success",
          duration: 3000,
        });
        setQuestion(question);
        LocalStorageHandler.updateMatchDataQuestion(question);
        setCategoryFilter(categoryFilter);
        setComplexityFilter(complexityFilter);
      }

    })

    socket.on('messageChange', (message, user) => {
      // Handle incoming messages and update chat history
      const newMessageObj = { sender: user, text: message };
      updateChatHistory(newMessageObj);
    });

    return () => {
      socket.disconnect();
    };
  }, []);


  useEffect(() => {
    const clientChatHistory = getChatHistory();
    setChatHistory(clientChatHistory);
  }, []);


  const getChatHistory = () => {
    const clientId = LocalStorageHandler.getUserData()?.id!;
    const storedChatHistory = LocalStorageHandler.getChatData(`chatHistory_${clientId}`);
    return storedChatHistory;
  };

  const updateChatHistory = (newMessage: ChatMessage) => {
    const clientId = LocalStorageHandler.getUserData()?.id!;
    const storedChatHistory = getChatHistory();
    const updatedChatHistory = [...storedChatHistory, newMessage];
    LocalStorageHandler.storeChatData(`chatHistory_${clientId}`, updatedChatHistory);
    setChatHistory(updatedChatHistory);
  };

  const clearChatHistory = () => {
    const clientId = LocalStorageHandler.getUserData()?.id!;
    localStorage.setItem(`chatHistory_${clientId}`, JSON.stringify([]));
    setChatHistory([]);
  };

  const clearCanvasHistory = () => {
    const roomId = LocalStorageHandler.getMatchData()?.room_id!;
    localStorage.setItem(`canvas_${roomId}`, JSON.stringify([]));
  }

  const toggleChatDrawer = () => {
    setIsChatDrawerOpen(!isChatDrawerOpen);
  };

  const toggleCanvasDrawer = () => {
    setIsCanvasDrawerOpen(!isCanvasDrawerOpen);
  }

  const handleCodeChange = (newCode: string) => {
    // Emit code changes to the server
    if (socket) {
      socket.emit('codeChange', newCode);
    }
    setCode(newCode); // Update the state
  };

  const handleLanguageChange = (newLanguage: string) => {
    // Emit code changes to the server
    if (socket) {
      socket.emit('languageChange', newLanguage);
    }
    setLanguage(newLanguage); // Update the state
  };

  const handleNewMessageChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newMessageText = event.target.value; // Extract the message text
    setNewMessage(newMessageText); // Update the new message state with the text
  };

  const handleSendMessage = () => {
    if (socket && newMessage.trim() !== '') {
      const user = LocalStorageHandler.getUserData()?.username!
      socket.emit('messageChange', newMessage, user); // Send the message to the server
      // Append the sent message to the chat history
      const sentMessage = { sender: user, text: newMessage };
      updateChatHistory(sentMessage);
      setNewMessage(''); // Clear the new message input field
    }
  };

  function handleDisconnect() {
    LocalStorageHandler.deleteMatchData();
    clearChatHistory();
    clearCanvasHistory();
    navigate('../home');
  }

  const toast = useToast();

  const handleQuestionChange = () => {
    console.log(`qn to change: current qid=${LocalStorageHandler.getMatchData()?.question.id} | ${categoryFilter} | ${complexityFilter}`);

    if (categoryFilter.length < 1 || !complexityFilter) {
      toast({
        title: "Error",
        description: "Category and Complexity fields cannot be empty.",
        status: "error",
        duration: 3000,
      });
      return;
    }

    if (socket) {

      socket.on('newQuestion', (question) => {
        if (question) {
          console.log(`new qn generated: ${question.title}`);
          setQuestion(question);
          LocalStorageHandler.updateMatchDataQuestion(question);
        }
        console.log('in socket');
        setCategoryFilter(categoryFilter);
        setComplexityFilter(complexityFilter);
      })
      socket.emit("changeQuestion", {
        id: LocalStorageHandler.getMatchData()?.question.id,
        categories: categoryFilter,
        complexity: complexityFilter
      })

    }
  }

  const handleFilterPreferences = (filterOptions: { categories: string[]; complexity: string }) => {
    const { categories, complexity } = filterOptions;
    setComplexityFilter(complexity);
    setCategoryFilter(categories);
    // LocalStorageHandler.storeFilterData(categories, complexity, filtered);

    console.log(`preferences updated: ${complexity} | ${categories}`);
  }

  const questionString = LocalStorageHandler.getMatchData()?.question;


  const languageOptions = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' },
  ];
  if (isAuthenticated) {
    const questionString = LocalStorageHandler.getMatchData()?.question;
    return (
      <Box>
        <NavigationBar index={1} />
        <Grid height='100%' templateColumns='repeat(2, 1fr)' gap='20px' padding='20px' paddingTop='70px'>
          <GridItem colSpan={1}>
            <QuestionDetails
              id={questionString?.id || ""}
              title={questionString?.title || ""}
              complexity={questionString?.complexity || ""}
              categories={questionString?.categories || []}
              description={questionString?.description || ""}
              link={questionString?.link || ""}
              onFilter={handleFilterPreferences}
              onQuestionChange={handleQuestionChange}
            />
          </GridItem>
          <GridItem colSpan={1} m='15px'>
            <VStack gap='1rem'>
              {/* // TODO: Add a chat box for messaging */}
              <Flex width='100%' gap='1rem' mb='8px'>
                <Box flex='80%'>
                  <Select
                    value={languageOptions.find(option => option.value === language)}
                    onChange={handleLanguageChange}
                    options={languageOptions}
                    styles={{
                      ...selectorStyles,
                      ...singleSelectStyles,
                    }}
                    components={{
                      IndicatorSeparator: () => null
                    }}
                  />
                </Box>
                <Button
                  colorScheme='red'
                  onClick={() => handleDisconnect()}
                  flex="7"
                >
                  Disconnect
                </Button>
              </Flex>
              <CodeMirror
                value={code}
                height='80vh'
                width='50vw'

                extensions={[
                  language === 'java'
                    ? java()
                    : language === 'python'
                      ? python()
                      : language === 'cpp'
                        ? cpp()
                        : javascript({ jsx: true }),
                ]}
                onChange={handleCodeChange}
                theme={okaidia}
              />
              <IconButton
                aria-label="Chat"
                // icon={<ChatIcon />}
                bg='white'
                position="absolute"
                bottom="0px"
                right="20px"
                onClick={toggleChatDrawer}
                zIndex="1"
              />
              <IconButton
                aria-label="Canvas"
                // icon={<EditIcon />}
                position="absolute"
                bottom="0px"
                right="70px"
                onClick={toggleCanvasDrawer}
                zIndex="1"
              />
            </VStack>
          </GridItem>
        </Grid>
        <Drawer placement="left" isOpen={isChatDrawerOpen} onClose={toggleChatDrawer}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Chat</DrawerHeader>
            <DrawerBody>
              <Chat
                messages={chatHistory}
                newMessage={newMessage}
                onNewMessageChange={handleNewMessageChange}
                onSendMessage={handleSendMessage}
              />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
        <Drawer placement="left" isOpen={isCanvasDrawerOpen} onClose={toggleCanvasDrawer} size={'xl'}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Canvas</DrawerHeader>
            <DrawerBody>
              <Canvas
                socket={socket}
              />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>
    );
  } else {
    return <LoadingPage />
  }
};

export default CodingPage;
