import React, { useContext, useState } from "react";
import { QuestionString, questionStringTemplate } from '../../../Commons';
import ModalPage1 from '../modalPages/ModalPage1';
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
import ModalPage2 from '../modalPages/ModalPage2';
import { NewQuestionContext } from '../../../contexts/NewQuestionContext';
interface Props {
  isVisible: boolean;
  closeHandler: () => void;
  submitHandler: () => void;
}

const ModalButton = ({ label, onClick }: { label: string; onClick: () => void }) => {
  return (
    <Button colorScheme='blue' mr={3} onClick={onClick}>
      {label}
    </Button>
  );
};

const AddQuestionModal: React.FC<Props> = ({ isVisible, closeHandler, submitHandler }) => {
  const [page, setPage] = useState(1);
  const { setQuestionData, questionData } = useContext(NewQuestionContext);

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
          {page === 1 ? (
            <ModalPage1
              title={questionData.title}
              link={questionData.link}
              onTitleChange={(value) => setQuestionData({ ...questionData, title: value })}
              onLinkChange={(value) => setQuestionData({ ...questionData, link: value })}
            />
          ) : (
            <ModalPage2
              description={questionData.description}
              onDescriptionChange={(value) => setQuestionData({ ...questionData, description: value })}
            />
          )}
        </ModalBody>
        <ModalFooter>
          {page === 1 ? (
            <ModalButton label='Next' onClick={() => setPage(2)} />
          ) : (
            <>
              <ModalButton label='Previous' onClick={() => { setPage(1) }} />
              <ModalButton label='Submit'
                onClick={() => {
                  try {
                    submitHandler();
                    close();
                  } catch {
                    close();
                  }
                }} />
            </>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal >
  );
}

export default AddQuestionModal;