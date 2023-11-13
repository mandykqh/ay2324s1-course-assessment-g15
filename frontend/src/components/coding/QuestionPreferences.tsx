import { useContext, useEffect, useState } from 'react';
import { getCategoriesString, getComplexityStrings, stringToOptionsMapper } from '../../Util';
import Select from 'react-select';
import { selectorStyles, multiSelectStyles } from '../../CommonStyles';
import {
    Modal,
    ModalFooter,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Grid,
    Text,
    Button
} from '@chakra-ui/react';
import { QuestionCacheContext } from '../../contexts/QuestionCacheContext';
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

const complexityOptions = getComplexityStrings().map(value => {
    return (
        { value: value, label: value }
    );
});

interface QuestionPreferencesProps {
    onFilter: (filterOptions: { categories: string[]; complexity: string }) => void;
    isVisible: boolean;
    closeHandler: () => void;
    onQuestionChange: () => void;
};

const QuestionPreferences: React.FC<QuestionPreferencesProps> = ({ onFilter, isVisible, closeHandler, onQuestionChange }) => {
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

    function close() {
        closeHandler();
    }

    return (
        <>
            <Modal
                isOpen={isVisible}
                onClose={close}
                autoFocus={false}
                closeOnOverlayClick={false}
                blockScrollOnMount={true}
            >
                <ModalOverlay />
                <ModalContent bg='primary.blue3' maxW="50vw" borderRadius='15px'>
                    <ModalHeader color='white'>
                        Change Question
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Grid gap={2} mb={2}>
                            <Text as='b'>Category</Text>
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
                                styles={{
                                    ...selectorStyles,
                                    ...multiSelectStyles,
                                }}
                                components={{
                                    IndicatorSeparator: () => null
                                }}
                            />
                        </Grid>
                        <Grid gap={2}>
                            <Text as='b'>Complexity</Text>
                            <Select
                                onChange={(e) => {
                                    setSelectedComplexity(e ? e.value : '');
                                    handleComplexityChange(e?.value);
                                }}
                                options={complexityOptions}
                                placeholder="Select Complexity"
                                value={stringToOptionsMapper(selectedComplexity ? selectedComplexity : '')}
                                isClearable
                                styles={{
                                    ...selectorStyles,
                                    singleValue: (provided, state) => ({
                                        ...provided,
                                        color: 'white',
                                    }),
                                    option: (provided, state) => ({
                                        ...provided,
                                        backgroundColor: state.isSelected ? 'black' : state.isFocused ? '#0B1825' : '#0D1117',
                                        color: 'white',
                                    }),
                                }}
                                components={{
                                    IndicatorSeparator: () => null
                                }}
                            />
                        </Grid>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            colorScheme='blue'
                            onClick={() => {
                                onQuestionChange();
                                closeHandler();
                            }}>Confirm</Button>
                    </ModalFooter>

                </ModalContent>
            </Modal >

        </>
    );
};

export default QuestionPreferences;