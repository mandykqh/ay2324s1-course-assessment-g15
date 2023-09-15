import React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { Category } from '../../models/Question';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

const names = Object.values(Category)
  .slice(0, Object.values(Category).length / 2)
  .map((s) => s.toString()); //TODO TIDY UP THIS


interface Props {
  setter: React.Dispatch<React.SetStateAction<string>>;
}

const SelectCategoriesInput: React.FC<Props> = ({ setter }) => {
  const [categories, setCatergories] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof categories>) => {
    const {
      target: { value },
    } = event;

    const newCat = typeof value === 'string' ? value.split(',') : value;
    setCatergories(newCat);
    setter(newCat.join(' ,'))
    // setter('asdfsadf');
  };

  return (
    <FormControl fullWidth>
      <InputLabel style={{ color: '#7e7e7e' }}>Tag</InputLabel>
      <Select
        multiple
        value={categories}
        onChange={handleChange}
        input={<OutlinedInput label="Tag" />}
        renderValue={(selected) => selected.join(', ')}
        MenuProps={MenuProps}
        style={{ color: 'white', backgroundColor: '#212224' }}
      >
        {names.map((name) => (
          <MenuItem key={name} value={name}>
            <Checkbox checked={categories.indexOf(name) > -1} />
            <ListItemText primary={name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default SelectCategoriesInput;