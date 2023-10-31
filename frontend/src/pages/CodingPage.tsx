import axios from "axios";
import React, { useState, useEffect } from 'react';
import { GridItem, Box, Center, Text, Button, Grid, Textarea } from '@chakra-ui/react';
import { io, Socket } from 'socket.io-client';
import NavigationBar from '../components/NavigationBar';
import LocalStorageHandler from '../handlers/LocalStorageHandler';
import { useNavigate } from 'react-router-dom';
import { COLLABORATION_SERVICE_URL } from '../configs';
import AuthRequestHandler from '../handlers/AuthRequestHandler';
import LoadingPage from './LoadingPage';
import QuestionDetails from "../components/coding/QuestionDisplay";

const CodingPage = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [socket, setSocket] = useState<Socket>();
  const [code, setCode] = useState('');

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

  if (isAuthenticated) {
    const questionString = LocalStorageHandler.getMatchData()?.question;
    return (
      <Box>
        <NavigationBar index={1} />
        <Center height='100vh'>
          <Grid>
            {/* // TODO: Use a real code editor
            // TODO: Add a chat box for messaging */}
            <GridItem colSpan={1}>
              <QuestionDetails
                id={questionString?.id || ""}
                title={questionString?.title || ""}
                complexity={questionString?.complexity || ""}
                categories={questionString?.categories || []}
                description={questionString?.description || ""}
                link={questionString?.link || ""}
              />
            </GridItem>
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
