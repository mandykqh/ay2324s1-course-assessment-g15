import { Button } from '@chakra-ui/react'

interface Props {
  addHandler: () => void,
}

const ManageQuestionsButtonRow: React.FC<Props> = ({ addHandler }) => {
  return (
    <div id='button-container'>
      <Button id='add-btn' colorScheme='blue' onClick={addHandler}>
        Add
      </Button>
    </div>
  );
}

export default ManageQuestionsButtonRow;