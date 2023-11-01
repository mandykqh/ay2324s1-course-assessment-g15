import { Grid, Text } from "@chakra-ui/react";
import { useContext, useEffect, useState } from 'react';
import { SECONDARY_COLOR } from "../../CommonStyles";
import { getCategoriesString, getComplexityStrings, stringToOptionsMapper } from '../../Util';
import { Box } from '@chakra-ui/react';
import { MultiValue, Select } from "chakra-react-select";
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
        // Perform an initial GET request here to fetch categories and complexity data
        QuestionRequestHandler.getMatchingFields().then((data) => {
            const { categories, complexity } = data;
            setCategories(categories);
            setComplexity(complexity);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      }, []);

    useEffect(() => {
        setMatchingCache({
          categories: categories,
          complexity: complexity,
        }
        );
      }, [categories, complexity])

    return (
        <Grid gap={4}>
            <Grid gap={1}>
                <Text as="b">Category</Text>
                <Box backgroundColor={SECONDARY_COLOR} borderRadius="5px" width={selectWidth}>
                    <Select
                        // TODO: Change this to multi-select
                        onChange={(e: MultiValue<SelectOption | unknown>) => {
                            const inputStringArr = e.map(
                            (q) => {
                                return ((q as SelectOption).value);
                            }
                            );
                            setCategories(inputStringArr);
                        }}
                        isMulti
                        // onChange={(e) => {
                        //     setCategories((e as SelectOption).value);
                        // }}
                        options={categoryOptions}
                        placeholder="Select Category"
                        // closeMenuOnSelect={false}
                        value={
                            stringToOptionsMapper(matchingCache.categories.join(', '))
                            // stringToOptionsMapper(matchingCache.categories)
                        }
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
                        value={ stringToOptionsMapper(matchingCache.complexity) }
                    />
                </Box>
            </Grid>
        </Grid>
    );
};

export default MatchingForm;

