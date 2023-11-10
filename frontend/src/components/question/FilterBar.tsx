import { useEffect, useState } from 'react';
import Select from 'react-select'
import { getCategoriesString, getComplexityStrings, stringToOptionsMapper } from '../../Util';
// import { MultiValue, Select } from 'chakra-react-select';
import '../../styles/styles.css'

import { Flex, Box } from '@chakra-ui/react';
import { SECONDARY_COLOR } from '../../CommonStyles';

interface SelectOption {
    value: string;
    label: string;
}

const categoryOptions = getCategoriesString().map((value) => {
    return { value: value, label: value };
});

const complexityOptions = getComplexityStrings().map(value => {
    return (
        { value: value, label: value }
    );
});

type FilterBarProps = {
    // onCategorySelected: (categories: string[]) => void;
    onFilter: (filterOptions: { categories: string[]; complexity: string }) => void;
};

const FilterBar: React.FC<FilterBarProps> = ({ onFilter }) => {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedComplexity, setSelectedComplexity] = useState('')
    // useEffect(() => {
    //     // Call the callback function with the selected categories
    //     onCategorySelected(selectedCategories);
    // }, [selectedCategories, onCategorySelected]);

    useEffect(() => {
        onFilter({ categories: selectedCategories, complexity: selectedComplexity });
    }, [selectedCategories, selectedComplexity]);


    return (
        <>
            <Flex justifyContent="space-between" alignItems="center" mb={4} py={5} w={1000}>
                <Box
                    borderRadius="5px"
                    flex="60%"
                    mr={5}
                >
                    <Select
                        onChange={(e: MultiValue<SelectOption | unknown>) => {
                            const inputStringArr = e.map((q) => {
                                return (q as SelectOption).value;
                            });
                            setSelectedCategories(inputStringArr);
                            // onFilter({ categories: inputStringArr, complexity: selectedComplexity })
                        }}
                        isMulti
                        options={categoryOptions}
                        placeholder="Select Category"
                        closeMenuOnSelect={false}
                        value={stringToOptionsMapper(selectedCategories.join(', '))}
                        styles={{
                            control: (baseStyles) => ({
                                ...baseStyles,
                                // borderColor: '#244153',
                                border: '2px solid #244153',
                                borderRadius: '10px',
                                backgroundColor: '#0D1117',
                            }),
                            option: (provided, state) => ({
                                ...provided,
                                backgroundColor: state.isFocused ? '#0B1825' : '#0D1117', // Change the background color as needed
                                color: state.isSelected ? 'black' : 'white', // Change the text color as needed
                            }),
                            menu: (provided) => ({
                                ...provided,
                                backgroundColor: 'transparent',
                            }),
                            multiValue: (base, state) => {
                                return state.data.isFixed ? { ...base, backgroundColor: '#0B1825' } : base;
                            },
                            multiValueLabel: (base, state) => {
                                return state.data.isFixed
                                    ? { ...base, fontWeight: 'bold', color: 'black', paddingRight: 6 }
                                    : base;
                            },
                            multiValueRemove: (base, state) => {
                                return state.data.isFixed ? { ...base, display: 'none' } : base;
                            },
                            placeholder: (provided, state) => ({
                                ...provided,
                                color: '#244153', // Change the color of the selected label in the Select bar
                            }),

                        }}
                        // theme={(theme) => ({
                        //     ...theme,
                        //     borderRadius: '18px',
                        //     colors: {
                        //         ...theme.colors,
                        //         text: 'white',
                        //         primary25: 'hotpink',
                        //         primary: 'black',
                        //     },
                        // })}
                        components={{
                            IndicatorSeparator: () => null
                        }}
                        className='select-input'

                    />
                </Box>
                <Box backgroundColor={SECONDARY_COLOR} borderRadius='5px' flex="40%" mr={5}>
                    <Select
                        onChange={(e) => {
                            setSelectedComplexity(e ? e.value : '');
                            // onFilter({ categories: selectedCategories, complexity: selectedComplexity })
                        }}
                        options={complexityOptions}
                        placeholder="Filter Complexity"
                        value={stringToOptionsMapper(selectedComplexity)}
                        isClearable
                    />
                </Box>
            </Flex >
        </>
    );
};

export default FilterBar;
