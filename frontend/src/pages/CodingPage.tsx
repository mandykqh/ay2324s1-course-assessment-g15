import React, { useState, useEffect } from 'react';
import { useToast, Box, Button, Grid, VStack, GridItem, Select, HStack, Textarea, Center } from '@chakra-ui/react';
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
import QuestionPreferences from '../components/coding/QuestionPreferences';

const CodingPage = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [socket, setSocket] = useState<Socket>();
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [question, setQuestion] = useState(LocalStorageHandler.getMatchData()?.question);
  const [complexityFilter, setComplexityFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);

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
      // console.log(`new question: ${question.title} | ${question.categories} | ${question.complexity} | ${question.description}`);
      if (!question) {
        toast({
          title: "Error",
          description: `Change question request by User ${LocalStorageHandler.getUserData()?.username}: No question found.`,
          status: "error",
          duration: 3000,
        });
        return;
      }
      toast({
        title: "Question Changed",
        description: "The question has been successfully changed.",
        status: "success",
        duration: 3000,
      });
      setQuestion(question);
      setCategoryFilter(categoryFilter);
      setComplexityFilter(complexityFilter);
    })
    // TODO: Messaging feature

    return () => {
      socket.disconnect();
    };
  }, []);


  useEffect(() => {
    updateHistory();
  }, []);

  function updateHistory() {
    let date = new Date();
    HistoryRequestHandler.updateHistory({
      userId: LocalStorageHandler.getUserData()?.id!,
      attempt: {
        questionId: LocalStorageHandler.getMatchData()?.question.id!,
        timestamp: date.toISOString(),
      },
      complexity: LocalStorageHandler.getMatchData()?.question.complexity!
    });
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

  function handleDisconnect() {
    LocalStorageHandler.deleteMatchData();
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
          setQuestion(question);
          LocalStorageHandler.updateMatchDataQuestion(question);
        }
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
  if (isAuthenticated) {
    const questionString = LocalStorageHandler.getMatchData()?.question;
    return (
      <Box>
        <NavigationBar index={1} />
        <Grid height='100%' templateColumns='repeat(2, 1fr)' gap='20px' padding='20px' paddingTop='70px'>
          <GridItem colSpan={1}>
            <QuestionPreferences onFilter={handleFilterPreferences} />
            <Button onClick={handleQuestionChange}>Change Question</Button>
            <QuestionDetails
              id={questionString?.id || ""}
              title={questionString?.title || ""}
              complexity={questionString?.complexity || ""}
              categories={questionString?.categories || []}
              description={questionString?.description || ""}
              link={questionString?.link || ""}
            />
          </GridItem>
          <GridItem colSpan={1}>
            <VStack gap='1rem'>
              {/* // TODO: Add a chat box for messaging */}
              <HStack width='100%' gap='1rem'>
                <Select value={language} onChange={(e) => handleLanguageChange(e.target.value)}>
                  <option value='javascript'>JavaScript</option>
                  <option value='python'>Python</option>
                  <option value='java'>Java</option>
                  <option value='cpp'>C++</option>
                </Select>
                <Button onClick={() => handleDisconnect()}> Disconnect </Button>
              </HStack>
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
            </VStack>
          </GridItem>
        </Grid>
      </Box>
    );
  } else {
    return <LoadingPage />
  }
};

export default CodingPage;
