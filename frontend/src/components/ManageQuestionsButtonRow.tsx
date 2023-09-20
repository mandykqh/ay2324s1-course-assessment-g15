import { Button } from '@chakra-ui/react'

interface Props {
  addHandler: () => void,
  deleteHandler: () => void
}

const ManageQuestionsButtonRow: React.FC<Props> = ({ addHandler, deleteHandler }) => {
  return (
    <div id='button-container'>
      <Button id='add-btn' colorScheme='blue' onClick={addHandler}>
        Add
      </Button>
      <Button id='delete-btn' colorScheme='red' onClick={deleteHandler}>
        Delete
      </Button>
    </div>
  );
}

export default ManageQuestionsButtonRow;