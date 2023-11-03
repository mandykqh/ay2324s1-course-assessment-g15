import { useContext, useEffect, useState } from 'react';
import { getCategoriesString, getComplexityStrings, stringToOptionsMapper } from '../../Util';
import { MultiValue, Select } from "chakra-react-select";
import { Box } from '@chakra-ui/react';
import { QuestionCacheContext } from '../../contexts/QuestionCacheContext';
import { SECONDARY_COLOR } from '../../CommonStyles';
import LocalStorageHandler from '../../handlers/LocalStorageHandler';

interface SelectOption {
    value: string;
    label: string;
}

const categoryOptions = getCategoriesString().map(value => {
    return (
        { value: value, label: value }
    );
});

interface SelectOption {
    value: string;
    label: string;
}

const complexityOptions = getComplexityStrings().map(value => {
    return (
        { value: value, label: value }
    );
});

type QuestionPreferencesProps = {
    onFilter: (filterOptions: { categories: string[]; complexity: string }) => void;
};

const QuestionPreferences: React.FC<QuestionPreferencesProps> = ({ onFilter }) => {
    const { questionCache, setQuestionCache } = useContext(QuestionCacheContext);
    const [selectedCategories, setSelectedCategories] = useState(questionCache.categories);
    const [selectedComplexity, setSelectedComplexity] = useState(questionCache.complexity);

    useEffect(() => {
        const matchData = LocalStorageHandler.getMatchData();
        if (matchData) {
            setSelectedComplexity(matchData.question.complexity);
            setSelectedCategories(matchData.question.categories);
        }
    }, [])


    useEffect(() => {
        onFilter({ categories: selectedCategories, complexity: selectedComplexity });
    }, [selectedCategories, selectedComplexity]);


    // Handle category changes
    const handleCategoryChange = (newCategories) => {
        setSelectedCategories(newCategories);
        // Update the context or perform any other necessary actions
        setQuestionCache({
            ...questionCache,
            categories: newCategories,
        });
    };

    const handleComplexityChange = (selectedComplexity) => {
        setSelectedComplexity(selectedComplexity);
        // Update the context or perform any other necessary actions
        setQuestionCache({
            ...questionCache,
            complexity: selectedComplexity,
        });
    };

    return (
        <>
            <Box backgroundColor={SECONDARY_COLOR} borderRadius='5px'>
                <Select
                    onChange={(e: MultiValue<SelectOption | unknown>) => {
                        const inputStringArr = e.map(
                            (q) => {
                                return ((q as SelectOption).value);
                            }
                        );
                        handleCategoryChange(inputStringArr);
                    }}
                    isMulti
                    options={categoryOptions}
                    placeholder="Select Category"
                    closeMenuOnSelect={false}
                    value={stringToOptionsMapper(selectedCategories ? selectedCategories.join(', ') : '')}
                />
                <Select
                    onChange={(e) => {
                        setSelectedComplexity((e as SelectOption).value);
                        handleComplexityChange(e?.value);
                    }}
                    options={complexityOptions}
                    placeholder="Select Complexity"
                    value={stringToOptionsMapper(selectedComplexity ? selectedComplexity : '')}
                />
            </Box>
        </>
    );
};

export default QuestionPreferences;