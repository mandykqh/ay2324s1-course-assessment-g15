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

// const categoryOptions = getCategoriesString().map((value: any) => {
//     return ({ value: value, label: value });
// });

// const complexityOptions = getComplexityStrings().map((value: any) => {
//     return ({ value: value, label: value });
// });

const MatchingForm: React.FC = () => {
    const { matchingCache, setMatchingCache } = useContext(MatchingCacheContext);
    const [categories, setCategories] = useState(matchingCache.categories);
    const [complexity, setComplexity] = useState(matchingCache.complexity);
    const [availableCategories, setAvailableCategories] = useState<any>();
    const [availableComplexities, setAvailableComplexities] = useState<any>();

    // Define a fixed width for the Select components
    const selectWidth = "500px";

    useEffect(() => {
        const getMatchingFields = async () => {
            const matchingFields = await QuestionRequestHandler.getMatchingFields();
            setAvailableCategories(matchingFields.categories.sort().map((value: any) => {
                return ({ value: value, label: value });
            }));
            setAvailableComplexities(matchingFields.complexities.map((value: any) => {
                return ({ value: value, label: value });
            }));
        }
        getMatchingFields();
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
                        onChange={(e: MultiValue<SelectOption | unknown>) => {
                            const inputStringArr = e.map(
                            (q) => {
                                return ((q as SelectOption).value);
                            }
                            );
                            setCategories(inputStringArr);
                        }}
                        isMulti
                        options={availableCategories}
                        placeholder="Select Category"
                        closeMenuOnSelect={false}
                        value={ stringToOptionsMapper(matchingCache.categories.join(', ')) }
                    />
                </Box>
            </Grid>
            <Grid gap={1}>
                <Text as="b">Complexity</Text>
                <Box backgroundColor={SECONDARY_COLOR} borderRadius="5px" width={selectWidth}>
                    <Select
                        onChange={(e) => { setComplexity((e as SelectOption).value) }}
                        options={availableComplexities}
                        placeholder="Select Category"
                        value={ stringToOptionsMapper(matchingCache.complexity) }
                    />
                </Box>
            </Grid>
        </Grid>
    );
};

export default MatchingForm;

