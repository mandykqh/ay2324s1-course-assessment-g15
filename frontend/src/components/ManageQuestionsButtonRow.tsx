import { Button } from "@mui/material";

interface Props {
  addHandler: () => void,
  deleteHandler: () => void
}

const ManageQuestionsButtonRow: React.FC<Props> = ({ addHandler, deleteHandler }) => {
  return (
    <div id='button-container'>
      <Button id='add-btn' variant='contained' onClick={addHandler}>
        Add
      </Button>
      <Button id='delete-btn' variant='contained' color='error'
        onClick={deleteHandler}>
        Delete
      </Button>
    </div>
  );
}

export default ManageQuestionsButtonRow;