import { useEffect, useState } from 'react';
import Select from 'react-select'
import { Flex, Box } from '@chakra-ui/react';
import { MultiValue } from 'chakra-react-select';
import { selectorStyles, multiSelectStyles } from '../../CommonStyles';
import { getCategoriesString, getComplexityStrings, stringToOptionsMapper } from '../../Util';

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
  onFilter: (filterOptions: { categories: string[]; complexity: string }) => void;
};

const FilterBar: React.FC<FilterBarProps> = ({ onFilter }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedComplexity, setSelectedComplexity] = useState('')

  useEffect(() => {
    onFilter({ categories: selectedCategories, complexity: selectedComplexity });
  }, [selectedCategories, selectedComplexity]);

  return (
    <>
      <Flex justifyContent="space-between" alignItems="center" my={5} w={'50vw'}>
        <Box
          borderRadius="5px"
          flex="70%"
          mr={3}
        >
          <Select
            onChange={(e: MultiValue<SelectOption | unknown>) => {
              const inputStringArr = e.map((q) => {
                return (q as SelectOption).value;
              });
              setSelectedCategories(inputStringArr);
            }}
            isMulti
            options={categoryOptions}
            placeholder="Select Category"
            closeMenuOnSelect={false}
            value={stringToOptionsMapper(selectedCategories.join(', '))}
            styles={{
              ...selectorStyles,
              ...multiSelectStyles,
            }}
            components={{
              IndicatorSeparator: () => null
            }}
          />
        </Box>
        <Box borderRadius='5px' flex="35%">
          <Select
            onChange={(e) => {
              setSelectedComplexity(e ? e.value : '');
            }}
            options={complexityOptions}
            placeholder="Select Complexity"
            value={stringToOptionsMapper(selectedComplexity)}
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
        </Box>
      </Flex >
    </>
  );
};

export default FilterBar;
