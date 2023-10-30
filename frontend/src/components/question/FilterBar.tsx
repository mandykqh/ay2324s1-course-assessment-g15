// import React, { useState } from 'react';
// import { Box, Text, Grid, Button, Flex, Input, Select, GridItem } from '@chakra-ui/react'
// import Category from '../../models/enums/Category';
// import SelectCategoriesInput from './modals/modalPages/selectors/SelectCategoriesInput';
// import SelectComplexityInput from './modals/modalPages/selectors/SelectComplexityInput';
// import { wrap } from 'framer-motion';

// interface FilterBarProps {
//     categorySelected: (category: string[]) => void;
// }

// const FilterBar: React.FC<FilterBarProps> = ({ categorySelected }) => {
//     return (
//         <div className="filter-bar">
//             <Flex justifyContent="space-between" alignItems="center" py={4} maxWidth={1000} width={1000}>

//                 <Box flex="50%" mr={5}>
//                     <SelectCategoriesInput categorySelected={categorySelected} />
//                 </Box>
//                 <Box flex="15%" mr={5}>
//                     <SelectComplexityInput />
//                 </Box>
//                 <Box flex="30%" mr={5}>
//                     <Input placeholder='Search' />
//                 </Box>
//                 <Box flex="5%">
//                     <Button colorScheme='blue'>Reset</Button>
//                 </Box>
//             </Flex>
//         </div>
//     );
// };

// export default FilterBar;




//----------------

// import React, { useState } from 'react';
// import { Menu, MenuItem, MenuList, MenuButton, MenuOptionGroup, MenuItemOption, MenuDivider, Button, Flex, Input, Select } from '@chakra-ui/react'
// import Category from '../../models/enums/Category';
// const FilterBar = ({ onFilter }) => {
//     const [categoryFilter, setCategoryFilter] = useState('');
//     const [complexityFilter, setComplexityFilter] = useState('');
//     const allCategories = Object.values(Category).filter(value => typeof value === 'string');

//     const [selectedCategories, setSelectedCategories] = useState([]);

//     // Function to handle category selection
//     const handleCategorySelect = (selectedCategory) => {
//         if (selectedCategories.includes(selectedCategory)) {
//             // If category is already selected, remove it
//             setSelectedCategories(selectedCategories.filter((category) => category !== selectedCategory));
//         } else {
//             // If category is not selected, add it
//             setSelectedCategories([...selectedCategories, selectedCategory]);
//         }
//     };

//     const handleCategoryChange = (event) => {
//         setCategoryFilter(event.target.value);
//         const selectedValue = event.target.value;
//         setCategoryFilter(selectedValue);
//         onFilter({ category: selectedValue });

//     };

//     const handleComplexityChange = (event) => {
//         // setComplexityFilter(event.target.value);
//         const selectedValue = event.target.value;
//         // selectedValue === '' ? console.log('placeholder selected') : console.log('not placehodler')
//         setComplexityFilter(selectedValue);
//         onFilter({ complexity: selectedValue });
//     }
//     const handleFilterClick = () => {
//         onFilter({ category: categoryFilter, complexity: complexityFilter });
//     };
//     // const handleFilterClick = () => {
//     //     onFilter({ category: categoryFilter, complexity: complexityFilter });
//     // };

//     return (
//         <div className="filter-bar">
//             <Flex justifyContent="space-between" alignItems="center" mb={4}>
//                 <Select placeholder='Category' value={categoryFilter} onChange={handleCategoryChange}>
//                     {allCategories.map((category) => (
//                         <option key={category} value={category}>
//                             {category}
//                         </option>
//                     ))}
//                 </Select>

//                 <Menu closeOnSelect={false}>
//                     <MenuButton as={Button}>
//                         Actions
//                     </MenuButton>
//                     <MenuList minWidth='240px'>
//                         <MenuOptionGroup defaultValue='asc' type='radio'>
//                             <MenuItemOption value='clear'>Clear All</MenuItemOption>
//                         </MenuOptionGroup>
//                         <MenuDivider />
//                         <MenuOptionGroup type='checkbox'>
//                             {allCategories.map((category) => (
//                                 <MenuItemOption key={category} value={category}>
//                                     {category}
//                                 </MenuItemOption>
//                             ))}
//                         </MenuOptionGroup>
//                     </MenuList>
//                 </Menu>
//                 <Select placeholder='Difficulty' value={complexityFilter} onChange={handleComplexityChange}>
//                     <option value='Easy'>Easy</option>
//                     <option value='Medium'>Medium</option>
//                     <option value='Hard'>Hard</option>
//                 </Select>
//                 <Input placeholder='Search' />
//                 <Button colorScheme='blue'>Reset</Button>
//             </Flex>

//         </div>
//     );
// };
// export default FilterBar;

import { useEffect, useState } from 'react';
import { getCategoriesString, getComplexityStrings, stringToOptionsMapper } from '../../Util';
import { MultiValue, Select } from 'chakra-react-select';
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
                <Box backgroundColor={SECONDARY_COLOR} borderRadius="5px" flex="60%" mr={5}>
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
                    />
                </Box>
                <Box backgroundColor={SECONDARY_COLOR} borderRadius='5px' flex="40%" mr={5}>
                    <Select
                        onChange={(e) => {
                            setSelectedComplexity(e ? e.value : '');
                            // onFilter({ categories: selectedCategories, complexity: selectedComplexity })
                        }}
                        options={complexityOptions}
                        placeholder="Select Complexity"
                        value={stringToOptionsMapper(selectedComplexity)}
                        isClearable
                    />
                </Box>
            </Flex >
        </>
    );
};

export default FilterBar;
