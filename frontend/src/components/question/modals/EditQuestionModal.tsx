import React, { useEffect, useContext, useState } from "react";
import ModalPage1 from './modalPages/ModalPage1';
import ModalPage2 from './modalPages/ModalPage2';
import { QuestionCacheContext } from '../../../contexts/QuestionCacheContext';
import { QuestionString } from '../../../Commons';
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

interface Props {
  isVisible: boolean;
  questionToEdit: QuestionString; // Added this prop to pass in the question to edit
  closeHandler: () => void;
  submitUpdateHandler: (updatedQuestion: QuestionString) => void;
}

const ModalButton = ({ label, color, onClick }: { label: string; color: string, onClick: () => void }) => {
  return (
    <Button colorScheme={color} mr={3} onClick={onClick}>
      {label}
    </Button>
  );
};

const EditQuestionModal: React.FC<Props> = ({ isVisible, questionToEdit, closeHandler, submitUpdateHandler }) => {
  const [page, setPage] = useState(1);
  const { questionCache, setQuestionCache } = useContext(QuestionCacheContext);

  function close() {
    closeHandler();
    setQuestionCache(questionCache);
    setPage(1);
  }

  useEffect(() => {
    if (questionToEdit) {
      setQuestionCache({
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
      <ModalContent bg='primary.blue3' maxW="50vw" borderRadius='15px'>
        <ModalHeader color='white'>
          Edit Question
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {page === 1 &&
            <ModalPage1
              title={questionCache.title}
              link={questionCache.link}
              onTitleChange={(value) => setQuestionCache({ ...questionCache, title: value })}
              onLinkChange={(value) => setQuestionCache({ ...questionCache, link: value })}
            />
          }
          {page === 2 &&
            <ModalPage2
              description={questionCache.description}
              onDescriptionChange={(value) => setQuestionCache({ ...questionCache, description: value })}
            />
          }
        </ModalBody>
        <ModalFooter>
          {page === 1 && <ModalButton label='Next' color='blue' onClick={() => setPage(2)} />}
          {page === 2 &&
            <>
              <ModalButton label='Previous' color='red' onClick={() => { setPage(1) }} />
              <ModalButton label='Submit' color='blue'
                onClick={() => {
                  submitUpdateHandler(questionCache);
                  close();
                }} />
            </>
          }
        </ModalFooter>
      </ModalContent>
    </Modal >
  );
}

export default EditQuestionModal;
