import { useContext, useEffect, useState } from 'react';
import Select from 'react-select'
import { Box } from '@chakra-ui/react';
import { getCategoriesString, stringToOptionsMapper } from '../../../../../Util';
import { QuestionCacheContext } from '../../../../../contexts/QuestionCacheContext';
import { selectorStyles, multiSelectStyles } from '../../../../../CommonStyles';
import { MultiValue } from 'chakra-react-select';

interface SelectOption {
  value: string;
  label: string;
}

const categoryOptions = getCategoriesString().map(value => {
  return (
    { value: value, label: value }
  );
});

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
      <Box borderRadius='5px'>
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
          styles={{
            ...selectorStyles,
            ...multiSelectStyles
          }}
          components={{
            IndicatorSeparator: () => null
          }}
          value={stringToOptionsMapper(questionCache.categories.join(', '))}
        />
      </Box>
    </>
  );
}

export default SelectCategoriesInput;
