import './DescriptionModal.css';
import { Box, Input, Modal, Typography } from "@mui/material";

interface Props {
  isVisible: boolean;
  title: string;
  category: string;
  complexity: string;
  description: string
  closeHandler: () => void;
}

const DescriptionModal: React.FC<Props> =
  ({ isVisible, title, category, complexity, description, closeHandler }) => {
    return (
      <Modal
        open={isVisible}
        onClose={() => { }}
      >
        <Box id='modal-box'>
          <div id='inner-modal-container'>
            <div onClick={closeHandler} style={{ width: '20px', height: '20px', alignSelf: 'end' }}>
              {/* TODO change this button to image */}
              <b>X</b>
            </div>
            <div id='top-row'>
              <Typography id="modal-title" variant="h5" component="h2" color={"white"}>
                {title}
              </Typography>
            </div>
            <div id='middle-row'>
              <div id='middle-left-container'>
                <Typography id="category-label" component="h3" color={"white"} textAlign={'left'}>
                  {`Category: ${category}`}
                </Typography>
              </div>
              <div id='middle-right-container'>
                <Typography id="complexity-label" component="h3" color={"white"}>
                  {`Complexity: ${complexity}`}
                </Typography>
              </div>
            </div>
            <div id='bottom-row'>
              <Input
                id='description-input'
                multiline
                minRows={20}
                maxRows={20}
                fullWidth
                disabled
                value={description}
              />
            </div>
          </div>
        </Box>
      </Modal>
    );
  }

export default DescriptionModal;