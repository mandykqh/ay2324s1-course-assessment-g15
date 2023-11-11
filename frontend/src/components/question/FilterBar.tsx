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

const complexityOptions = getComplexityStrings()
  .map(value => ({ value: value, label: value }));

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
    <Flex justifyContent="space-between" alignItems="center" mb={4} py={5} w={1000}>
      <Box backgroundColor={SECONDARY_COLOR} borderRadius="5px" flex="60%" mr={5}>
        <Select
          isMulti
          options={categoryOptions}
          placeholder="Filter Category"
          closeMenuOnSelect={false}
          value={stringToOptionsMapper(selectedCategories.join(', '))}
          onChange={(e: MultiValue<SelectOption | unknown>) => {
            const inputStringArr = e.map((q) => (q as SelectOption).value);
            setSelectedCategories(inputStringArr);
          }}
        />
      </Box>
      <Box backgroundColor={SECONDARY_COLOR} borderRadius='5px' flex="40%" mr={5}>
        <Select
          onChange={(e) => {
            setSelectedComplexity(e ? e.value : '');
          }}
          options={complexityOptions}
          placeholder="Filter Complexity"
          value={stringToOptionsMapper(selectedComplexity)}
          isClearable
        />
      </Box>
    </Flex >
  );
};

export default FilterBar;
