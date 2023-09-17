import './AddQuestionModal.css'
import React from "react";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { getComplexityStrings } from "../../../Util";

interface Props {
  onChangeHandler: (value: string) => void;
}

const complexityValues = getComplexityStrings();

const SelectComplexityInput: React.FC<Props> = ({ onChangeHandler }) => {
  const [complexity, setComplexity] = React.useState('');

  function handleChange(event: SelectChangeEvent) {
    let newValue = event.target.value as string;
    onChangeHandler(newValue);
    setComplexity(newValue);
  };

  return (
    <FormControl fullWidth>
      <InputLabel className='input-label'>
        Complexity
      </InputLabel>
      <Select
        value={complexity}
        label="Complexity"
        onChange={handleChange}
        className='select'
      >
        {
          complexityValues.map((value, index) => {
            return (
              <MenuItem value={value} key={index}>
                {value}
              </MenuItem>);
          })
        }
      </Select>
    </FormControl >
  );
}


export default SelectComplexityInput;