import React, { useEffect, useContext, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button
} from '@chakra-ui/react';
import { PRIMARY_COLOR } from '../../../CommonStyles';
import ModalPage1 from '../modalPages/ModalPage1';
import ModalPage2 from '../modalPages/ModalPage2';
import { NewQuestionContext } from '../../../contexts/NewQuestionContext';
import { QuestionString } from '../../../Commons';

interface Props {
  isVisible: boolean;
  questionToEdit: QuestionString; // Added this prop to pass in the question to edit
  closeHandler: () => void;
  submitUpdateHandler: (updatedQuestion: QuestionString) => void;
}

const ModalButton = ({ label, color, onClick }: { label: string; color: string, onClick: () => void }) => {
  return (
    <Button colorScheme={ color } mr={3} onClick={onClick}>
      {label}
    </Button>
  );
};

const EditQuestionModal: React.FC<Props> = ({ isVisible, questionToEdit, closeHandler, submitUpdateHandler }) => {
  const [page, setPage] = useState(1);
  const { setQuestionData, questionData } = useContext(NewQuestionContext);

  function close() {
    closeHandler();
    setQuestionData(questionData);
    setPage(1);
  }

  useEffect(() => {
    if (questionToEdit) {
      setQuestionData({
        id: questionToEdit.id,
        title: questionToEdit.title,
        link: questionToEdit.link,
        description: questionToEdit.description,
        categories: questionToEdit.categories,
        complexity: questionToEdit.complexity,
      });
    }
  }, [questionToEdit]);

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
          Edit Question
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
            <ModalButton label='Next' color='blue' onClick={() => setPage(2)} />
          ) : (
            <>
              <ModalButton label='Previous' color='blue' onClick={() => { setPage(1) }} />
              <ModalButton label='Submit update' color='cyan' 
                onClick={() => {
                  try {
                    submitUpdateHandler(questionData);
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

export default EditQuestionModal;
