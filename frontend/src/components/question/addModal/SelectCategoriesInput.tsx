import React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { getCategoriesString } from '../../../Util';

const names = getCategoriesString();

interface Props {
  onChangeHandler: (value: string) => void;
}

const SelectCategoriesInput: React.FC<Props> = ({ onChangeHandler }) => {
  const [categories, setCatergories] = React.useState<string[]>([]);

  function handleChange(event: SelectChangeEvent<typeof categories>) {
    const { target: { value } } = event;
    const newCat = typeof value === 'string' ? value.split(',') : value;
    setCatergories(newCat);
    onChangeHandler(newCat.join(' ,'))
  };

  return (
    <FormControl fullWidth>
      <InputLabel className='input-label'>
        Tag
      </InputLabel>
      <Select
        className='select'
        multiple
        value={categories}
        onChange={handleChange}
        input={<OutlinedInput label="Tag" />}
        renderValue={(selected) => selected.join(', ')}
        MenuProps={MenuProps}
      >
        {names.map((name) => (
          <MenuItem key={name} value={name}>
            <Checkbox checked={categories.indexOf(name) > -1} />
            <ListItemText primary={name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl >
  );
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};
export default SelectCategoriesInput;