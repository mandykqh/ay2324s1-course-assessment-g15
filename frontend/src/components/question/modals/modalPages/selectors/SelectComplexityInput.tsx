import { useContext, useEffect, useState } from "react";
import { getComplexityStrings, stringToOptionsMapper } from "../../../../../Util";
import { Box } from '@chakra-ui/react';
import { SECONDARY_COLOR } from '../../../../../commonStyles';
import { Select } from 'chakra-react-select';
import { QuestionCacheContext } from '../../../../../contexts/QuestionCacheContext';

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
  const { questionCache, setQuestionCache } = useContext(QuestionCacheContext);
  const [complexity, setComplexity] = useState(questionCache.complexity);

  useEffect(() => {
    setQuestionCache({
      ...questionCache,
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
          value={stringToOptionsMapper(questionCache.complexity)}
        />
      </Box>
    </>
  );
}

export default SelectComplexityInput;
