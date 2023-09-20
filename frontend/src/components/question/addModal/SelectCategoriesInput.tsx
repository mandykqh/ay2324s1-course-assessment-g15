import { useContext, useEffect, useState } from 'react';
import { getCategoriesString, stringToOptionsMapper } from '../../../Util';
import { MultiValue, Select } from "chakra-react-select";
import { Box } from '@chakra-ui/react';
import { NewQuestionContext } from '../../../contexts/NewQuestionContext';
import { SECONDARY_COLOR } from '../../../CommonStyles';

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
  const { questionData, setQuestionData } = useContext(NewQuestionContext);
  const [categories, setCategories] = useState(questionData.categories);

  useEffect(() => {
    setQuestionData({
      ...questionData,
      categories: categories
    });
  }, [categories])

  return (
    <>
      <Box backgroundColor={SECONDARY_COLOR} borderRadius='5px'>
        <Select
          onChange={(e: MultiValue<SelectOption | unknown>) => {
            const inputString = e.map(
              (q) => {
                return ((q as SelectOption).value);
              }
            ).join(', ');
            setCategories(inputString);
          }}
          isMulti
          options={categoryOptions}
          placeholder="Select Category"
          closeMenuOnSelect={false}
          value={stringToOptionsMapper(questionData.categories)}
        />
      </Box>
    </>
  );
}

export default SelectCategoriesInput;
