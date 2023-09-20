import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Flex,
  Spacer,
  Textarea,
  Grid
} from '@chakra-ui/react'
import { Button } from '@chakra-ui/button';
import { PRIMARY_COLOR } from '../../../CommonStyles';
import { QuestionString } from '../../../Commons';

interface Props {
  isVisible: boolean;
  data: QuestionString;
  closeHandler: () => void;
  deleteHandler: (id: string) => void;
}

const QuestionDetailsModal: React.FC<Props> =
  ({ isVisible, data, closeHandler, deleteHandler }) => {
    return (
      <>
        <Modal
          isOpen={isVisible}
          onClose={closeHandler}
          size={'xl'}
          autoFocus={false}
          colorScheme={'pink'}
        >
          <ModalOverlay />
          <ModalContent backgroundColor={PRIMARY_COLOR} style={{ color: 'white' }}>
            <ModalHeader color={'white'}>{data.title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Grid gap={5}>
                <Flex>
                  <Text color='white' as='b' marginRight={'3px'}>
                    Category:
                  </Text>
                  <Text color='white'>
                    {data.categories}
                  </Text>
                  <Spacer />
                  <Text color='white' as='b' marginRight={'3px'}>
                    Complexity:
                  </Text>
                  <Text color='white'>
                    {data.complexity}
                  </Text>
                </Flex>
                <Textarea
                  isReadOnly
                  rows={20}
                  resize={'none'}
                  value={data.description}
                />
              </Grid>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='red' mr={3} onClick={() => deleteHandler(data.id)}>
                Delete
              </Button>
              <Button colorScheme='blue' mr={3} onClick={closeHandler}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal >
      </>
    );
  }


export default QuestionDetailsModal;