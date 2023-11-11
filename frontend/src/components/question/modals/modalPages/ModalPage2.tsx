// ModalPage2.tsx
import React from "react";
import { Grid, Textarea, Text } from "@chakra-ui/react";
import { SECONDARY_COLOR } from "../../../../CommonStyles";

interface ModalPage2Props {
  description: string;
  onDescriptionChange: (description: string) => void;
}

const ModalPage2: React.FC<ModalPage2Props> = ({ description, onDescriptionChange }) => {
  return (
    <Grid gap={2}>
      <Text as='b'>Description</Text>
      <Textarea
        rows={15}
        placeholder='Enter Question Description'
        resize={'none'}
        bg='primary.blue1'
        border='2px solid #244153'
        onChange={(e) => onDescriptionChange(e.target.value)} // Use the provided callback function
        value={description} // Use the provided prop
      />
    </Grid>
  );
}

export default ModalPage2;
