import { Grid, Textarea, Text } from "@chakra-ui/react";
import { SECONDARY_COLOR } from "../../../CommonStyles";
import { useState, useContext, useEffect } from "react";
import { NewQuestionContext } from "../../../contexts/NewQuestionContext";

const ModalPage2 = () => {
  const { questionData, setQuestionData } = useContext(NewQuestionContext);
  const [description, setDescription] = useState(questionData.description);

  useEffect(() => {
    setQuestionData({
      ...questionData,
      description: description
    });
  }, [description]);

  return (
    <Grid gap={2}>
      <Text as='b'>Description</Text>
      <Textarea
        rows={15}
        placeholder='Enter Question Description'
        resize={'none'}
        backgroundColor={SECONDARY_COLOR}
        onChange={(e) => { setDescription(e.target.value); }}
        value={questionData.description}
      />
    </Grid>
  );
}

export default ModalPage2;