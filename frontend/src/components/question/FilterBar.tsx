import React, { useState } from 'react';
import { Button, Flex, Input, Select } from '@chakra-ui/react'

const FilterBar = ({ onFilter }) => {
    const [categoryFilter, setCategoryFilter] = useState('');
    const [complexityFilter, setComplexityFilter] = useState('');

    const handleCategoryChange = (event) => {
        setCategoryFilter(event.target.value);
    };

    const handleComplexityChange = (event) => {
        // setComplexityFilter(event.target.value);
        const selectedValue = event.target.value;
        // selectedValue === '' ? console.log('placeholder selected') : console.log('not placehodler')

        setComplexityFilter(selectedValue);
        onFilter({ complexity: selectedValue });
    }
    const handleFilterClick = () => {
        onFilter({ category: categoryFilter, complexity: complexityFilter });
    };

    return (
        <div className="filter-bar">
            <Flex justifyContent="space-between" alignItems="center" mb={4}>
                <Select placeholder='Category' value={categoryFilter} onChange={handleCategoryChange}>
                    <option value='option1'>Option 1</option>
                    <option value='option2'>Option 2</option>
                    <option value='option3'>Option 3</option>
                </Select>
                <Select placeholder='Difficulty' value={complexityFilter} onChange={handleComplexityChange}>
                    <option value='Easy'>Easy</option>
                    <option value='Medium'>Medium</option>
                    <option value='Hard'>Hard</option>
                </Select>
                <Input placeholder='Search' />
                <Button colorScheme='blue'>Reset</Button>
            </Flex>
        </div>
    );
};

export default FilterBar;
