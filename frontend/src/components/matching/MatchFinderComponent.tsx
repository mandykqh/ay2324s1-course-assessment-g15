import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import LocalStorageHandler from '../../handlers/LocalStorageHandler';
import { MATCHING_SERVICE_URL } from '../../../src/configs';

const MatchFinderComponent: React.FC = () => {
  const [message, setMessage] = useState<string>('');


  // Function to send 'find_match' event to the server
  const findMatch = () => {
    const socket = io(MATCHING_SERVICE_URL);

    socket.on('finding_match', (data) => {
      setMessage(data.message);
    });

    socket.on('match_found', (data) => {
      setMessage(`Match found: matched with ${data.other_user}`);
    });

    socket.on('timeout', (data) => {
      setMessage(data.message);
    });

    const currentUser = LocalStorageHandler.getUserData();
    const data = {
      user_id: currentUser?.id.toString(), // Replace with the user's ID
      categories: 'Tree', // Replace with the desired categories
      difficulty: 'Easy', // Replace with the desired difficulty level
    };

    socket.emit('find_match', data);
  };

  return (
    <div>
      <button onClick={findMatch}>Find Match</button>
      <p>{message}</p>
    </div>
  );
};

export default MatchFinderComponent;
