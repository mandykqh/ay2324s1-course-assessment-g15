import { Button } from '@chakra-ui/react'

interface Props {
  addHandler: () => void,
}

const ManageQuestionsButtonRow: React.FC<Props> = ({ addHandler }) => {
  return (
    <div id='button-container'>
      <Button colorScheme='blue' onClick={addHandler} m={5} float='right'>
        Add
      </Button>
    </div>
  );
}

export default ManageQuestionsButtonRow;