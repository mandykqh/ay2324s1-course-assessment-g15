import React, { useState, useEffect } from 'react';
import { Center, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Spinner, Grid, Text } from '@chakra-ui/react';

interface TimerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTime: number; // Initial time in seconds
}

const TimerModal: React.FC<TimerModalProps> = ({ isOpen, onClose, initialTime }) => {
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
  }, [isOpen, time, initialTime]); // Include initialTime in the dependency array

  useEffect(() => {
    // Reset the timer when the modal is opened
    if (isOpen) {
      setTime(initialTime);
    }
  }, [isOpen, initialTime]);

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
            {time > 0 ? (
              <>
                <Spinner thickness='12px' speed='0.85s' color='blue.500' size="xl" />
                <Text mt={2}>Time Remaining: {time} seconds</Text>
              </>
            ) : (
              <Text>No match found!</Text>
            )}
          </Center>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default TimerModal;
