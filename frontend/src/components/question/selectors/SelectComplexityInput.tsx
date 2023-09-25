import { useContext, useEffect, useState } from "react";
import { getComplexityStrings, stringToOptionsMapper } from "../../../Util";
import { Box } from '@chakra-ui/react';
import { SECONDARY_COLOR } from '../../../CommonStyles';
import { Select } from 'chakra-react-select';
import { NewQuestionContext } from '../../../contexts/NewQuestionContext';

interface SelectOption {
  value: string;
  label: string;
}

const complexityOptions = getComplexityStrings().map(value => {
  return (
    { value: value, label: value }
  );
});

const SelectComplexityInput = () => {
  const { questionData, setQuestionData } = useContext(NewQuestionContext);
  const [complexity, setComplexity] = useState(questionData.complexity);

  useEffect(() => {
    setQuestionData({
      ...questionData,
      complexity: complexity
    }
    );
  }, [complexity])

  return (
    <>
      <Box backgroundColor={SECONDARY_COLOR} borderRadius='5px'>
        <Select
          onChange={(e) => {
            setComplexity((e as SelectOption).value);
          }}
          options={complexityOptions}
          placeholder="Select Complexity"
          value={stringToOptionsMapper(questionData.complexity)}
        />
      </Box>
    </>
  );
}

export default SelectComplexityInput;
