import React, { useState, useEffect } from 'react';
import { Box, Center, Text, Button } from '@chakra-ui/react';
import { io, Socket } from 'socket.io-client';
import NavigationBar from '../components/NavigationBar';
import LocalStorageHandler from '../handlers/LocalStorageHandler';
import { useNavigate } from 'react-router-dom';

const CodingPage = () => {
  const navigate = useNavigate();

  function handleDisconnect() {
    LocalStorageHandler.deleteMatchData();
    navigate('../home');
  }

  return (
    <Box>
      <NavigationBar index={1} />
      <Center height='100vh'>
        <Button
          mt={4}
          onClick={() => handleDisconnect()}
        >
          Disconnect
        </Button>
      </Center>
    </Box>
  );
};

export default CodingPage;
