import './AddQuestionModal.css'
import { Box, Input, Modal, Typography, Button } from "@mui/material";
import React from "react";
import SelectComplexityInput from './SelectComplexityInput';
import SelectCategoriesInput from './SelectCategoriesInput';

interface Props {
  isVisible: boolean;
  closeHandler: () => void;
  titleSetter: React.Dispatch<React.SetStateAction<string>>;
  linkSetter: React.Dispatch<React.SetStateAction<string>>;
  categoriesSetter: React.Dispatch<React.SetStateAction<string>>;
  complexitySetter: React.Dispatch<React.SetStateAction<string>>;
  descriptionSetter: React.Dispatch<React.SetStateAction<string>>;
  submitHandler: () => void;
}

const AddQuestionModal: React.FC<Props> =
  ({ isVisible, closeHandler, titleSetter, linkSetter, categoriesSetter,
    complexitySetter, descriptionSetter, submitHandler }) => {

    return (
      <Modal
        open={isVisible}
      >
        <Box id='modal-box'>
          <div id='inner-modal-container'>
            <div onClick={closeHandler}>
              <Typography id='x-btn' color={'white'}>
                X
              </Typography>
            </div>
            <div id='header-container'>
              <Typography id="modal-title" variant="h6" component="h2" color={"white"}>
                Add Question
              </Typography>
            </div>
            <Input
              id='title-input'
              placeholder="Title"
              onChange={(e) => { titleSetter(e.target.value) }}
            />
            <Input
              id='link-input'
              placeholder="Link"
              onChange={(e) => { linkSetter(e.target.value) }}
            />
            <div id='middle-container'>
              <div id='categories-setter-container'>
                <SelectCategoriesInput setter={categoriesSetter} />
              </div>
              <div id='complexity-setter-container'>
                <SelectComplexityInput setter={complexitySetter} />
              </div>
            </div>
            <Input
              id='description-input'
              placeholder="Description"
              multiline minRows={10}
              onChange={(e) => { descriptionSetter(e.target.value) }}
            />
            <Button id='save-btn' size={'large'} onClick={submitHandler}>
              Save & Close
            </Button>
          </div>
        </Box>
      </Modal >
    );
  }

export default AddQuestionModal;
