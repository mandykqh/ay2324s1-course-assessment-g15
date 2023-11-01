import React, { useState, useEffect } from 'react';
import { Box, Center, Text, Button, Grid, Textarea, GridItem, Select } from '@chakra-ui/react';
import { io, Socket } from 'socket.io-client';
import NavigationBar from '../components/NavigationBar';
import LocalStorageHandler from '../handlers/LocalStorageHandler';
import { useNavigate } from 'react-router-dom';
import { COLLABORATION_SERVICE_URL } from '../configs';
import AuthRequestHandler from '../handlers/AuthRequestHandler';
import LoadingPage from './LoadingPage';
import QuestionDetails from '../components/coding/QuestionDetails';

const CodingPage = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [socket, setSocket] = useState<Socket>();
  const [code, setCode] = useState('');
  const [question, setQuestion] = useState(LocalStorageHandler.getMatchData()?.question);

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
    const socket = io(COLLABORATION_SERVICE_URL);
    setSocket(socket);
    const matchData = LocalStorageHandler.getMatchData();
    socket.emit('joinRoom', matchData?.room_id);

    // Socket event listeners
    socket.on('codeChange', (newCode) => {
      setCode(newCode);
    });

    socket.on('newQuestion', (question) => {
      console.log(`new question: ${question.title} | ${question.categories} | ${question.complexity} | ${question.description}`);
      setQuestion(question);
    })
    // TODO: Messaging feature

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleCodeChange = (newCode: string) => {
    // Emit code changes to the server
    if (socket) {
      socket.emit('codeChange', newCode);
    }
    setCode(newCode); // Update the state
  };

  function handleDisconnect() {
    LocalStorageHandler.deleteMatchData();
    navigate('../home');
  }

  const handleQuestionChange = () => {
    // const room_id = LocalStorageHandler.getMatchData()?.room_id;
    const questionCategory = ['Algorithm'];
    const questionComplexity = 'Medium';
    if (socket) {
      console.log(socket);
      socket.on('newQuestion', (question) => {
        console.log(`new question: ${question.title} | ${question.categories} | ${question.complexity} | ${question.description}`);
        setQuestion(question);
        LocalStorageHandler.updateMatchDataQuestion(question);
      })
      socket.emit("changeQuestion", {
        qnCategory: questionCategory,
        qnComplexity: questionComplexity
      })
      // setQuestion({
      //   id: "",
      //   title: "",
      //   complexity: questionComplexity,
      //   categories: questionCategory,
      //   description: "",
      //   link: ""
      // });


    }
  }
  // console.log('handleqnchange: ' + question?.title);
  const questionString = LocalStorageHandler.getMatchData()?.question;
  if (isAuthenticated) {
    return (
      <Box>
        <NavigationBar index={1} />
        <Center height='100vh'>
          <Grid>
            <GridItem colSpan={1}>
              <QuestionDetails
                id={question?.id || ""}
                title={question?.title || ""}
                complexity={question?.complexity || ""}
                categories={question?.categories || []}
                description={question?.description || ""}
                link={question?.link || ""}
              />
              <Button onClick={handleQuestionChange}>Change Question</Button>
            </GridItem>
            {/* // TODO: Use a real code editor
            // TODO: Add a chat box for messaging */}
            <Textarea value={code} onChange={(e) => handleCodeChange(e.target.value)} />
            <Button mt={4} onClick={() => handleDisconnect()}> Disconnect </Button>
          </Grid>
        </Center>
      </Box>
    );
  } else {
    return <LoadingPage />
  }
};

export default CodingPage;
