import './AddQuestionModal.css'
import React from "react";
import { Box, Input, Modal, Typography, Button } from "@mui/material";
import SelectComplexityInput from './SelectComplexityInput';
import SelectCategoriesInput from './SelectCategoriesInput';
import { QuestionString } from '../../../Commons';

interface Props {
  isVisible: boolean;
  closeHandler: () => void;
  newQuestionSetter: React.Dispatch<React.SetStateAction<QuestionString>>;
  submitHandler: () => void;
}

const AddQuestionModal: React.FC<Props> =
  ({ isVisible, closeHandler, newQuestionSetter, submitHandler }) => {
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
              onChange={(e) => {
                newQuestionSetter(q => {
                  return ({ ...q, title: e.target.value });
                })
              }}
            />
            <Input
              id='link-input'
              placeholder="Link"
              onChange={(e) => {
                newQuestionSetter(q => {
                  return ({ ...q, link: e.target.value });
                })
              }}
            />
            <div id='middle-container'>
              <div id='categories-setter-container'>
                <SelectCategoriesInput
                  onChangeHandler={(value: string) =>
                    newQuestionSetter(q => {
                      return ({ ...q, categories: value });
                    })}
                />
              </div>
              <div id='complexity-setter-container'>
                <SelectComplexityInput
                  onChangeHandler={(value: string) =>
                    newQuestionSetter(q => {
                      return ({ ...q, complexity: value });
                    })}
                />
              </div>
            </div>
            <Input
              id='description-input'
              placeholder="Description"
              multiline minRows={10}
              onChange={(e) => {
                newQuestionSetter(q => {
                  return ({ ...q, description: e.target.value });
                })
              }}
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
