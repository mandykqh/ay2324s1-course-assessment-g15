import React, { useEffect, useContext, useState } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button } from '@chakra-ui/react';
import { PRIMARY_COLOR } from '../../../CommonStyles';
import ModalPage1 from '../modalPages/ModalPage1';
import ModalPage2 from '../modalPages/ModalPage2';
import { NewQuestionContext } from '../../../contexts/NewQuestionContext';
import { QuestionString, questionStringTemplate } from '../../../Commons';

interface Props {
  isVisible: boolean;
  questionToEdit: QuestionString;
  closeHandler: () => void;
  updateHandler: (updatedQuestion: QuestionString) => void;
}

const ModalButton = ({ label, onClick }: { label: string; onClick: () => void }) => {
  return (
    <Button colorScheme='blue' mr={3} onClick={onClick}>
      {label}
    </Button>
  );
};

const EditQuestionModal: React.FC<Props> = ({ isVisible, questionToEdit, closeHandler, updateHandler }) => {
  const [page, setPage] = useState(1);
  const { setQuestionData } = useContext(NewQuestionContext);

  // State variables for form fields
  const [questionTitle, setQuestionTitle] = useState('');
  const [questionLink, setQuestionLink] = useState('');
  const [questionDescription, setQuestionDescription] = useState('');
  const [questionCategories, setQuestionCategories] = useState<string[]>([]);
  const [questionComplexity, setQuestionComplexity] = useState('');

  function close() {
    closeHandler();
    setQuestionData(questionStringTemplate);
    setPage(1);
  }

  useEffect(() => {
    if (questionToEdit) {
      // Populate fields with data from questionToEdit when it changes
      setQuestionTitle(questionToEdit.title);
      setQuestionLink(questionToEdit.link);
      setQuestionDescription(questionToEdit.description);
      setQuestionCategories(questionToEdit.categories);
      setQuestionComplexity(questionToEdit.complexity);
    }
    console.log(questionTitle, questionLink, questionDescription, questionCategories, questionComplexity);
  }, [questionToEdit]);

  const handleUpdate = () => {
    // Create a new question object with the updated data
    const updatedQuestion: QuestionString = {
      ...questionToEdit,
      title: questionTitle,
      link: questionLink,
      description: questionDescription,
      categories: questionCategories,
      complexity: questionComplexity,
    };

    // Call the submitHandler and pass the updated question
    updateHandler(updatedQuestion);

    // Close the modal
    close();
  };

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
              title={questionTitle}
              link={questionLink}
              onTitleChange={setQuestionTitle}
              onLinkChange={setQuestionLink}
            />
          ) : (
            <ModalPage2
              description={questionDescription}
              onDescriptionChange={setQuestionDescription}
            />
          )}
        </ModalBody>
        <ModalFooter>
          {page === 1 ? (
            <ModalButton label='Next' onClick={() => setPage(2)} />
          ) : (
            <>
              <ModalButton label='Previous' onClick={() => setPage(1)} />
              <ModalButton label='Update question' onClick={handleUpdate} />
            </>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditQuestionModal;
