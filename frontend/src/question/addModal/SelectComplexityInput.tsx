import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React from "react";
import { Complexity } from "../../models/Question";

interface Props {
  setter: React.Dispatch<React.SetStateAction<string>>;
}

const complexityValues = Object.values(Complexity)
  .slice(0, Object.values(Complexity).length / 2); //TODO TIDY UP THIS

const SelectComplexityInput: React.FC<Props> = ({ setter }) => {
  const [complexity, setComplexity] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setter(event.target.value as string);
    setComplexity(event.target.value as string);
  };

  return (
    <FormControl fullWidth>
      <InputLabel style={{ color: '#7e7e7e' }}>Complexity</InputLabel>
      <Select
        value={complexity}
        label="Complexity"
        onChange={handleChange}
        style={selectStyle}
      >
        {complexityValues.map((value, index) => {
          return (<MenuItem value={value} key={index}>
            {value}
          </MenuItem>);
        })}
      </Select>
    </FormControl >);
}

const selectStyle = {
  color: 'white',
  backgroundColor: '#212224'
}

export default SelectComplexityInput;