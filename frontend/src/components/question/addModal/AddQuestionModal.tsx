import React, { useContext, useState } from "react";
import { QuestionString, questionStringTemplate } from '../../../Commons';
import ModalPage1 from './ModalPage1';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from '@chakra-ui/react';
import { PRIMARY_COLOR } from '../../../CommonStyles';
import ModalPage2 from './ModalPage2';
import { NewQuestionContext } from '../../../contexts/NewQuestionContext';

interface Props {
  isVisible: boolean;
  closeHandler: () => void;
  submitHandler: () => void;
}

const ModalButton = (label: string, onClick: () => void) => {
  return (
    <Button colorScheme='blue' mr={3} onClick={onClick}>
      {label}
    </Button>
  );
};

const AddQuestionModal: React.FC<Props> =
  ({ isVisible, closeHandler, submitHandler }) => {
    const [page, setPage] = useState(1);
    const { setQuestionData } = useContext(NewQuestionContext);
    const SecondPageButtons = () => {
      return (
        <>
          {ModalButton('Previous', () => { setPage(1) })}
          {ModalButton('Submit', submitHandler)}
        </>
      );
    }

    function close() {
      closeHandler();
      setQuestionData(questionStringTemplate);
      setPage(1);
    }

    return (
      <Modal
        isOpen={isVisible}
        onClose={close}
        autoFocus={false}
        closeOnOverlayClick={false}
        blockScrollOnMount={true}
      >
        <ModalOverlay />
        <ModalContent backgroundColor={PRIMARY_COLOR} maxW="50vw">
          <ModalHeader color='white'>
            Add Question
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {page === 1 ?
              <ModalPage1 /> :
              <ModalPage2 />
            }
          </ModalBody>
          <ModalFooter>
            {
              page === 1 ?
                ModalButton('Next', () => { setPage(2) })
                :
                SecondPageButtons()
            }
          </ModalFooter>
        </ModalContent>
      </Modal >
    );
  }

export default AddQuestionModal;
