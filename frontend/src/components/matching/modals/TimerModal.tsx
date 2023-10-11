// TimerModal.js
import React, { useState, useEffect } from 'react';
import {
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Spinner,
  Text,
} from '@chakra-ui/react';

interface TimerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTime: number; // Initial time in seconds
  status: string;
  isTimeout: boolean;
  isMatchFound: boolean;
}

const TimerModal: React.FC<TimerModalProps> = ({ isOpen, onClose, initialTime, status, isTimeout, isMatchFound }) => {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    let timer: number;

    if (isOpen && time > 0) {
      timer = setInterval(() => {
        if (time > 0) {
          setTime(time - 1);
        } else {
          clearInterval(timer);
        }
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isOpen, time, initialTime]);

  useEffect(() => {
    // Reset the timer when the modal is opened
    if (isOpen) {
      setTime(initialTime);
    }
  }, [isOpen, initialTime]);

  useEffect(() => {
    // Close the modal after 3 seconds if either isMatchFound or isTimeout is true
    if (isMatchFound || isTimeout) {
      const closeTimer = setTimeout(() => {
        onClose();
      }, 3000);

      // Cleanup the timer when the component unmounts or when isOpen becomes false
      return () => {
        clearTimeout(closeTimer);
      };
    }
  }, [isOpen, isMatchFound, isTimeout, onClose]);

  return (
    <Modal isOpen={isOpen} onClose={() => { onClose(); setTime(initialTime); }}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Center>
            <Text textAlign="center">Finding a match...</Text>
          </Center>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Center flexDirection="column">
            {isTimeout ? (
              <>
                <Text>Sorry, no match found!</Text>
                <Text>Please try again later.</Text>
              </>
            ) : (isMatchFound ? (
              <>
                <Text mt={2}>{status}</Text>
              </>
            ) : ( 
              <>
                <Spinner thickness='12px' speed='0.85s' color='blue.500' size="xl" />
                <Text mt={2}>{status}</Text>
                <Text mt={2}>Time Remaining: {time} seconds</Text>
              </>
            ))}
          </Center>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default TimerModal;
