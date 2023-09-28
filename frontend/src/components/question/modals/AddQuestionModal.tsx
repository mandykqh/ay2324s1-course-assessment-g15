import React, { useContext, useState } from "react";
import { emptyQuestionString } from '../../../commons';
import ModalPage1 from './modalPages/ModalPage1';
import ModalPage2 from './modalPages/ModalPage2';
import { PRIMARY_COLOR } from '../../../commonStyles';
import { QuestionCacheContext } from '../../../contexts/QuestionCacheContext';
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
  const { questionCache, setQuestionCache } = useContext(QuestionCacheContext);

  function close() {
    closeHandler();
    setQuestionCache(emptyQuestionString);
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
          {page === 1 && <ModalButton label='Next' onClick={() => setPage(2)} />}
          {page === 2 &&
            <>
              <ModalButton label='Previous' onClick={() => { setPage(1) }} />
              <ModalButton label='Submit'
                onClick={submitHandler} />
            </>
          }
        </ModalFooter>
      </ModalContent>
    </Modal >
  );
}

export default AddQuestionModal;