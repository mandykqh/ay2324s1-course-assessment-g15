import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  VStack,
  HStack,
  Box,
  Flex,
  Spacer,
  Textarea
} from '@chakra-ui/react'
import './DescriptionModal.css';
import { Button } from '@chakra-ui/button';
import { PRIMARY_COLOR } from '../../../CommonStyles';

interface Props {
  isVisible: boolean;
  data: {
    title: string;
    categories: string;
    complexity: string;
    description: string
  };
  closeHandler: () => void;
}

const DescriptionModal: React.FC<Props> =
  ({ isVisible, data, closeHandler }) => {
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
              <Flex flexDirection={'column'}>
                <Flex>
                  <Text color='white'>
                    {`Category: ${data.categories}`}
                  </Text>
                  <Spacer />
                  <Text color='white'>
                    {`Complexity: ${data.complexity}`}
                  </Text>
                </Flex>
                <Textarea
                  color={'white'}
                  textColor={'white'}
                  id='description-tb'
                  isReadOnly
                  rows={20}
                  resize={'none'}
                >
                  {data.description}
                </Textarea>
              </Flex>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={closeHandler}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal >
      </>
    );
  }


export default DescriptionModal;