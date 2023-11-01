import { useContext, useEffect, useState } from 'react';
import { getCategoriesString, stringToOptionsMapper } from '../../../../../Util';
import { MultiValue, Select } from "chakra-react-select";
import { Box } from '@chakra-ui/react';
import { QuestionCacheContext } from '../../../../../contexts/QuestionCacheContext';
import { SECONDARY_COLOR } from '../../../../../commonStyles';

interface SelectOption {
  value: string;
  label: string;
}

const categoryOptions = getCategoriesString().map(value => {
  return (
    { value: value, label: value }
  );
});

// type SelectCategoriesInputProps = {
//   categorySelected: (category: string[]) => void;
// };

// const SelectCategoriesInput: React.FC<SelectCategoriesInputProps> = ({ categorySelected }) => {
const SelectCategoriesInput = () => {
  const { questionCache, setQuestionCache } = useContext(QuestionCacheContext);
  const [categories, setCategories] = useState(questionCache.categories);

  useEffect(() => {
    setQuestionCache({
      ...questionCache,
      categories: categories
    });
  }, [categories])


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
            setCategories(inputStringArr);
          }}
          isMulti
          options={categoryOptions}
          placeholder="Select Category"
          closeMenuOnSelect={false}
          value={stringToOptionsMapper(questionCache.categories.join(', '))}
        />
      </Box>
    </>
  );
}

export default SelectCategoriesInput;
