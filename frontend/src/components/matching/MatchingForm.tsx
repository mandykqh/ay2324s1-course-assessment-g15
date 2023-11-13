import { Grid, Text } from "@chakra-ui/react";
import { useContext, useEffect, useState } from 'react';
import { SECONDARY_COLOR } from "../../CommonStyles";
import { getCategoriesString, getComplexityStrings, stringToOptionsMapper } from '../../Util';
import { Box } from '@chakra-ui/react';
import Select from 'react-select'
import { selectorStyles, singleSelectStyles, multiSelectStyles } from '../../CommonStyles';


import React from "react";
import { MatchingCacheContext } from "../../contexts/MatchingCacheContext";
import QuestionRequestHandler from "../../handlers/QuestionRequestHandler";

interface SelectOption {
  value: string;
  label: string;
}

const categoryOptions = getCategoriesString().map((value: any) => {
  return ({ value: value, label: value });
});

const complexityOptions = getComplexityStrings().map((value: any) => {
  return ({ value: value, label: value });
});

const MatchingForm: React.FC = () => {
  const { matchingCache, setMatchingCache } = useContext(MatchingCacheContext);
  const [categories, setCategories] = useState(matchingCache.categories);
  const [complexity, setComplexity] = useState(matchingCache.complexity);

  // Define a fixed width for the Select components
  const selectWidth = "500px";

  useEffect(() => {
    setMatchingCache({
      categories: categories,
      complexity: complexity,
    }
    );
  }, [categories, complexity])

  return (
    <Box>
      <Grid gap={4}>
        <Grid gap={1} >
          <Text as="b">Category</Text>
          <Box backgroundColor={SECONDARY_COLOR} borderRadius="5px" width={selectWidth}>
            <Select
              onChange={(e: MultiValue<SelectOption | unknown>) => {
                const inputStringArr = e.map(
                  (q) => {
                    return ((q as SelectOption).value);
                  }
                );
                setCategories(inputStringArr);
              }}
              isMulti
              options={categoryOptions}
              placeholder="Select Category"
              closeMenuOnSelect={false}
              value={stringToOptionsMapper(matchingCache.categories.join(', '))}
              styles={{
                ...selectorStyles,
                ...multiSelectStyles,
              }}
              components={{
                IndicatorSeparator: () => null
              }}
            />
          </Box>
        </Grid>
        <Grid gap={1}>
          <Text as="b">Complexity</Text>
          <Box backgroundColor={SECONDARY_COLOR} borderRadius="5px" width={selectWidth}>
            <Select
              onChange={(e) => { setComplexity((e as SelectOption).value) }}
              options={complexityOptions}
              placeholder="Select Category"
              value={stringToOptionsMapper(matchingCache.complexity)}
              styles={{
                ...selectorStyles,
                ...singleSelectStyles,
              }}
              components={{
                IndicatorSeparator: () => null
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MatchingForm;
