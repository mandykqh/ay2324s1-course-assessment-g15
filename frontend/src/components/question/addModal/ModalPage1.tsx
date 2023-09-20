import { Grid, Input, Text } from "@chakra-ui/react";
import { SECONDARY_COLOR } from "../../../CommonStyles";
import SelectCategoriesInput from "./SelectCategoriesInput";
import SelectComplexityInput from "./SelectComplexityInput";
import { NewQuestionContext } from "../../../contexts/NewQuestionContext";
import { useContext, useEffect, useState } from "react";

const ModalPage1 = () => {
  const { questionData, setQuestionData } = useContext(NewQuestionContext);
  const [title, setTitle] = useState(questionData.title);
  const [link, setLink] = useState(questionData.link);

  useEffect(() => {
    setQuestionData({ ...questionData, title: title });
  }, [title]);

  useEffect(() => {
    setQuestionData({ ...questionData, link: link });
  }, [link]);

  return (
    <Grid gap={4}>
      <Grid gap={1}>
        <Text as='b'>Title</Text>
        <Input
          placeholder={'Enter Question Title'}
          backgroundColor={SECONDARY_COLOR}
          onChange={(e) => setTitle(e.target.value)}
          value={questionData.title}
        />
      </Grid>
      <Grid gap={1}>
        <Text as='b'>Link</Text>
        <Input
          placeholder={'Enter Question Link'}
          backgroundColor={SECONDARY_COLOR}
          onChange={(e) => setLink(e.target.value)}
          value={questionData.link}
        />
      </Grid>
      <Grid gap={1}>
        <Text as='b'>Category</Text>
        <SelectCategoriesInput />
      </Grid>
      <Grid gap={1}>
        <Text as='b'>Complexity</Text>
        <SelectComplexityInput />
      </Grid>
    </Grid>
  );
}

export default ModalPage1;